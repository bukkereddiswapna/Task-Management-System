import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import About from "../pages/About"
import "../App.css";
function LandingPage() {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <About />
            <Footer />
        </>
    );
}

export default LandingPage;