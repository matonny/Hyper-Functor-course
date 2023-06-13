import { useState } from "react";
import { Star } from "./Star";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface RatingInputProps<TFormData extends FieldValues> {
  name: Path<TFormData>;
  register: UseFormRegister<TFormData>;
}
type Rating = 1 | 2 | 3 | 4 | 5;
export const RatingInput = <TFormData extends FieldValues>({
  name,
  register,
}: RatingInputProps<TFormData>) => {
  const [rating, setRating] = useState<0 | Rating>(0);
  const ratings: Rating[] = [1, 2, 3, 4, 5];
  return (
    <div>
      <input type="number" value={rating} {...register(name)} />

      <ol>
        {ratings.map((currRating) => {
          return (
            <li>
              <button onClick={() => setRating(currRating)}>
                <Star color={currRating <= rating ? "#333333" : "#777777"} />
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
