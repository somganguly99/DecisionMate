import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "178409291269-l5oueq8mf56gt3jr6u709a44g90qpnh7.apps.googleusercontent.com";

if (!clientId) {
  throw new Error("❌ Google Client ID is not defined. Set VITE_GOOGLE_CLIENT_ID in .env or Vercel.");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
