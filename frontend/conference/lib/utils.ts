import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// cn: es una funcion que tomar como argumento un numero n de clases tailwindCSS
// lar ordena y evita conflictos entre clases
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return format(date, "dd/MMM/yyyy", { locale: es });
}
