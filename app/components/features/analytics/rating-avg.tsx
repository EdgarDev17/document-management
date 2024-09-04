'use client'

import React from 'react'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { Progress } from '@/app/components/ui/progress'
import { Star, BarChart } from 'lucide-react'

interface EventAnalyticsProps {
	ratingTopics: {
		topicsID: number
		conferenceID: number
		promedio_score: number
	}
}

export function TopicRatingAvg({ ratingTopics }: EventAnalyticsProps) {
	const { topicsID, conferenceID, promedio_score } = ratingTopics

	const getColorClass = (score: number) => {
		if (score < 2) return 'bg-red-500'
		if (score < 3) return 'bg-yellow-500'
		return 'bg-green-500'
	}

	return (
		<Card className='w-full max-w-md mx-auto'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-2xl font-bold'>
					Analíticas de Charla
				</CardTitle>
				<BarChart className='h-6 w-6 text-muted-foreground' />
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					<div className='flex items-center space-x-4'>
						<Star className='h-6 w-6 text-yellow-400' />
						<div className='space-y-1'>
							<p className='text-sm font-medium leading-none'>
								Promedio de Calificación
							</p>
							<p className='text-2xl font-bold'>{promedio_score.toFixed(1)}</p>
						</div>
					</div>
					<Progress
						value={promedio_score * 20}
						className={`h-2 ${getColorClass(promedio_score)}`}
					/>
					<div className='flex justify-between text-sm text-muted-foreground'>
						<div>ID de Charla: {topicsID}</div>
						<div>ID de Conferencia: {conferenceID}</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
