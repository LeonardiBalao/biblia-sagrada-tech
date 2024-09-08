"use client";

import ThemeButtons from "@/components/structure/theme-buttons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ExtendUser } from "@/types/next-auth";
import {
  PanelLeft,
  Home,
  Package,
  Users2,
  LineChart,
  Search,
  Church,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PainelNavbarProps {
  user: ExtendUser;
}

export default function PainelNavbar({ user }: PainelNavbarProps) {
  const [path, setPath] = useState("");
  const [pathLength, setPathLength] = useState(0);
  useEffect(() => {
    setPath(window.location.pathname);
    setPathLength(path.split("/").slice(1).length);
  }, [path, pathLength]);
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 bg-background px-4 sm:static sm:h-auto sm:bg-transparent sm:px-6 border-b-2 py-4 md:pb-4 md:pt-0">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Church className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">bibliasagrada.tech</span>
            </Link>
            <Link
              href="/painel"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Painel
            </Link>
            <Link
              href="/painel/estudo"
              className="flex items-center gap-4 px-2.5 text-foreground"
            >
              <Package className="h-5 w-5" />
              Estudo
            </Link>
            <Link
              href="/painel/classificacao"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Classificação
            </Link>
            <Link
              href="/painel/configuracoes"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Configurações
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList className="flex items-center">
          {path
            .split("/")
            .slice(1)
            .map((p, i) => (
              <BreadcrumbItem key={i}>
                <BreadcrumbLink asChild>
                  <Link
                    className="flex items-center gap-4"
                    href={`${
                      i == 0
                        ? p
                        : path
                            .split("/")
                            .slice(0, i + 1)
                            .join("/")
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                    {i !== pathLength - 1 ? <ArrowRight size={13} /> : ""}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
      <ThemeButtons className="" />
      <div className="relative ml-auto flex-1 md:grow-0 flex gap-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Pesquisar..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src={user.image}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Meu perfil</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Suporte</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
