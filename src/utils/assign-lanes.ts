import type { TimelineItemProps } from "../timeline-items"

/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * @returns an array of arrays containing items.
 */
export function assignLanes(items: TimelineItemProps[]): TimelineItemProps[][] {
  const sortedItems = [...items].sort((a, b) => {
    const startComparison = a.start.localeCompare(b.start)
    if (startComparison !== 0) return startComparison
    return a.end.localeCompare(b.end)
  })

  const lanes: TimelineItemProps[][] = []
  // const result: LaneItem[] = []

  function assignItemToLane(item: TimelineItemProps) {
    for (const lane of lanes) {
      if (new Date(lane[lane.length - 1].end) < new Date(item.start)) {
        lane.push(item)
        return
      }
    }
    lanes.push([item])
  }

  for (const item of sortedItems) {
    assignItemToLane(item)
  }
  return lanes
}
