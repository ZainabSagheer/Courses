export const metadata = {
  title: "Terms of Service",
  description: "BITSOL Marketing Terms of Service. Read the terms and conditions for using our course platform and enrolling in our digital skills training programs.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pb-24">
      <section className="pt-12 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-foreground/60 mb-12">Last updated: May 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="glass-card p-8 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
              <p className="text-foreground/80 leading-relaxed">By accessing and using the BITSOL Marketing course platform (course.bitsolmarketing.com), you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform. These terms apply to all users, including students and visitors.</p>
            </div>

            <div className="glass-card p-8 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold">2. Course Enrollment & Access</h2>
              <p className="text-foreground/80 leading-relaxed">Upon successful payment and admin approval, you will receive lifetime access to the purchased course materials. Access is granted on a per-user basis and is non-transferable. Sharing login credentials or course materials with others is strictly prohibited and may result in account termination.</p>
            </div>

            <div className="glass-card p-8 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold">3. Payment & Refund Policy</h2>
              <p className="text-foreground/80 leading-relaxed">Payments are accepted via Bank Transfer (MCB), JazzCash, and EasyPaisa. Course fees are as listed on the platform at the time of enrollment. We offer a 7-day refund window from the date of enrollment approval. After 7 days, or if more than 20% of the course has been accessed, refunds are not available.</p>
            </div>

            <div className="glass-card p-8 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold">4. Intellectual Property</h2>
              <p className="text-foreground/80 leading-relaxed">All course content, videos, materials, and resources are the intellectual property of BISOL Institute. You are granted a personal, non-commercial license to use the materials for your own learning. Reproduction, redistribution, or commercial use of any materials without written permission is prohibited.</p>
            </div>

            <div className="glass-card p-8 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold">5. User Conduct</h2>
              <p className="text-foreground/80 leading-relaxed">You agree to use the platform responsibly and not engage in any activity that disrupts the service, harms other users, or violates Pakistani law. BISOL Institute reserves the right to suspend or terminate accounts that violate these terms.</p>
            </div>

            <div className="glass-card p-8 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold">6. Disclaimer</h2>
              <p className="text-foreground/80 leading-relaxed">Course content related to stock trading and cryptocurrency is for educational purposes only and does not constitute financial advice. BISOL Institute is not responsible for any financial losses incurred from applying course concepts. Always consult a licensed financial advisor before making investment decisions.</p>
            </div>

            <div className="glass-card p-8 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold">7. Contact</h2>
              <p className="text-foreground/80 leading-relaxed">For questions about these terms, contact BISOL Institute at 83/3 C KB Colony Airport Road, Lahore, Pakistan. Email: <a href="mailto:info@courses.bitsolmarketing.com" className="text-primary hover:underline">info@courses.bitsolmarketing.com</a> | WhatsApp: <a href="https://wa.me/923103175175" className="text-primary hover:underline">0310 3175175</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
