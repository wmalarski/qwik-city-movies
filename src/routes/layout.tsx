import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <main>
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a>
      </footer>
    </>
  );
});
