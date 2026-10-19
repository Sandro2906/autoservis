import "./globals.css";
import Navbar from "./components/NavBar";
import { chakraPetch } from "./lib/fonts";
import Footer from "./components/Footer";

export const metadata = {
  title: "Autoservis „DS“",
  description: "Autoservis DS – Ognjen Jorgić",
};

export default function RootLayout({ children }) {
  return (
   <html lang="sr" data-scroll-behavior="smooth">
      <body className={chakraPetch.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}