"use client";

import { cn } from "@/lib/utils";

type MainBannersProps = {
  className?: string;
};

export function MainBanners({ className }: MainBannersProps) {
  return (
    <div className={cn("h-full flex gap-4 md:flex-col justify-center", className)}>
      <div className="border rounded min-h-[60px] h-[33%] flex items-center justify-center min-w-[30%] bg-purple-200">
        Banner1
      </div>
      <div className="border rounded min-h-[60px] h-[33%] flex items-center justify-center min-w-[30%] bg-yellow-200">
        Banner2
      </div>
      <div className="border rounded min-h-[60px] h-[33%] flex items-center justify-center min-w-[30%] bg-green-200">
        Banner3
      </div>
    </div>
  );
}
