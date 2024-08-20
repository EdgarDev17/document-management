import { auth } from "@/auth";
import { InstitutionContinaer } from "./institution-container";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <p>No auth</p>;
  }

  return <InstitutionContinaer token={session.accessToken} />;
}
