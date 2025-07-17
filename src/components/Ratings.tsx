import React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

const ratingVariants = {
  default: {
    star: "text-foreground",
    emptyStar: "text-muted-foreground",
  },
  destructive: {
    star: "text-red-500",
    emptyStar: "text-red-200",
  },
  yellow: {
    star: "text-yellow-400",
    emptyStar: "text-yellow-200",
  },
}

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
  totalStars?: number
  size?: number
  fill?: boolean
  Icon?: React.ReactElement
  variant?: keyof typeof ratingVariants
}

const Ratings: React.FC<RatingsProps> = ({
  rating,
  totalStars = 5,
  size = 20,
  fill = true,
  Icon = <Star />,
  variant = "default",
  className,
  ...rest
}) => {
  const fullStars = Math.floor(rating)
  const hasPartial = rating % 1 > 0
  const emptyStars = totalStars - fullStars - (hasPartial ? 1 : 0)

  const renderIcon = (
    index: number,
    type: "full" | "empty",
    customClass?: string
  ) =>
    React.cloneElement(Icon, {
      key: index,
      size,
      className: cn(
        type === "empty" ? "fill-transparent stroke-muted-foreground" : fill ? "fill-current" : "fill-transparent",
        ratingVariants[variant][type === "full" ? "star" : "emptyStar"],
        customClass
      ),
    })

  const PartialStar: React.FC<{ fillPercentage: number }> = ({
    fillPercentage,
  }) => (
    <div className="relative inline-block">
      {renderIcon(-1, "empty", "fill-transparent")}
      <div
        className="absolute top-0 left-0 overflow-hidden"
        style={{ width: `${fillPercentage * 100}%` }}
      >
        {renderIcon(-2, "full")}
      </div>
    </div>
  )

  return (
    <div className={cn("flex items-center gap-1", className)} {...rest}>
      {[...Array(fullStars)].map((_, i) => renderIcon(i, "full"))}
      {hasPartial && <PartialStar fillPercentage={rating % 1} />}
      {[...Array(emptyStars)].map((_, i) =>
        renderIcon(i + fullStars + 1, "empty")
      )}
    </div>
  )
}

export { Ratings }
