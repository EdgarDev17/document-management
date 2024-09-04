import { auth } from "@/auth";
import StepOne from "./step-one";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <p>NO AUTORIZADO</p>;
  }

  return <StepOne />;
}
