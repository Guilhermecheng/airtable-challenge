import { useRef } from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { cn } from "../lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface TimelineItemProps {
  title: string;
  start: string;
  end: string;
  width: number;
  color: string;
  onResize?: (newStart: string, newEnd: string) => void;
}

export function TimelineItem({
  title,
  start,
  end,
  width,
  color,
}: TimelineItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          ref={cardRef}
          className="relative group"
          style={{ width: "100%" }}
        >
          {/* Handle esquerda */}
          <div
            className="absolute left-0 top-0 h-full w-2 cursor-ew-resize z-10"
          />
          {/* Handle direita */}
          <div
            className="absolute right-0 top-0 h-full w-2 cursor-ew-resize z-10"
          />
          <Card style={{ width: width }} className={cn(
            "rounded-sm px-2 py-1 gap-0 overflow-x-hidden",
            color
          )}>
            <CardHeader className="p-0 gap-0">
              <CardTitle className="text-sm font-semibold text-nowrap truncate text-gray-800 p-0 gap-0 overflow-x-hidden">
                {title}
              </CardTitle>
            </CardHeader>
            <CardFooter className="text-xs text-gray-500 p-0 gap-0 text-nowrap text-truncate overflow-x-hidden">
              {start} - {end}
            </CardFooter>
          </Card>
        </div>
      </TooltipTrigger>


      <TooltipContent>
        <div>
          <div><strong>{title}</strong></div>
          <div>Start: {start}</div>
          <div>End: {end}</div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}