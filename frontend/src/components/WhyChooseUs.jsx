import React from "react";
import { Truck, ShieldCheck, Headphones, CreditCard } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: "Free Shipping",
      description: "On all orders over ₹999",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: <Headphones className="w-8 h-8 text-primary" />,
      title: "24/7 Support",
      description: "Dedicated support team",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-primary" />,
      title: "Easy Returns",
      description: "30-day money back guarantee",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm border border-border/50 transition-transform hover:-translate-y-1"
            >
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;



