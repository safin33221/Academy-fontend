import Courses from "@/components/module/Home/Courses";
import FeaturesSection from "@/components/module/Home/FeaturesSection";
import HeroSection from "@/components/module/Home/HeroSection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <FeaturesSection />
      <Courses />
    </div>
  );
}
