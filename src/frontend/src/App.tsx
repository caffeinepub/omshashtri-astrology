import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { StarField } from "./components/StarField";
import { AboutPage } from "./pages/AboutPage";
import { BirthChartPage } from "./pages/BirthChartPage";
import { HomePage } from "./pages/HomePage";
import { HoroscopesPage } from "./pages/HoroscopesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <div className="relative nebula-bg min-h-screen">
      <StarField count={80} />
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const horoscopesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/horoscopes",
  component: HoroscopesPage,
});

const birthChartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/birth-chart",
  component: BirthChartPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  horoscopesRoute,
  birthChartRoute,
  aboutRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
