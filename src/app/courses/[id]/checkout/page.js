"use client";

import { useParams, useRouter } from 'next/navigation';
import { fetchCourseById } from '@/lib/data';
import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Building, Smartphone, Lock, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (params?.id) {
      fetchCourseById(params.id).then(found => {
        if (found) setCourse(found);
        else router.push('/courses');
      });
    }
  }, [params, router]);

  if (!course) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await fetch("https://formsubmit.co/ajax/adnan.bashir7895@gmail.com", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `New Course Enrollment: ${course.title}`,
            FirstName: formData.firstName,
            LastName: formData.lastName,
            Email: formData.email,
            Phone: formData.phone,
            Course: course.title,
            Price: course.price,
            PaymentMethod: paymentMethod === 'bank' ? 'Bank Transfer' : 'JazzCash / EasyPaisa'
        })
      });

      // Sync enrollment inquiry to admin.bitsolmarketing.com (non-blocking)
      const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.bitsolmarketing.com';
      fetch(`${adminUrl}/api/internal/course-inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          courseName: course.title,
          coursePrice: course.price,
          paymentMethod: paymentMethod === 'bank' ? 'Bank Transfer' : 'JazzCash / EasyPaisa',
        }),
      }).catch((err) => console.error('[Admin sync] enrollment sync failed:', err));

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Failed to submit details. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hello BITSOL MARKETING! I want to enroll in the course: *${course.title}*.\n\nI have chosen *${paymentMethod === 'bank' ? 'Bank Transfer' : 'JazzCash / EasyPaisa'}* as my payment method.\n\nHere are my details and payment screenshot:`;
    window.open(`https://wa.me/923103175175?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-24 pb-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Course
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold mb-12">Secure Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Column - Forms */}
          <div className="lg:w-2/3 space-y-10">

            {!isSubmitted ? (
              <>
                {/* Personal Details */}
                <div className="glass-card p-8 rounded-2xl">
                  <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground/80">First Name</label>
                        <input type="text" required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full bg-background/50 border border-card-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground/80">Last Name</label>
                        <input type="text" required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full bg-background/50 border border-card-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">Email Address</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-background/50 border border-card-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">Phone Number</label>
                      <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-background/50 border border-card-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50" placeholder="+92 300 1234567" />
                    </div>
                  </form>
                </div>

                {/* Payment Method Selection */}
                <div className="glass-card p-8 rounded-2xl">
                  <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <button
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${paymentMethod === 'bank' ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-card-border hover:border-primary/50'}`}
                    >
                      <Building className={`w-8 h-8 ${paymentMethod === 'bank' ? 'text-primary' : 'text-foreground/50'}`} />
                      <span className="font-medium">Bank Transfer</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('jazzcash')}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${paymentMethod === 'jazzcash' ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-card-border hover:border-primary/50'}`}
                    >
                      <Smartphone className={`w-8 h-8 ${paymentMethod === 'jazzcash' ? 'text-primary' : 'text-foreground/50'}`} />
                      <span className="font-medium">JazzCash / EasyPaisa</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 rounded-2xl border-emerald-500/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 pb-8 border-b border-card-border relative z-10">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Details Submitted!</h2>
                    <p className="text-foreground/70">Please complete your payment to finalize enrollment.</p>
                  </div>
                </div>

                <div className="space-y-6 relative z-10">
                  <h3 className="text-xl font-bold">Payment Instructions</h3>

                  {paymentMethod === 'bank' && (
                    <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                      <p className="text-sm text-foreground/80 mb-4">Please transfer <strong className="text-foreground text-lg">{course.price}</strong> to the following bank account:</p>
                      <div className="font-mono bg-background/50 p-4 rounded-lg space-y-2">
                        <p><span className="text-foreground/60">Bank:</span> MCB</p>
                        <p><span className="text-foreground/60">Account Name:</span> BITSOL MARKETING</p>
                        <p><span className="text-foreground/60">Account Number:</span> 1388725651000676</p>
                        <p><span className="text-foreground/60">IBAN:</span> PK66MUCB1388725651000676</p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'jazzcash' && (
                    <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                      <p className="text-sm text-foreground/80 mb-4">Please transfer <strong className="text-foreground text-lg">{course.price}</strong> to the following Mobile Accounts:</p>
                      <div className="font-mono bg-background/50 p-4 rounded-lg space-y-4">
                        <div>
                          <p className="font-bold text-emerald-400 border-b border-emerald-500/20 pb-1 mb-2">JazzCash</p>
                          <p><span className="text-foreground/60">Title:</span> M Adnan Bashir</p>
                          <p><span className="text-foreground/60">Mobile:</span> 03074915929</p>
                        </div>
                        <div>
                          <p className="font-bold text-emerald-400 border-b border-emerald-500/20 pb-1 mb-2">EasyPaisa</p>
                          <p><span className="text-foreground/60">Title:</span> M Adnan Bashir</p>
                          <p><span className="text-foreground/60">Mobile:</span> 03421405876</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mt-8">
                    <h4 className="font-bold mb-2">Next Step: Send Payment Proof</h4>
                    <p className="text-foreground/70 text-sm mb-6">
                      After making the payment, please send us a screenshot of the transaction along with your name via WhatsApp or email.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleWhatsApp}
                        className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all shadow-lg hover:-translate-y-0.5"
                      >
                        <MessageCircle className="w-5 h-5" /> Contact via WhatsApp
                      </button>
                      <a
                        href="mailto:info@bitsolmarketing.com?subject=Payment Proof - Course Enrollment"
                        className="flex-1 py-3 px-4 rounded-xl glass border border-card-border font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-all hover:-translate-y-0.5"
                      >
                        <Mail className="w-5 h-5" /> Email info@bitsolmarketing.com
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              <div className="flex gap-4 mb-6">
                <img src={course.image} alt={course.title} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <h4 className="font-bold line-clamp-2">{course.title}</h4>
                  <p className="text-sm text-foreground/60">{course.level}</p>
                </div>
              </div>

              <div className="space-y-3 pb-6 border-b border-card-border">
                <div className="flex justify-between text-foreground/80">
                  <span>Original Price</span>
                  <span>{course.price}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Discount</span>
                  <span>- Rs 0</span>
                </div>
              </div>

              <div className="flex justify-between items-end pt-6 mb-8">
                <span className="font-bold text-lg">Total</span>
                <span className="text-3xl font-black text-gradient">{course.price}</span>
              </div>

              {!isSubmitted ? (
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isProcessing ? 'Processing...' : 'Complete Checkout'}
                  {!isProcessing && <Lock className="w-5 h-5" />}
                </button>
              ) : (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center text-sm font-medium text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 inline-block mr-2 mb-0.5" />
                  Order Placed Successfully
                </div>
              )}

              <div className="mt-6 flex items-start gap-3 text-sm text-foreground/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p>By completing your purchase you agree to our Terms of Service and Privacy Policy.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
