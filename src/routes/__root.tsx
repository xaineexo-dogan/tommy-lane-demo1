import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteLoader } from "@/components/site-loader";
import { MouseNotes } from "@/components/mouse-notes";

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader />
      <div className="flex items-center justify-center px-6 py-32">
        <div className="max-w-md text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">Error 404</p>
          <h1 className="font-serif text-6xl mb-6">Off the record.</h1>
          <p className="opacity-70 mb-8">The page you're looking for isn't in our catalog.</p>
          <Link to="/" className="inline-block px-8 py-4 bg-ink text-paper text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-brand-accent transition-colors">
            Return home
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="min-h-screen bg-paper text-ink flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-4xl mb-4">This page didn't load</h1>
        <p className="opacity-70 mb-8">Something went wrong on our end.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="px-6 py-3 bg-ink text-paper text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-brand-accent transition-colors"
          >
            Try again
          </button>
          <a href="/" className="px-6 py-3 border border-ink/20 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-ink hover:text-paper transition-colors">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tommy Lane Publishing — 45 Years of Uncompromised Sound" },
      { name: "description", content: "Independent publisher with fully owned master and publishing rights across four decades of professionally recorded music. Available for film, TV, and advertising sync." },
      { property: "og:title", content: "Tommy Lane Publishing — 45 Years of Uncompromised Sound" },
      { property: "og:description", content: "Independent publisher with fully owned master and publishing rights across four decades of professionally recorded music. Available for film, TV, and advertising sync." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Tommy Lane Publishing" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Tommy Lane Publishing — 45 Years of Uncompromised Sound" },
      { name: "twitter:description", content: "Independent publisher with fully owned master and publishing rights across four decades of professionally recorded music. Available for film, TV, and advertising sync." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/12734d31-c197-4324-9224-e3bf4c9b7e7e/id-preview-9bafa5f5--16c2bbf5-9f18-460d-80b0-4147317eebd2.lovable.app-1785169482179.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/12734d31-c197-4324-9224-e3bf4c9b7e7e/id-preview-9bafa5f5--16c2bbf5-9f18-460d-80b0-4147317eebd2.lovable.app-1785169482179.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Tommy Lane Publishing LLC",
          description: "Independent music publisher of master and publishing rights.",
          foundingDate: "1979",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteLoader />
      <MouseNotes />
      <div className="min-h-screen bg-paper text-ink">
        <SiteHeader />
        <Outlet />
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
