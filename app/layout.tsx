import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Merriweather as FontSans } from "next/font/google";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
const fontSans = FontSans({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biblia Sagrada Tech",
  description:
    "Conheça a Bíblia Sagrada Tech, um aplicativo web que oferece leitura intuitiva e organizada da Bíblia. Acesse versões gratuitas e premium, com parte dos lucros apoiando causas sociais. Ideal para cristãos devotos, estudantes de teologia e grupos de estudo bíblico. Junte-se a nós online ou via aplicativo móvel.",
  keywords:
    "Bíblia Sagrada, leitura da Bíblia, estudo bíblico, aplicativo bíblico, Bíblia online, Velho Testamento, Novo Testamento, cristãos devotos, estudantes de teologia, igrejas, grupos de estudo bíblico, doações sociais, plataforma bíblica, Bíblia gratuita, Bíblia premium, campanhas religiosas, parcerias com igrejas, testemunhos de usuários, suporte ao cliente, impacto social, projetos sociais, comunidades carentes, programas educacionais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <html lang="en-US" suppressHydrationWarning>
        <body
          className={cn("flex min-h-svh w-full flex-col", fontSans.className)}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors position="top-center" />
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </html>
  );
}
