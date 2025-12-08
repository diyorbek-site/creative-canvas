import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import ContentGenerator from "@/components/ContentGenerator";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingShapes from "@/components/FloatingShapes";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, hsl(230 30% 8%), hsl(260 25% 10%), hsl(230 25% 5%))',
        }}
      />
      
      {/* Floating decorative elements */}
      <FloatingShapes />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <ShowcaseSection />
        <ContentGenerator />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
