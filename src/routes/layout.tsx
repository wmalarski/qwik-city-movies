import {
  component$,
  Slot,
  useContextProvider,
  useSignal,
} from "@builder.io/qwik";
import { Footer } from "~/modules/Footer/Footer";
import { Navbar } from "~/modules/Navbar/Navbar";
import { ContainerContext } from "./context";

export default component$(() => {
  const containerRef = useSignal<Element | null>(null);

  useContextProvider(ContainerContext, containerRef);

  return (
    <div class="flex h-screen w-screen flex-col-reverse md:flex-row">
      <Navbar />
      <div
        ref={(e) => (containerRef.value = e)}
        class="w-full overflow-y-scroll"
      >
        <main>
          <Slot />
        </main>
        <Footer />
      </div>
    </div>
  );
});
