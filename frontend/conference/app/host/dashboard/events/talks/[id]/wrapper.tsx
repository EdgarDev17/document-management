'use client'

import { Talk } from '@/types/models/talk'
import { DataContainer } from './data-container'
import { Conference } from '@/types/models/conference'

export function TalkClientWrapper({
	talk,
	token,
	event,
	userId,
}: {
	talk: any
	event: Conference
	token: string
	userId: number
}) {
	return (
		<DataContainer
			talkData={talk}
			eventData={event}
			token={token}
			currentUserId={userId}
		/>
	)
}
