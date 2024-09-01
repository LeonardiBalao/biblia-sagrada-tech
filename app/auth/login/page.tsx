import LoginForm from "./login-form";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <>
      <main className="flex flex-col justify-center items-center h-min-screen">
        <LoginForm />
      </main>
    </>
  );
}
