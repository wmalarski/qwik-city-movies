import { component$, Slot } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { Navbar } from "~/modules/Navbar/Navbar";

export const onGet: RequestHandler = ({ cacheControl }) => {
  cacheControl({
    // Max once every one day, revalidate on the server to get a fresh version of this page
    maxAge: 60 * 60 * 24,
    public: true,
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
  });
  cacheControl(
    {
      // Max once every one day, revalidate on the server to get a fresh version of this page
      maxAge: 60 * 60 * 24,
      public: true,
      // Always serve a cached response by default, up to a week stale
      staleWhileRevalidate: 60 * 60 * 24 * 7,
    },
    "Cloudflare-CDN-Cache-Control",
  );
};

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
