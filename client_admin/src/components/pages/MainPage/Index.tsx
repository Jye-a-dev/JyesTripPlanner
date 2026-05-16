import HeroSection from "./components/HeroSection";
import InfoCards from "./components/InfoCards";
import MainActionButtons from "./components/MainActionButtons";

export default function MainpageIndex() {
  return (
    <section className="grid w-full gap-6 md:grid-cols-[1.2fr_0.8fr] md:gap-8">
      <div>
        <HeroSection />
        <MainActionButtons />
      </div>
      <InfoCards />
    </section>
  );
}
