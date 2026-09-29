export interface AudioCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

export function isAudioSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function stopSpeaking(): void {
  if (isAudioSupported()) {
    window.speechSynthesis.cancel();
  }
}

let cachedVoices: SpeechSynthesisVoice[] = [];
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

export function getAllAvailableVoices(): SpeechSynthesisVoice[] {
  if (!isAudioSupported()) return [];
  return cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
}

export function getBestNaturalVoice(preferredName?: string): SpeechSynthesisVoice | null {
  if (!isAudioSupported()) return null;
  const voices = getAllAvailableVoices();
  if (!voices || voices.length === 0) return null;

  if (preferredName) {
    const match = voices.find((v) => v.name === preferredName);
    if (match) return match;
  }

  return (
    voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.toLowerCase().includes("natural") ||
          v.name.toLowerCase().includes("neural") ||
          v.name.toLowerCase().includes("jenny") ||
          v.name.toLowerCase().includes("guy") ||
          v.name.toLowerCase().includes("aria"))
    ) ||
    voices.find((v) => v.name.toLowerCase().includes("google") && v.lang.startsWith("en")) ||
    voices.find((v) => v.lang.startsWith("en")) ||
    voices[0] ||
    null
  );
}

export function normalizeTextForSpeech(raw: string): string {
  if (!raw) return "";
  let text = raw.replace(/```[\s\S]*?```/g, "").replace(/https?:\/\/\S+/g, "");
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // Metrics & Specific Rates
  text = text.replace(/100%\s*Pass(\s*rate)?/gi, "one hundred percent pass rate");
  text = text.replace(/~(\d+(?:\.\d+)?)\s*%/g, "approximately $1 percent");
  text = text.replace(/(\d+(?:\.\d+)?)\s*%/g, "$1 percent");
  text = text.replace(/<(\d+)\s*ms/gi, "less than $1 milliseconds");
  text = text.replace(/(\d+)\s*ms\b/gi, "$1 milliseconds");
  text = text.replace(/\b(\d+)D\b/gi, "$1 day");
  text = text.replace(/\b(\d+)-Day\b/gi, "$1 day");
  text = text.replace(/[#*_`~>[\]]/g, " ");
  // Phonics & Acronyms
  text = text.replace(/\bARIMA\b/g, "Ah-ree-ma");
  text = text.replace(/\bMAPE\b/g, "mean absolute percentage error");
  text = text.replace(/\bFastMCP\b/g, "Fast M C P");
  text = text.replace(/\bADK\b/g, "A D K");
  text = text.replace(/\bAWS\b/g, "A W S").replace(/\bEC2\b/g, "E C 2");
  text = text.replace(/\bIITG\b|\bIIT Guwahati\b/g, "I I T Guwahati");
  text = text.replace(/\bDA 210\b/g, "Data Analytics two ten");
  text = text.replace(/\bNumPy\b/gi, "Num Pie").replace(/\bSQLite\b/gi, "S Q L light");
  text = text.replace(/\bP95\b/gi, "P 95").replace(/\bvs\b/gi, "versus");
  text = text.replace(/\bLLM\b/g, "L L M").replace(/\bRAG\b/g, "rag");
  text = text.replace(/&/g, " and ").replace(/->|→|=>/g, ", leading to, ");
  text = text.replace(/\s*([.,;?!])\s*/g, "$1 ");
  return text.replace(/\s{2,}/g, " ").trim();
}

export function speakAnswer(
  text: string,
  callbacks?: AudioCallbacks,
  options?: { preferredVoice?: string; rate?: number; pitch?: number }
): void {
  if (!isAudioSupported()) {
    callbacks?.onError?.();
    return;
  }

  // Cancel any ongoing audio first
  window.speechSynthesis.cancel();

  // Apply domain phonetic normalization and conversational pacing
  const spokenText = normalizeTextForSpeech(text);

  const utterance = new SpeechSynthesisUtterance(spokenText);
  // Human-like cadence tuning: natural rate 0.96 for clarity on technical terms
  utterance.rate = options?.rate ?? 0.96;
  utterance.pitch = options?.pitch ?? 0.98;

  const voice = getBestNaturalVoice(options?.preferredVoice);
  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => callbacks?.onStart?.();
  utterance.onend = () => callbacks?.onEnd?.();
  utterance.onerror = () => callbacks?.onError?.();

  window.speechSynthesis.speak(utterance);
}

export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
}

export function createSpeechRecognizer(
  onResult: (transcript: string) => void,
  onEnd: () => void,
  onError?: () => void
): any {
  if (!isSpeechRecognitionSupported()) return null;
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognizer = new SpeechRecognition();
  recognizer.continuous = false;
  recognizer.interimResults = false;
  recognizer.lang = "en-US";

  recognizer.onresult = (event: any) => {
    const transcript = event.results[0]?.[0]?.transcript || "";
    if (transcript) onResult(transcript);
  };
  recognizer.onend = onEnd;
  recognizer.onerror = () => {
    onError?.();
    onEnd();
  };

  return recognizer;
}
