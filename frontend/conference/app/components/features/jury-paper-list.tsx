'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/app/components/ui/hover-card'
import { FileText, Star } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

import Link from 'next/link'

export type Document = {
	documentID: number
	name: string
	regDate: string
	review: string
	userID: number
	topicsID: number
	url: string
	fileName: string
	userName: string
	userLastname: string
	userEmail: string
	documentBase: string
}

function truncateText(text: string, maxLength: number) {
	if (text.length <= maxLength) return text
	return text.slice(0, maxLength) + '...'
}

export function JuryModeContent({
	documents,
	conferenceId,
}: {
	documents: Document[]
	conferenceId: number
}) {
	return (
		<div className='space-y-4'>
			<h3 className='text-2xl font-bold mb-4'>Papers para Evaluación</h3>
			{documents.length > 0 ? (
				<ScrollArea className='h-[400px] w-full rounded-md border'>
					<motion.div
						className='space-y-2 p-4'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ staggerChildren: 0.1 }}>
						{documents.map((doc) => (
							<motion.div
								key={doc.documentID}
								className='flex items-center justify-between p-3 rounded-lg bg-card hover:bg-accent transition-colors'
								whileHover={{ scale: 1.01 }}
								whileTap={{ scale: 0.99 }}>
								<div className='flex items-center space-x-3 overflow-hidden'>
									<FileText className='h-6 w-6 flex-shrink-0 text-primary' />
									<div className='min-w-0'>
										<HoverCard>
											<HoverCardTrigger asChild>
												<h4 className='font-semibold text-sm'>
													{truncateText(doc.name, 24)}
												</h4>
											</HoverCardTrigger>
											<HoverCardContent className='w-fit z-50'>
												<p>{doc.name}</p>
											</HoverCardContent>
										</HoverCard>
										<p className='text-xs text-muted-foreground truncate'>
											{`${doc.userName} ${doc.userLastname}`}
										</p>
										<div className='text-xs text-muted-foreground'>
											{formatDistanceToNow(new Date(doc.regDate), {
												addSuffix: true,
												locale: es,
											})}
										</div>
									</div>
								</div>
								<div className='flex items-center space-x-2 flex-shrink-0'>
									<Badge
										variant={doc.review === '0' ? 'secondary' : 'default'}
										className='text-xs'>
										{doc.review === '0' ? 'Pendiente' : 'Revisado'}
									</Badge>
									<Link
										href={`/documents/${doc.documentID}?conferenceID=${conferenceId}`}>
										<Button
											variant='outline'
											size='sm'
											className='flex items-center text-xs'>
											<Star className='h-3 w-3 mr-1' />
											Calificar
										</Button>
									</Link>
								</div>
							</motion.div>
						))}
					</motion.div>
				</ScrollArea>
			) : (
				<p className='text-muted-foreground'>
					No hay papers enviados para esta charla aún.
				</p>
			)}
		</div>
	)
}
