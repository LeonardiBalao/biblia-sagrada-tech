import { cn } from "@/lib/utils";
import PainelAside from "./painel-aside";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) return redirect("/auth/login");

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("flex min-h-screen w-full flex-col bg-muted/40", "")}>
        {children}
      </body>
    </html>
  );
}
