import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TournamentsSection from "@/components/TournamentsSection";
import ServersSection from "@/components/ServersSection";
import LoadoutSection from "@/components/LoadoutSection";
import LeaderboardSection from "@/components/LeaderboardSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <TournamentsSection />
        <ServersSection />
        <LoadoutSection />
        <LeaderboardSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
