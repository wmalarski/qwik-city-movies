import { Slot, component$, type IntrinsicElements } from "@builder.io/qwik";
import clsx from "clsx";

type LinkProps = IntrinsicElements["a"];

export const StyledLink = component$((props: LinkProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      {...props}
      class={clsx(
        "cursor-pointer underline",
        "focus:outline-none focus:outline-offset-2",
        "focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline-current",
        props.class,
      )}
    >
      <Slot />
    </a>
  );
});
