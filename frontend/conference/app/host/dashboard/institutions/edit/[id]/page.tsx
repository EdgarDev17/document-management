import { auth } from "@/auth";
import EditForm from "./edit-form";

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();

  return <EditForm id={params.id.toString()} token={session.accessToken} />;
}
