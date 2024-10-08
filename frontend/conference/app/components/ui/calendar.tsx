'use client'

import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/app/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
	showCaption?: boolean
}

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	showCaption = false,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn('p-3', className)}
			classNames={{
				months: 'flex flex-col space-y-4',
				month: 'space-y-4',
				caption: cn(
					'flex justify-center pt-1 relative items-center',
					showCaption ? '' : 'hidden'
				),
				caption_label: cn('text-sm font-medium', showCaption ? '' : 'hidden'),
				nav: 'space-x-1 flex items-center',
				nav_button: cn(
					buttonVariants({ variant: 'outline' }),
					'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
				),
				nav_button_previous: 'absolute left-1',
				nav_button_next: 'absolute right-1',
				table: 'w-full border-collapse space-y-1',
				head_row: 'flex',
				weekdays: 'grid grid-cols-7',
				head_cell:
					'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
				row: 'flex  mt-2',
				cell: cn(
					'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-zinc-900 [&:has([aria-selected].day-outside)]:bg-zinc-900/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
					props.mode === 'range'
						? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
						: '[&:has([aria-selected])]:rounded-md'
				),
				day: cn(
					buttonVariants({ variant: 'ghost' }),
					'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
				),
				day_range_start: 'day-range-start',
				day_range_end: 'day-range-end',
				selected:
					'bg-zinc-900 text-zinc-100 hover:bg-zinc-900 hover:text-zinc-100 focus:bg-primary focus:text-primary-foreground',
				today: 'bg-zinc-200 text-accent-foreground',
				outside:
					'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
				disabled: 'text-muted-foreground opacity-50',
				range_middle:
					'aria-selected:bg-accent aria-selected:text-accent-foreground',
				hidden: 'invisible',
				...classNames,
			}}
			components={{
				//@ts-ignore
				IconLeft: ({ ...props }) => <ChevronLeftIcon className='h-4 w-4' />,
				IconRight: ({ ...props }) => <ChevronRightIcon className='h-4 w-4' />,
				Caption: ({ displayMonth }: { displayMonth: Date }) => (
					<div className='flex justify-center pt-1 relative items-center'>
						<span className='text-sm font-medium'>
							{displayMonth.toLocaleString('default', { month: 'long' })}
						</span>
					</div>
				),
			}}
			{...props}
		/>
	)
}

Calendar.displayName = 'Calendar'

export { Calendar }
