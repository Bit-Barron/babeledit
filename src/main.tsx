import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
