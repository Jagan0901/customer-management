"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  if (status === "loading")
    return <p className="p-4 text-center">Checking session...</p>;
  if (status === "authenticated") return null;
  return (
    <div>
      <LoginForm />
    </div>
  );
}
