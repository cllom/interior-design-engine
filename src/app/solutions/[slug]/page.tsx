import Link from "next/link";
import { notFound } from "next/navigation";
import { industries } from "@/lib/data";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function generateStaticParams() {
  return industries.map((ind) => ({ slug: ind.slug }));
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();

  return (
    <div className="min-h-screen pt-16">
      <section className={`bg-gradient-to-br ${industry.gradient} text-white py-24`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">{industry.title}</h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl">{industry.tagline}</p>
          <Link
            href="/tools/room-designer"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-white/90 transition-colors"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {industry.features.map((feature) => (
              <div key={feature} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-600 shrink-0" />
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to transform your workflow?</h2>
          <p className="text-gray-500 mb-8">Join millions of designers using DesignEngine</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tools/ai-design" className="px-6 py-3 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 transition-colors">
              Try AI Design
            </Link>
            <Link href="/tools/room-designer" className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-white transition-colors">
              Open 3D Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
