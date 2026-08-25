import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LivePulse from '@/components/LivePulse';
import ChatterBoxSimulator from '@/components/ChatterBoxSimulator';
import AboutServices from '@/components/AboutServices';
import EventsSection from '@/components/EventsSection';
import TeamHierarchy from '@/components/TeamHierarchy';
import DepartmentMatcher from '@/components/DepartmentMatcher';
import CareersSection from '@/components/CareersSection';
import PodcastsResources from '@/components/PodcastsResources';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LivePulse />
      <ChatterBoxSimulator />
      <AboutServices />
      <EventsSection />
      <TeamHierarchy />
      <DepartmentMatcher />
      <CareersSection />
      <PodcastsResources />
      <Footer />
    </main>
  );
}
