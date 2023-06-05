import { Star } from "./Star";

interface RatingProps {
  rating: number;
  filledColor: string;
  unfilledColor: string;
}
export const Rating = ({ rating, filledColor, unfilledColor }: RatingProps) => {
  const fullStars = Math.floor(rating);
  const starPart = rating - fullStars;
  return (
    <div className="text-blue-500 my-5 font-bold flex flex-row">
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <Star color={index < fullStars ? filledColor : unfilledColor} />
          );
        })}
    </div>
  );
};
