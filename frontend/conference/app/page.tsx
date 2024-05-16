'use client'

import { useMainStore } from '@/lib/providers/main-store'
import { P } from './components/ui/text'
import { Button } from './components/ui/button'
import { useShallow } from "zustand/react/shallow";

function useConferenceForm(){
	return useMainStore(
		useShallow((store)=>({
			title: store.conferenceForm.title
		}))
	)
}

export default function Home() {
	const {title} = useConferenceForm()
	return (
		<div>
			<P>{title}</P>
		</div>
	)
}
