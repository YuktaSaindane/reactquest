import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "@/contexts/GameContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ReactQuest - Master React for Interviews",
  description: "Interactive, game-based React learning platform for interview preparation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-900 text-white min-h-screen font-sans">
        <GameProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1f2937",
                color: "#fff",
                border: "1px solid #374151"
              }
            }}
          />
        </GameProvider>
      </body>
    </html>
  );
}
