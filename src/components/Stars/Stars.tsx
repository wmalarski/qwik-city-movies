import { component$, useComputed$ } from "@builder.io/qwik";
import ImgStarsFilled from "~/media/stars-filled.png?jsx";
import ImgStars from "~/media/stars.png?jsx";

type Props = {
  rating?: number;
};

export const Stars = component$((props: Props) => {
  const stars = useComputed$(() => {
    return Math.round((props.rating || 0) * 10) / 10;
  });

  return (
    <div class="relative flex flex-row items-center gap-2">
      <ImgStars class="h-3 w-20" alt="rating" />
      <ImgStarsFilled
        alt="rating"
        class="absolute h-3 w-20"
        style={{ clipPath: `inset(0px ${100 - stars.value * 10}% 0px 0px)` }}
      />
      <div class="text-sm opacity-80">{stars.value}</div>
    </div>
  );
});
