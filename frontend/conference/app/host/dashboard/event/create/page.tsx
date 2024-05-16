'use client'

import { Button } from '@/app/components/ui/button'
import { H1 } from '@/app/components/ui/headings'
import { useMainStore } from '@/lib/providers/main-store'

export default function Page() {
	const { conference, createConference } = useMainStore((state) => state)

	return (
		<div>
			<H1>Crear una conferencia</H1>
			<p>{conference.title}</p>
			<Button onClick={() => createConference('sdkfjslkd')}>Titulo</Button>
		</div>
	)
}
