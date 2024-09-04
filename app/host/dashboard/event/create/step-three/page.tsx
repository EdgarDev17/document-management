import { auth } from "@/auth";
import StepThree from "./step-three";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <p>no auth</p>;
  }

  return <StepThree userId={session.userId} token={session.accessToken} />;
}
