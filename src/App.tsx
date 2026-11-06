import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import Campaign from "./features/campaigns/Campaign";
import Room from "./features/rooms/Room";
import MainLayout from "./layout/MainLayout";
import Campaigns from "./pages/Campaigns";
import NotFound from "./pages/NotFound";
import RoomLayout from "./layout/RoomLayout";
import Transcript from "./features/rooms/Transcript";
import IdentityVerification from "./features/rooms/IdentityVerification";
import IntegrityAudit from "./features/rooms/IntegrityAudit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<NotFound />}>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate replace to="jobs" />} />
        <Route path="jobs">
          <Route index element={<Campaigns />} />
          <Route path="campaign/:campaignId" element={<Campaign />} />
          <Route path="room/:roomId" element={<RoomLayout />}>
            <Route index element={<Transcript />} />
            <Route path="transcript" element={<Transcript />} />
            <Route
              path="identity-verification"
              element={<IdentityVerification />}
            />
            <Route path="integrity-audit" element={<IntegrityAudit />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
