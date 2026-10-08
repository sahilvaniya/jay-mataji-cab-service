import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Fleet from "@/components/Fleet";
import Heritage from "@/components/Heritage";
import Fares from "@/components/Fares";
import Routes from "@/components/Routes";
import Reviews from "@/components/Reviews";
import Safety from "@/components/Safety";
import Corporate from "@/components/Corporate";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Fleet />
        <Heritage />
        <Fares />
        <Routes />
        <Reviews />
        <Safety />
        <Corporate />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
