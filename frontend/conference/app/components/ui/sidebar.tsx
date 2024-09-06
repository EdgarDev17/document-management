'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

interface SideBarContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode[]
}

const SideBarContainer = ({ children, className }: SideBarContainerProps) => {
	return (
		<div
			className={cn(
				'hidden sm:flex w-full h-full flex-col bg-white p-3 rounded-lg border border-gray-50 shadow-sm',
				className
			)}>
			<div className='flex flex-col h-full justify-between'>{children}</div>
		</div>
	)
}

interface SideBarItemProps {
	url: string
	children: React.ReactNode
}

const SideBarItem = ({ url, children }: SideBarItemProps) => {
	return (
		<Link href={url} className='block w-full'>
			{children}
		</Link>
	)
}

export { SideBarContainer, SideBarItem }
