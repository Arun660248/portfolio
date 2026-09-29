import { PROJECTS } from "@/data/projects";
import { SYSTEM_FAILURES } from "@/data/failures";
import { SYSTEM_WORKFLOWS } from "@/data/workflows";
import SystemDetailCockpit from "@/components/SystemDetailCockpit";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function SystemDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  const failure = SYSTEM_FAILURES.find((f) => f.projectSlug === slug);
  const workflow = SYSTEM_WORKFLOWS.find((w) => w.projectSlug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
        >
          ← BACK TO CONSOLE
        </Link>

        <SystemDetailCockpit
          project={project}
          failure={failure}
          workflow={workflow}
          slug={slug}
        />
      </div>
    </main>
  );
}
