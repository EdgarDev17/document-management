import { auth } from "@/auth";
import { Container } from "./container";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <p>No auth</p>;
  }

  return <Container token={session.accessToken} userId={session.userId} />;
}
