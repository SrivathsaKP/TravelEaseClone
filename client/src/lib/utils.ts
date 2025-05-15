import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useLocation } from "wouter"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useSearchParams() {
  const [location] = useLocation()
  
  const getParams = () => {
    const params = new URLSearchParams(window.location.search)
    return params
  }
  
  const getParam = (key: string) => {
    return getParams().get(key)
  }
  
  const setParam = (key: string, value: string) => {
    const params = getParams()
    params.set(key, value)
    return params.toString()
  }
  
  return {
    params: getParams(),
    getParam,
    setParam
  }
}
