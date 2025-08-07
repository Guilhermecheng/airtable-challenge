export interface TimelineItem {
  id: string
  name: string
  startDate: string // YYYY-MM-DD format
  endDate: string // YYYY-MM-DD format
  color?: string
  category?: string
}

export interface LaneItem extends TimelineItem {
  lane: number
}

export function assignLanes(items: TimelineItem[]): LaneItem[] {
  // Sort items by start date, then by end date
  const sortedItems = [...items].sort((a, b) => {
    const startComparison = a.startDate.localeCompare(b.startDate)
    if (startComparison !== 0) return startComparison
    return a.endDate.localeCompare(b.endDate)
  })

  const lanes: LaneItem[][] = []
  const result: LaneItem[] = []

  for (const item of sortedItems) {
    let assignedLane = -1

    // Try to find an existing lane where this item fits
    for (let laneIndex = 0; laneIndex < lanes.length; laneIndex++) {
      const lane = lanes[laneIndex]
      const lastItemInLane = lane[lane.length - 1]

      // Check if this item can fit in this lane (no overlap)
      // Item can fit if it starts after the last item in the lane ends
      if (lastItemInLane.endDate < item.startDate) {
        assignedLane = laneIndex
        break
      }
    }

    // If no existing lane works, create a new one
    if (assignedLane === -1) {
      assignedLane = lanes.length
      lanes.push([])
    }

    const laneItem: LaneItem = { ...item, lane: assignedLane }
    lanes[assignedLane].push(laneItem)
    result.push(laneItem)
  }

  return result
}

export function formatDateForInput(dateStr: string): string {
  return dateStr
}

export function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr)
  date.setDate(date.getDate() + days)
  return date.toISOString().split("T")[0]
}

export function daysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
}
