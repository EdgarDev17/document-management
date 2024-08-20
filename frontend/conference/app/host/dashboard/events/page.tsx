import { auth } from "@/auth";
import { EventsContainer } from "./events-container";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <p>No auth</p>;
  }
  return (
    <div className="w-full h-full md:h-[80vh] flex justify-center items-center">
      <EventsContainer token={session.accessToken} />
    </div>
  );
}
