import './globals.css'
import React from 'react'
import Navbar from './components/ui/navbar'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'EventMaster',
	description: 'x',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await auth()

	return (
		<html lang='en'>
			<body className={cn(inter.className, 'bg-white')}>
				<Navbar session={session} />
				<div className='w-full mx-auto'>{children}</div>
				<Toaster richColors position={'top-center'} />
			</body>
		</html>
	)
}
