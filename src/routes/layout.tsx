import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "~/modules/Navbar/Navbar";

export default component$(() => {
  return (
    <div class="flex h-screen w-screen flex-col-reverse md:flex-row">
      <Navbar />
      <main class="w-full max-w-full overflow-x-hidden">
        <Slot />
      </main>
    </div>
  );
});
