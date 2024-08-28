import { auth } from '@/auth'
import StepFour from './step-four'

export default async function Page() {
	const session = await auth()

	if (!session) {
		return <p>no auth</p>
	}

	return <StepFour userId={session.userId} token={session.accessToken} />
}
