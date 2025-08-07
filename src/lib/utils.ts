import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateDayWidth = (
  zoom: number,
  containerWidth: number,
  totalDays: number,
) => {
  const BASE_DAY_WIDTH = 60

  const standardWidth = Math.max(BASE_DAY_WIDTH * zoom, 5)

  if (zoom < 0.5 && containerWidth > 0) {
    const fillContainerWidth = (containerWidth - 20) / totalDays

    return Math.max(fillContainerWidth, 5)
  }

  return standardWidth
}
