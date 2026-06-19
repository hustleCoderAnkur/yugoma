import "../styles/globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Yugoma",
  description: "AI powered Gmail and Google Calendar assistant",
  icons: [{ rel: "icon", url: "/favicon.ico" }],

  verification: {
    google: "WPZ6ikj7eYm5qpuwUAwZ0pA_5u9ymMtXNcLD6YJmFOI",
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <TRPCReactProvider>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}