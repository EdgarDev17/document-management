import './globals.css'
import React from 'react'
import Navbar from './components/ui/navbar'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'EventMaster',
	description: 'x',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={cn(inter.className, 'bg-white')}>
				<Navbar />
				<div className='w-full mx-auto'>{children}</div>
				<Toaster richColors position={'top-center'} />
			</body>
		</html>
	)
}
