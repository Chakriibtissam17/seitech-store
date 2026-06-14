import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import Advantages from '../components/Advantages';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import About from '../components/About';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <Advantages />
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
