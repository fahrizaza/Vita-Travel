import { createBrowserRouter } from "react-router";
import RootLayout from "./components/layout/RootLayout";
import HomePage from "./pages/home/HomePage";

/** Code-splits a page: its module is downloaded the first time the route is visited. */
const page = (load) => async () => ({ Component: (await load()).default });

/** URLs mirror the original file names (bali.html -> /bali, retreat.html -> /retreat, ...). */
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    // Shown (as nothing) while the first lazily loaded page downloads.
    HydrateFallback: () => null,
    children: [
      { index: true, element: <HomePage /> },
      { path: "retreat", lazy: page(() => import("./pages/TuscanyPage")) },
      { path: "bali", lazy: page(() => import("./pages/BaliPage")) },
      { path: "morocco", lazy: page(() => import("./pages/MoroccoPage")) },
      { path: "morocco-photo", lazy: page(() => import("./pages/MoroccoPhotoPage")) },
      { path: "portugal", lazy: page(() => import("./pages/PortugalPage")) },
      { path: "romania", lazy: page(() => import("./pages/RomaniaPage")) },
      { path: "coaches", lazy: page(() => import("./pages/CoachesPage")) },
      {
        path: "contacts",
        lazy: page(() => import("./pages/ContactsPage")),
        handle: { footerVariant: "simplified" },
      },
      { path: "privacy", lazy: page(() => import("./pages/PrivacyPage")) },
      { path: "terms", lazy: page(() => import("./pages/TermsPage")) },
      { path: "*", lazy: page(() => import("./pages/NotFoundPage")) },
    ],
  },
]);
