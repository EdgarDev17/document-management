import { NoAuth } from '@/app/components/common/noauth'
import { EventSearch } from '@/app/components/features/eventsearch'
import { auth } from '@/auth'

export default async function Page() {
	const session = await auth()

  if (!session) {
    return "no auth";
  }

  return (
    <div>
      <EventSearch token={session.accessToken} />
    </div>
  );
}
