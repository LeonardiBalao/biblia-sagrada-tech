"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import ThemeButtons from "./theme-buttons";
import { cn } from "@/lib/utils";

import AuthCard from "@/app/auth/login/auth-card";
import { ExtendUser } from "@/types/next-auth";

interface NavbarProps {
  user: ExtendUser | undefined;
}

export default function Navbar({ user }: NavbarProps) {
  const links = [
    { href: "/painel/estudo", target: "_blank", label: "Estude a Bíblia" },
    { href: "/sobre-nos", target: "_blank", label: "Sobre nós" },
  ];
  return (
    <header className="flex items-center justify-between p-4 border-b-2">
      <Link href={"/"} className="flex gap-4">
        <h1 className="logo font-extrabold font-mono text-xl cursor-pointer">
          BibliaSagrada.tech
        </h1>
      </Link>
      <nav className="flex items-center justify-center">
        <ThemeButtons className="" />
        <ul className="flex gap-4 items-center md:ml-4">
          {links.map((l, i) => (
            <Link
              className="md:flex gap-4 items-center hidden"
              key={i}
              href={l.href}
              target={l.target}
            >
              {l.label}
            </Link>
          ))}
        </ul>
        {!user ? (
          <Drawer>
            <DrawerTrigger
              className={cn(buttonVariants({ variant: "default" }), "ml-2")}
            >
              Logar
            </DrawerTrigger>
            <DrawerContent className="flex justify-center">
              <AuthCard
                cardTitle="Bem-vindo"
                description="Faça login ou registre-se"
                showSocials
              />
            </DrawerContent>
          </Drawer>
        ) : (
          <Link className="ml-2 md:ml-4" href={"/painel"}>
            <Button>Painel</Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
