import React from "react";
import AboutHero from "@/components/about/AboutHero";
import NarrativeSection from "@/components/about/NarrativeSection";
import AboutStats from "@/components/about/AboutStats";
import AboutCTA from "@/components/about/AboutCTA";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      <AboutHero />
      <NarrativeSection />
      <AboutStats />
      <AboutCTA />
    </div>
  );
};

export default About;


