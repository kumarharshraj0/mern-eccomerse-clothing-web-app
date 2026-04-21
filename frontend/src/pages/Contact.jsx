import React from "react";
import { useContactForm } from "@/hooks/useContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import ContactFormSection from "@/components/contact/ContactFormSection";
import SocialBar from "@/components/contact/SocialBar";

export default function Contact() {
  const { formData, loading, handleChange, handleSubmit } = useContactForm();

  return (
    <div className="min-h-screen bg-white">
      <ContactHero />
      
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <ContactInfoSection />
            <ContactFormSection 
              formData={formData} 
              loading={loading} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit} 
            />
          </div>
        </div>
      </section>

      <SocialBar />
    </div>
  );
}




