import { component$ } from "@builder.io/qwik";
import ImgStarsFilled from "~/media/stars-filled.png?jsx";
import ImgStars from "~/media/stars.png?jsx";

type Props = {
  rating?: number;
};

export const Stars = component$((props: Props) => {
  const stars = Math.round((props.rating || 0) * 10) / 10;
  const value = 100 - Math.round((props.rating || 0) * 10);
  const style = { clipPath: `inset(0px ${value}% 0px 0px)` };

  return (
    <div class="relative flex flex-row items-center gap-2">
      <ImgStars class="h-3 w-20" alt="rating" />
      <ImgStarsFilled alt="rating" class="absolute h-3 w-20" style={style} />
      <div class="text-sm opacity-80">{stars}</div>
    </div>
  );
});
