// src/index.js
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SidebarProvider } from "./context/SidebarContext";
import { DropdownProvider } from "./context/DropdownContext";
import { MapProvider } from "./context/MapContext";
import { ProjectProvider } from "./context/ProjectContext";
import { LineProvider } from "./context/LineContext";
import { TabProvider, OneSnapTabProvider } from "./context/TabContext";
import { ToastProvider } from "./context/ToastContext";
import { DndProvider } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DndProvider backend={MultiBackend} options={HTML5toTouch}>
    <ToastProvider>
      <ProjectProvider>
        <SidebarProvider>
          <DropdownProvider>
            <TabProvider>
              <OneSnapTabProvider>
                <MapProvider>
                  <LineProvider>
                    <App />
                  </LineProvider>
                </MapProvider>
              </OneSnapTabProvider>
            </TabProvider>
          </DropdownProvider>
        </SidebarProvider>
      </ProjectProvider>
    </ToastProvider>
  </DndProvider>
);