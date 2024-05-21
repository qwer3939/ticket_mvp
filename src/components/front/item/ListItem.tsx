import Image from "next/image";
import { TicketIcon } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type ListItemProps = {
  item: {
    id: string;
    category: string;
    title: string;
    user_id: string;
    ticket_type: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
  className?: string;
};

export function LIstItem({ item, className }: ListItemProps) {
  return (
    <figure className={cn("w-full hover:bg-primary/5 group rounded", className)}>
      <div className="bg-primary/10 rounded">
        <div className="w-full h-[180px] flex items-center justify-center">
          <TicketIcon className="w-[80px] h-[80px] group-hover:w-[90px] group-hover:h-[90px] transition-all" />
        </div>
        {/* <Image
          src={artwork.art}
          alt={`Photo by ${artwork.artist}`}
          className="aspect-[3/4] h-fit w-fit object-cover"
          width={300}
          height={400}
        /> */}
      </div>
      <figcaption className="py-4">
        <div className="truncate">
          <Link href={`/${item.category.toLowerCase()}/${item.ticket_type.toLowerCase()}/${item.id}`}>
            {item.title}
          </Link>
        </div>
        <div>
          <span className="text-muted-foreground font-semibold">{item.user_id}</span>
        </div>
      </figcaption>
    </figure>
  );
}

type LIstItemSkeletonProps = {
  className?: string;
};
export function LIstItemSkeleton({ className }: LIstItemSkeletonProps) {
  return (
    <figure className={cn("w-full hover:bg-primary/5 group rounded", className)}>
      <div className="bg-primary/10 rounded">
        <Skeleton className="w-full h-[180px] flex items-center justify-center">
          <TicketIcon className="w-[80px] h-[80px] group-hover:w-[90px] group-hover:h-[90px] transition-all text-primary/50" />
        </Skeleton>
        {/* <Image
          src={artwork.art}
          alt={`Photo by ${artwork.artist}`}
          className="aspect-[3/4] h-fit w-fit object-cover"
          width={300}
          height={400}
        /> */}
      </div>
      <figcaption className="py-4 space-y-2">
        <div className="truncate">
          <Skeleton className="w-full h-4" />
        </div>
        <div>
          <Skeleton className="w-1/2 h-3" />
        </div>
      </figcaption>
    </figure>
  );
}
