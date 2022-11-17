import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./Context/AuthContext/AuthProvider";
import { ImageProvider } from "./Context/ImageContext/ImageProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ImageProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ImageProvider>
    </BrowserRouter>
  </StrictMode>
);
