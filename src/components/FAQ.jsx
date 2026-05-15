"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordsPullUp } from './ui/typography';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { TiltCard } from "./ui/tilt-card";

const faqs = [
  {
    question: "What courses does BITSOL Marketing Institute offer?",
    answer: "BITSOL Marketing Institute offers premium courses in Digital Media Marketing, Complete AI & Prompt Engineering, Pakistan Stock Exchange Trading, Advanced SEO & Growth Hacking, Crypto Trading, and AI Agents & Automation. All courses include lifetime access, mentorship, and certificates."
  },
  {
    question: "How do I enroll in a course?",
    answer: "To enroll, browse our courses page, select the course you want, click 'Enroll Now', fill in your details, and complete payment via Bank Transfer or JazzCash/EasyPaisa. After payment confirmation, our admin will approve your access within 24 hours."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept Bank Transfer (MCB), JazzCash, and EasyPaisa. After selecting your preferred method during checkout, you'll receive account details to send your payment. Send the payment screenshot via WhatsApp for faster processing."
  },
  {
    question: "Do I get lifetime access to the courses?",
    answer: "Yes! All BITSOL Marketing courses come with lifetime access. Once enrolled, you can revisit the course materials anytime from your student dashboard. You also get access to future updates at no extra cost."
  },
  {
    question: "Is there any mentorship or support available?",
    answer: "Absolutely. Every course includes 1-on-1 mentorship, access to exclusive WhatsApp/Discord community groups, and weekly live Q&A sessions with instructors. You can also reach our support team via WhatsApp at 0310-3175175."
  },
  {
    question: "Can I access courses on mobile devices?",
    answer: "Yes, our platform is fully responsive and works on all devices — desktops, tablets, and smartphones. You can learn on the go from anywhere in Pakistan or abroad."
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-32 relative bg-transparent overflow-hidden" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-20">
          <WordsPullUp 
            text="Frequently Asked Questions" 
            className="text-5xl md:text-7xl font-medium tracking-tighter mb-8 text-glow"
            style={{ color: "#00D9FF" }}
            showAsterisk
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-foreground/60 max-w-lg text-lg font-light leading-relaxed"
          >
            Everything you need to know about BITSOL Marketing courses and enrollment.
          </motion.p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <TiltCard 
                    className={`rounded-[2rem] overflow-hidden border border-card-border transition-all duration-500 ${openIndex === index ? 'bg-background' : 'glass'}`}
                    tiltLimit={3}
                    perspective={2000}
                    scale={1.01}
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-8 text-left hover:bg-white/5 transition-all duration-300 group"
                        aria-expanded={openIndex === index}
                    >
                        <span className={`text-xl font-medium pr-6 transition-colors duration-300 ${openIndex === index ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>{faq.question}</span>
                        <div className={`p-2 rounded-full border border-card-border transition-all duration-500 shrink-0 ${openIndex === index ? 'bg-primary text-background rotate-180' : 'bg-white/5 text-primary'}`}>
                        <ChevronDown className="w-5 h-5" />
                        </div>
                    </button>
                    <AnimatePresence>
                        {openIndex === index && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="px-8 pb-10 text-foreground/40 leading-relaxed font-light text-lg">
                            {faq.answer}
                            </div>
                        </motion.div>
                        )}
                    </AnimatePresence>
                </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
