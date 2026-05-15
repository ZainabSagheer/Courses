import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: {
    default: "BITSOL Marketing Institute - Master Digital Skills & Financial Freedom",
    template: "%s | BITSOL Marketing Institute",
  },
  description: "Pakistan's premier institute for Digital Media Marketing, AI Training, and Stock Exchange Trading. Learn from industry experts and transform your career with BITSOL Marketing Institute courses.",
  keywords: ["digital marketing course pakistan", "AI training lahore", "stock trading course", "BITSOL Marketing Institute", "online courses pakistan", "learn digital marketing", "SEO course"],
  authors: [{ name: "BITSOL Marketing Institute" }],
  creator: "BITSOL Marketing Institute",
  metadataBase: new URL("https://course.bitsolmarketing.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://course.bitsolmarketing.com",
    siteName: "BITSOL Marketing Institute",
    title: "BITSOL Marketing Institute - Master Digital Skills & Financial Freedom",
    description: "Pakistan's premier institute for Digital Media Marketing, AI Training, and Stock Exchange Trading.",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "BITSOL Marketing Institute Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITSOL Marketing Institute - Master Digital Skills",
    description: "Pakistan's premier institute for Digital Marketing, AI Training, and Trading.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

// Organization Schema Markup
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "BITSOL Marketing Institute",
  url: "https://course.bitsolmarketing.com",
  logo: "https://course.bitsolmarketing.com/icon.png",
  description: "Pakistan's premier institute for Digital Media Marketing, AI Training, and Stock Exchange Trading.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "83/3 C KB Colony Airport Road",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+92-310-3175175",
    contactType: "customer service",
  },
  sameAs: [],
};

import { ThemeProvider } from "@/components/theme-provider";
import { Entropy } from "@/components/ui/entropy";
import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          enableColorScheme={false}
        >
          <div className="relative min-h-screen">
            <Entropy className="opacity-40" />
            <AuthProvider>
              <LayoutWrapper>
                <main className="flex-grow relative z-10">
                  {children}
                </main>
              </LayoutWrapper>
            </AuthProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
