import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Nav, LeftBar, RightBar, MobileNav, Modal } from "./components";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Nav />
        <div className="w-full flex px-5 lg:px-[12vw]">
          <LeftBar />
          <App />
          <RightBar />
        </div>
        <MobileNav />
        <Modal />
      </QueryClientProvider>
    </Router>
  </ClerkProvider>
);
