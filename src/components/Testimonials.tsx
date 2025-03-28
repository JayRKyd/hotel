
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Clients Testimonials</h2>
        
        <div className="relative">
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-12">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {testimonial.map((item, idx) => (
                      <div key={idx} className="bg-gradient-to-b from-[#ffb347] to-white rounded-lg shadow-md overflow-hidden relative">
                        <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }}>
                          <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/50 to-transparent p-4 text-white">
                            <p className="font-semibold">{item.name}</p>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={16} className="fill-current text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-gray-700 line-clamp-4">{item.text}</p>
                          <a href="#" className="text-[#00b6de] text-sm font-medium mt-2 inline-block">Read More</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? 'bg-[#00b6de]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Sample testimonial data
const testimonials = [
  [
    {
      name: "Edith Milan",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      text: "We had the best trip ever! The service was impeccable and the attention to detail made all the difference. The destinations were breathtaking, and the hotels were luxurious. Can't wait to book my next adventure!",
      topColor: "#ffb347"
    },
    {
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      text: "If I could give more than 5 stars, I would! The planning process was smooth, the itinerary was perfect, and we had the most amazing time. The local guides were knowledgeable and friendly.",
      topColor: "#ff7f50"
    },
    {
      name: "Samantha Williams",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      text: "Our dear Ziad, We returned from a wonderful half week trip to Phuket and Krabi. It was just perfect! Beautiful Tanya! And most of all, the best is (because I'm started to thank you for your patience and tolerance during the planning process) The execution of the hotels.",
      topColor: "#87ceeb"
    },
    {
      name: "Tanner and Arad",
      image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      text: "Away from the movies? We really enjoyed with fascination and trust working with the lovely team who was amazing, caring and very talented people all The picture in from a 4 hippo trip we did in Phuket and the guide explain took a picture of us with a real HIPPO!",
      topColor: "#ff6b81"
    }
  ],
  [
    {
      name: "David Johnson",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      text: "The trip to Thailand was absolutely amazing! Every detail was taken care of, and the guides were exceptional. I'll definitely be booking my next trip with them.",
      topColor: "#20b2aa"
    },
    {
      name: "Sophia Garcia",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80",
      text: "What an incredible experience! The hotels were perfect, the tours were fascinating, and the entire trip was seamless. Thank you for making our holiday so special!",
      topColor: "#9370db"
    },
    {
      name: "Ahmed Hassan",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      text: "Our family trip was beyond perfect thanks to the amazing planning and attention to detail. The kids loved every minute, and we created memories that will last a lifetime.",
      topColor: "#3cb371"
    },
    {
      name: "Emma Phillips",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80",
      text: "The service was exceptional from start to finish. Every recommendation was spot on, and the entire trip exceeded our expectations. We'll definitely be using their services again!",
      topColor: "#ff8c00"
    }
  ]
];

export default Testimonials;
