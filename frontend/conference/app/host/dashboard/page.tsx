import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  console.log("session en el dash", session);

  if (!session) return <div>Not authenticated</div>;
  return <div>soy un dashboard</div>;
}
