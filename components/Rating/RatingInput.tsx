import { Star } from "./Star";
import { FieldValues, Path } from "react-hook-form";

interface RatingInputProps<TFormData extends FieldValues> {
  value: number;
  onChange: (...event: any[]) => void;
}
type Rating = 1 | 2 | 3 | 4 | 5;
export const RatingInput = <TFormData extends FieldValues>({
  value,
  onChange,
}: RatingInputProps<TFormData>) => {
  const ratings: Rating[] = [1, 2, 3, 4, 5];
  return (
    <div>
      <input type="number" className="hidden" />

      <ol className="flex flex-row">
        {ratings.map((currRating) => {
          return (
            <li key={currRating}>
              <button type="button" onClick={() => onChange(currRating)}>
                <Star color={currRating <= value ? "#333333" : "#777777"} />
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
