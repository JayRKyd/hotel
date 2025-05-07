
import React from 'react';
import { CreditCard, Tag, MessageSquare, Users, ShieldCheck, Building, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WhyChooseUs = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-[#00b6de] py-12 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('homePage.whyChooseUs.title')}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {getBenefits(t).map((benefit, index) => (
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

const getBenefits = (t: any) => [
  {
    title: t('homePage.whyChooseUs.reason1.title'),
    description: t('homePage.whyChooseUs.reason1.description'),
    icon: <Tag className="text-[#00b6de]" size={28} />
  },
  {
    title: t('homePage.whyChooseUs.reason2.title'),
    description: t('homePage.whyChooseUs.reason2.description'),
    icon: <CreditCard className="text-[#00b6de]" size={28} />
  },
  {
    title: t('homePage.whyChooseUs.reason3.title'),
    description: t('homePage.whyChooseUs.reason3.description'),
    icon: <CreditCard className="text-[#00b6de]" size={28} />
  },
  {
    title: t('homePage.whyChooseUs.reason1.title'),
    description: t('homePage.whyChooseUs.reason1.description'),
    icon: <Building className="text-[#00b6de]" size={28} />
  },
  {
    title: t('homePage.whyChooseUs.reason2.title'),
    description: t('homePage.whyChooseUs.reason2.description'),
    icon: <Users className="text-[#00b6de]" size={28} />
  },
  {
    title: t('homePage.whyChooseUs.reason3.title'),
    description: t('homePage.whyChooseUs.reason3.description'),
    icon: <ShieldCheck className="text-[#00b6de]" size={28} />
  },
  {
    title: t('homePage.whyChooseUs.reason1.title'),
    description: t('homePage.whyChooseUs.reason1.description'),
    icon: <MessageSquare className="text-[#00b6de]" size={28} />
  },
  {
    title: t('homePage.whyChooseUs.reason2.title'),
    description: t('homePage.whyChooseUs.reason2.description'),
    icon: <Home className="text-[#00b6de]" size={28} />
  }
];

export default WhyChooseUs;
