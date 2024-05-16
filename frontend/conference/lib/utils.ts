import { twMerge } from 'tailwind-merge'
import { clsx, ClassValue } from 'clsx'

// cn: es una funcion que tomar como argumento un numero n de clases tailwindCSS
// lar ordena y evita conflictos entre clases
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
