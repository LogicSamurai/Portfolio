import { constructMetadata } from "@/lib/metadata";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/ui/CommandPalette";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Geist:wght@100..900&family=Commit+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {/* Mesh Gradient Background Layer */}
        <div className="mesh-gradient" aria-hidden="true" />

        {/* Structural SEO Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "SyntaxSamurai",
              "url": "https://syntaxsamurai.com",
              "jobTitle": "Full-Stack Software Engineer",
              "description": "Expert Full-Stack Developer specializing in high-performance digital architecture and neo-noir design.",
              "sameAs": [
                "https://github.com/syntaxsamurai",
                "https://twitter.com/syntaxsamurai"
              ]
            })
          }}
        />

        <div className="flex flex-col min-h-screen relative z-0">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

