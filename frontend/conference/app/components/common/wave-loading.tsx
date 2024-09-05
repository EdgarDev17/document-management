import React from 'react'
import { cn } from '@/lib/utils'

interface WaveLoadingProps {
	className?: string
	dotClassName?: string
}

export function WaveLoading({
	className,
	dotClassName,
}: WaveLoadingProps = {}) {
	return (
		<div
			role='status'
			aria-label='Loading'
			className={cn('flex space-x-2', className)}>
			{[...Array(3)].map((_, i) => (
				<div
					key={i}
					className={cn(
						'w-2 h-2 bg-primary rounded-full animate-wave',
						dotClassName
					)}
					style={{ animationDelay: `${i * 0.1}s` }}
				/>
			))}
		</div>
	)
}
