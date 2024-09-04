'use client'

import { Suspense } from 'react'
import { VerifyEmail } from './container'

export default function Page() {
	return (
		<Suspense>
			<VerifyEmail />
		</Suspense>
	)
}
