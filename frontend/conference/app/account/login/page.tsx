import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Login from "./form";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return <Login />;
}
