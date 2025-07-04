// src/index.js

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SidebarProvider } from "./context/SidebarContext";
import { DropdownProvider } from "./context/DropdownContext";
import { TabProvider } from "./context/TabContext";
import { ToastProvider } from "./context/ToastContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ToastProvider>
    <SidebarProvider>
      <DropdownProvider>
        <TabProvider>
          <App />
        </TabProvider>
      </DropdownProvider>
    </SidebarProvider>
  </ToastProvider>
);
