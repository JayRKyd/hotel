
import React from 'react';
import { CreditCard, Tag, MessageSquare, Users, ShieldCheck, Building, Home } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="bg-[#00b6de] py-12 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why should you order through us?</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-bold mb-2">{benefit.title}</h3>
              <p className="text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const benefits = [
  {
    title: "Discount for pre-orders",
    description: "Reserve early and enjoy special pre-booking discounts",
    icon: <Tag className="text-[#00b6de]" size={28} />
  },
  {
    title: "Favorable booking change",
    description: "Flexible booking policies for your peace of mind",
    icon: <CreditCard className="text-[#00b6de]" size={28} />
  },
  {
    title: "Option for credit payments",
    description: "Multiple payment options including credit card installments",
    icon: <CreditCard className="text-[#00b6de]" size={28} />
  },
  {
    title: "Connecting Rooms at selected hotels",
    description: "We help secure connecting rooms for families and groups",
    icon: <Building className="text-[#00b6de]" size={28} />
  },
  {
    title: "Personal accompaniment",
    description: "Dedicated support throughout your journey",
    icon: <Users className="text-[#00b6de]" size={28} />
  },
  {
    title: "Rich Experience",
    description: "Years of expertise in creating memorable travel experiences",
    icon: <ShieldCheck className="text-[#00b6de]" size={28} />
  },
  {
    title: "Attached Agent in Hebrew",
    description: "Hebrew-speaking representatives available for assistance",
    icon: <MessageSquare className="text-[#00b6de]" size={28} />
  },
  {
    title: "Attractive prices!",
    description: "Competitive rates and exceptional value for your budget",
    icon: <Home className="text-[#00b6de]" size={28} />
  }
];

export default WhyChooseUs;
