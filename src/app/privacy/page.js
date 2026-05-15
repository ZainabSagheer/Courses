import Link from 'next/link';

export const metadata = {
  title: "Privacy Policy",
  description: "BITSOL Marketing Institute Privacy Policy. Learn how we collect, use, and protect your personal information on our course platform.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pb-24">
      <section className="pt-12 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-foreground/60 mb-12">Last updated: May 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="glass-card p-8 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold">1. Information We Collect</h2>
              <p className="text-foreground/80 leading-relaxed">When you create an account or enroll in a course on BITSOL Marketing Institute, we collect your full name, email address, phone number, and payment details. We also collect usage data such as course progress, login times, and device information to improve your learning experience.</p>
            </div>

            <div className="glass-card p-8 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
              <p className="text-foreground/80 leading-relaxed">Your personal information is used to: provide access to purchased courses, communicate important updates about your enrollment, process payments securely, improve our platform and course content, and send occasional promotional offers (with your consent). We never sell your personal data to third parties.</p>
            </div>

            <div className="glass-card p-8 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold">3. Data Storage & Security</h2>
              <p className="text-foreground/80 leading-relaxed">Your data is stored securely using Google Firebase, which provides enterprise-grade encryption and security. All data transfers are encrypted via HTTPS/SSL. We implement industry-standard access controls to protect your information from unauthorized access.</p>
            </div>

            <div className="glass-card p-8 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold">4. Cookies</h2>
              <p className="text-foreground/80 leading-relaxed">We use essential cookies to maintain your login session and preferences. We do not use third-party tracking cookies for advertising purposes. You can disable cookies in your browser settings, though this may affect platform functionality.</p>
            </div>

            <div className="glass-card p-8 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold">5. Your Rights</h2>
              <p className="text-foreground/80 leading-relaxed">You have the right to access, update, or delete your personal data at any time. To request data deletion, contact us at <a href="mailto:info@courses.bitsolmarketing.com" className="text-primary hover:underline">info@courses.bitsolmarketing.com</a> or WhatsApp us at <a href="https://wa.me/923103175175" className="text-primary hover:underline">0310 3175175</a>.</p>
            </div>

            <div className="glass-card p-8 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold">6. Contact</h2>
              <p className="text-foreground/80 leading-relaxed">For any questions regarding this privacy policy, please contact BITSOL Marketing Institute at 83/3 C KB Colony Airport Road, Lahore, Pakistan. Email: info@courses.bitsolmarketing.com | Phone: 0310 3175175.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
