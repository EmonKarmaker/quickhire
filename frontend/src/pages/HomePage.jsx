import Hero from '../components/home/Hero';
import CompanyLogos from '../components/home/CompanyLogos';
import CategorySection from '../components/home/CategorySection';
import CTABanner from '../components/home/CTABanner';
import FeaturedJobs from '../components/home/FeaturedJobs';
import LatestJobs from '../components/home/LatestJobs';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CompanyLogos />
      <CategorySection />
      <CTABanner />
      <FeaturedJobs />
      <LatestJobs />
    </>
  );
}
