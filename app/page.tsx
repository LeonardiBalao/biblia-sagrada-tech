import { Hero } from "@/components/structure/hero";
import Navbar from "@/components/structure/navbar";
import { auth } from "@/server/auth";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <Navbar user={session?.user} />
      <Hero />
    </>
  );
}
