import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 *
 *  funcion para unir y sobreescribir clases. (funcion propia de shadcn)
 * */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
