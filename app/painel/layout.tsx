import { cn } from "@/lib/utils";
import PainelAside from "./painel-aside";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { Merriweather as FontSans } from "next/font/google";

const fontSans = FontSans({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) return redirect("/auth/login");

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-screen w-full flex-col bg-muted/40",
          fontSans.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
