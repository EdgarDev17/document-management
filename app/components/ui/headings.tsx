import { cn } from '@/lib/utils'
import React from 'react'

// esta interfaz herada todos los atributos html de los elementos
// h1 -> h6
export interface HeadingProps
	extends React.HtmlHTMLAttributes<HTMLHeadingElement> {}

// al construir el componente utilizanod foward ref
// podemos modificar el nodo(h2) desde el componente padre
// ya que el nodo queda expuesto
const H1 = React.forwardRef<HTMLHeadingElement, HeadingProps>(function (
	{ className, ...props },
	ref
) {
	return (
		<h2 ref={ref} className={cn('text-4xl font-bold', className)} {...props} />
	)
})
H1.displayName = 'H1'

const H2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(function (
	{ className, ...props },
	ref
) {
	return (
		<h2 ref={ref} className={cn('text-2xl font-bold', className)} {...props} />
	)
})

H2.displayName = 'H2'

const H3 = React.forwardRef<HTMLHeadingElement, HeadingProps>(function (
	{ className, ...props },
	ref
) {
	return (
		<h2 ref={ref} className={cn('text-xl font-bold', className)} {...props} />
	)
})

H3.displayName = 'H3'
const H4 = React.forwardRef<HTMLHeadingElement, HeadingProps>(function (
	{ className, ...props },
	ref
) {
	return (
		<h2 ref={ref} className={cn('text-xl font-bold', className)} {...props} />
	)
})

H4.displayName = 'H4'

export { H1, H2, H3, H4 }
