export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  isoDate: string;
  credentialId?: string;
  imagePath: string;
  verificationUrl?: string;
  category: "academic" | "cloud" | "ai-ml" | "data" | "internship";
  skills: string[];
}
