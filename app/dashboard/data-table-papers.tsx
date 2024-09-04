'use client'

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/app/components/ui/table'

import { Button } from '../components/ui/button'
import { P } from '../components/ui/text'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className='rounded-md border w-full h-full'>
			<Table className='w-full h-full rounded-md bg-white'>
				<TableHeader className='w-full h-[4px] bg-gradient-metallic rounded-md'>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id} className='py-6'>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className='cursor-pointer'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className='h-24 text-center'>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<div className='w-full flex items-center justify-between px-4 space-x-2 py-4 bg-glass bg-gradient-metallic'>
				<P className='text-sm text-gray-600'>5 documentos por página</P>
				<div className='flex items-center justify-end space-x-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						<ChevronLeftIcon className='w-4 h-4 text-gray-600' />
					</Button>
					<p className='text-sm text-gray-600'>
						{table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
					</p>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						<ChevronRightIcon className='w-4 h-4 text-gray-600' />
					</Button>
				</div>
			</div>
		</div>
	)
}
