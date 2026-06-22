import {
  HeroSection,
  FeaturesSection,
  IndustriesSection,
  WorkflowSection,
  TestimonialsSection,
  CTASection,
  AIToolsBanner,
} from "@/components/landing/Sections";
import { features, industries, workflowSteps, testimonials } from "@/lib/data";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AIToolsBanner />
      <FeaturesSection features={features} />
      <IndustriesSection industries={industries} />
      <WorkflowSection steps={workflowSteps} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </main>
  );
}
