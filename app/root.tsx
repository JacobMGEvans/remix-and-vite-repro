import type { MetaFunction, LoaderFunction } from "@remix-run/node";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { rootAuthLoader } from "@clerk/remix/ssr.server";
// Import ClerkApp
import { ClerkApp, ClerkErrorBoundary } from "@clerk/remix";

export const meta: MetaFunction = () => [
  {
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
  },
];

export const loader: LoaderFunction = (args) => {
  return rootAuthLoader(args, {
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    secretKey: import.meta.env.VITE_CLERK_SECRET_KEY,
  });
};
// export const ErrorBoundary = ClerkErrorBoundary();

function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// Wrap your app in ClerkApp(app)
export default ClerkApp(App);
