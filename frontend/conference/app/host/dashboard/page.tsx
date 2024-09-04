import { NoAuth } from '@/app/components/common/noauth'
import { auth } from '@/auth'

export default async function Page() {
	const session = await auth()

	if (!session)
		return (
			<div className='w-full h-[90vh] flex justify-center items-center'>
				<NoAuth />
			</div>
		)
	return <div>soy un dashboard</div>
}
