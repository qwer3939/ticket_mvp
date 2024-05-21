"use client";

import { numberFormat } from "@/lib/number"

interface Props {
  prefix?: string;
  value: number;
  suffix?: string;
  className?: string;
}

const Component: React.FC<Props> = ({ prefix, value, suffix, className }) => {
  return (
    <div className={`flex justify-start text-sm space-x-1 ${className || ''}`}>
      <span>{prefix || "Total"}</span>
      <span className="text-accent-foreground">{numberFormat(value)}</span>
      <span>{suffix || "records"}</span>
    </div>
  )
};

export default Component;
