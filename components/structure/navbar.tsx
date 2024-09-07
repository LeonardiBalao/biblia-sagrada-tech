import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ThemeButtons from "./theme-buttons";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "@radix-ui/react-separator";
import { AvatarIcon } from "@radix-ui/react-icons";
import Google from "next-auth/providers/google";
import AuthCard from "@/app/auth/login/auth-card";
import { User } from "@prisma/client";
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
      <h1 className="logo font-extrabold font-mono text-xl">
        BibliaSagrada.tech
      </h1>
      <nav className="flex items-center">
        <ThemeButtons className="mr-4" />
        <ul className="flex gap-4 items-center">
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
              className={cn(buttonVariants({ variant: "default" }), "ml-4")}
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
          <Link className="ml-4" href={"/painel"}>
            <Button>Painel</Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
