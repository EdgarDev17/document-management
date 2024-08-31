import { auth } from '@/auth'
import { InstitutionContainer } from './institution-container'
import { NoAuth } from '@/app/components/common/noauth'

export default async function Page() {
	const session = await auth()

	if (!session) {
		return (
			<div className='w-full h-[90vh] flex justify-center items-center'>
				<NoAuth />
			</div>
		)
	}

	return <InstitutionContainer token={session.accessToken} />
}
