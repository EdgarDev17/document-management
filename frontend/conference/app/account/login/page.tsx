import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Login from "./form";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  const rol = searchParams.rol;

  if (session && rol === "general") {
    redirect("/dashboard");
  }

  if (session && rol === "admin") {
    redirect("/host/dashboard/events");
  }

  if (session && rol == null) {
    redirect("/dashboard");
  }
  return <Login />;
}
