'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { ReactNode } from 'react'

interface SideBarContainer extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode[]
}

const SideBarContainer = ({ children, className }: SideBarContainer) => {
	return (
		<div
			className={cn(
				'hidden sm:flex w-full h-full  flex-col bg-white p-3 rounded-lg border border-gray-50 shadow-sm',
				className
			)}>
			{children}
		</div>
	)
}

type SideBarItemProps = {
	url: string
	children: React.ReactNode
}

const SideBarItem = ({ url, children }: SideBarItemProps) => {
	return (
		<div className='w-full hidden sm:block'>
			<Link href={url}>{children}</Link>
		</div>
	)
}

export { SideBarContainer, SideBarItem }
