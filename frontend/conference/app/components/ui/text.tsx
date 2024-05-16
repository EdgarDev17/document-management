import { cn } from '@/lib/utils'
import React from 'react'

interface TextProps extends React.HtmlHTMLAttributes<HTMLParagraphElement> {}

const P = React.forwardRef<HTMLParagraphElement, TextProps>(
	({ className, children, ...props }, ref) => {
		return (
			<p
				ref={ref}
				className={cn('text-base text-neutral-800', className)}
				{...props}>
				{children}
			</p>
		)
	}
)

P.displayName = 'Text'

export { P }
