"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardView } from "@/components/DashboardView";
import { CustomerList } from "@/components/CustomerList";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  if (status === "loading") return <p className="p-4">Loading...</p>;
  return (
    <div>
      {/* <p>Dashboard...</p> */}
      <Navbar />
      <DashboardView />
      <CustomerList />
    </div>
  );
}
