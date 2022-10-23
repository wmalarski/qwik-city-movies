import { component$, Slot } from "@builder.io/qwik";
import { Footer } from "~/modules/Footer/Footer";
import { Navbar } from "~/modules/Navbar/Navbar";

export default component$(() => {
  return (
    <div class="flex h-screen w-screen flex-row">
      <Navbar />
      <div class="w-full overflow-scroll">
        <main>
          <Slot />
        </main>
        <Footer />
      </div>
    </div>
  );
});
