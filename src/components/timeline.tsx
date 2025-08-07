import { useRef, useState } from "react";
import { calculateDayWidth, cn } from "../lib/utils";
import { timelineItems } from "../timeline-items";
import { assignLanes } from "../utils/assign-lanes";
import { TimelineItem } from "./timeline-item";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";

function getTimelineRange(items: typeof timelineItems) {
  const starts = items.map(i => new Date(i.start).getTime());
  const ends = items.map(i => new Date(i.end).getTime());
  return {
    min: Math.min(...starts),
    max: Math.max(...ends),
  };
}

function formatDate(date: number) {
  return new Date(date).toLocaleDateString();
}

export function Timeline() {
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const [zoom, setZoom] = useState(1);
  const lanes = assignLanes(timelineItems);

  const { min, max } = getTimelineRange(timelineItems);
  const totalDuration = max - min;
  const totalInDays = totalDuration / (1000 * 60 * 60 * 24);

  const DAY_WIDTH = calculateDayWidth(zoom, 60, totalDuration);

  const rulerDates = [];
  for (let i = 0; i <= (totalInDays + 2); i++) {
    const date = min + i * (1000 * 60 * 60 * 24)
    rulerDates.push(formatDate(date));
  }

  return (
    <section className="h-full w-full">
      {/* Select de zoom */}
      <div className="w-[90vw] mx-auto flex justify-end items-center mb-8">
        <span className="mr-2 text-sm text-gray-700">Zoom:</span>
        <div className="w-24">
          <Select value={String(zoom)} onValueChange={val => setZoom(Number(val))}>
            <SelectTrigger className="w-full border rounded px-2 py-1 text-sm">
              <SelectValue placeholder="Zoom" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.5">0.5x</SelectItem>
              <SelectItem value="0.8">0.8x</SelectItem>
              <SelectItem value="1">1x</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>


      <ScrollArea
        className={cn(
          "w-[90vw] mx-auto",
          "rounded-lg border-2 border-gray-200 p-0"
        )}
      >
        <div className="flex mb-4 bg-zinc-100 border-b border-zinc-300 p-2 w-full">
          {rulerDates.map((date, idx) => {
            return (
              <div
                key={idx}
                style={{
                  width: DAY_WIDTH,
                  textAlign: "center",
                  fontSize: zoom < 1 ? 8 : 10,
                  color: "#888",

                }}
              >
                <span
                  style={{
                    display: zoom < 1 && (idx % 2 === 0) ? "none" : ""
                  }}
                >
                  {date}
                </span>
              </div>
            )
          })}
        </div>

        <div
          ref={timelineRef}
          className="flex flex-col"
        >
          {lanes.map((lane, index) => (
            <div key={index} className="w-full flex gap-2 pb-8 pt-8 border-b border-dashed relative">
              {lane.map((item) => {
                const itemStart = new Date(item.start).getTime();
                const itemEnd = new Date(item.end).getTime();

                const leftDiffInDays = 1 + ((itemStart - min) / (1000 * 60 * 60 * 24));

                const left = DAY_WIDTH * leftDiffInDays;

                const diffInDays = (itemEnd - itemStart) / (1000 * 60 * 60 * 24);
                const width = (diffInDays + 1) * DAY_WIDTH


                return (
                  <div
                    key={item.id}
                    style={{
                      position: "absolute",
                      left,
                      top: 8,
                      paddingRight: 20,
                    }}
                  >
                    <TimelineItem
                      title={item.name}
                      start={item.start}
                      end={item.end}
                      color={item.color}
                      width={width < DAY_WIDTH ? DAY_WIDTH : width}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>

  );
}