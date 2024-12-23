import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/Components/Common/Navbar";
import Footer from "@/Components/Common/Footer";
import OrganizationSchema from "@/Components/Schemas/OrganizationSchema";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { analytics } from "@/utils/gtag";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  
  title: "Codesharer - Share and Discover Code",
  description:
    "Codesharer is a platform to share, explore, and learn from code written by developers around the world. Collaborate with others and enhance your coding skills.",
  keywords:
    "code sharing, coding platform, programming, open source, developer community, collaborate on code, learn to code",
  author: "Md. Mainul Hasan",
  robots: "index, follow", // This tells search engines to index the page and follow the links.
  openGraph: {
    title: "Codesharer - Share and Discover Code",
    description:
      "Join Codesharer, a platform to share your code, collaborate with developers, and learn new programming techniques.",
    url: process.env.SITE_URL,
    siteName: "Codesharer",
    images: [
      {
        url: `${process.env.SITE_URL}assets/logo.png`, // Replace with an image URL for better social sharing
        width: 1200,
        height: 630,
        alt: "Codesharer - Share and Discover Code",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image", // This type of card includes a large image
    title: "Codesharer - Share and Discover Code",
    description:
      "Codesharer is a platform to share, explore, and learn from code. Collaborate and enhance your coding skills with the community.",
    image: `${process.env.SITE_URL}assets/logo.png`, // Replace with an image URL for better social sharing
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  
};

export default function RootLayout({ children }) {
  analytics.page();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleTagManager gtmId='G-89ZKDQJBR9' />
        <OrganizationSchema />
        <Navbar />
        {children}
        
<script async src="https://www.googletagmanager.com/gtag/js?id=G-89ZKDQJBR9"></script>
{/* <script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-89ZKDQJBR9');
</script> */}
<GoogleAnalytics gaId='G-89ZKDQJBR9' />
        <Footer />
      </body>
    </html>
  );
}
