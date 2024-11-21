import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/Components/Common/Navbar";
import Footer from "@/Components/Common/Footer";

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
  description: "Codesharer is a platform to share, explore, and learn from code written by developers around the world. Collaborate with others and enhance your coding skills.",
  keywords: "code sharing, coding platform, programming, open source, developer community, collaborate on code, learn to code",
  author: "Md. Mainul Hasan",
  robots: "index, follow", // This tells search engines to index the page and follow the links.
  openGraph: {
    title: "Codesharer - Share and Discover Code",
    description: "Join Codesharer, a platform to share your code, collaborate with developers, and learn new programming techniques.",
    url: "https://www.codesharer.com", // Replace with your actual site URL
    siteName: "Codesharer",
    images: [
      {
        url: "https://www.codesharer.com/og-image.jpg", // Replace with an image URL for better social sharing
        width: 1200,
        height: 630,
        alt: "Codesharer - Share and Discover Code"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image", // This type of card includes a large image
    title: "Codesharer - Share and Discover Code",
    description: "Codesharer is a platform to share, explore, and learn from code. Collaborate and enhance your coding skills with the community.",
    image: "https://www.codesharer.com/twitter-image.jpg", // Replace with an image URL for better Twitter sharing
  },
  viewport: "width=device-width, initial-scale=1.0", // Ensures the page is responsive
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
