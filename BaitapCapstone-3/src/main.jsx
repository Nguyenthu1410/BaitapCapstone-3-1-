import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/index.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ReduxProvider store={store}> 
        <App />
      </ReduxProvider>
      <Toaster position="top-right" duration="1000" richColors />
    </BrowserRouter>
  </QueryClientProvider>
);