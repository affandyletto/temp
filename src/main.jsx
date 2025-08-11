// src/main.jsx
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Mobile from "./Mobile";
import { SidebarProvider } from "./context/SidebarContext";
import { DropdownProvider } from "./context/DropdownContext";
import { UserProvider } from "./context/UserContext";
import { MapProvider } from "./context/MapContext";
import { ProjectProvider } from "./context/ProjectContext";
import { LineProvider } from "./context/LineContext";
import { TabProvider, OneSnapTabProvider } from "./context/TabContext";
import { ToastProvider } from "./context/ToastContext";
import { MobileProvider } from "./context/Mobile/MobileContext";
import { MobileSurveyProvider } from "./context/Mobile/MobileSurveyContext";
import { MobileOnesnapProvider } from "./context/Mobile/MobileOnesnapContext";
import { DndProvider } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';

// Check if device is mobile
const isMobile = () => {
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Desktop App with all desktop contexts
const DesktopApp = () => (
  <DndProvider backend={MultiBackend} options={HTML5toTouch}>
    <ToastProvider>
      <UserProvider>
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
      </UserProvider>
    </ToastProvider>
  </DndProvider>
);

// Mobile App with mobile-specific contexts
const MobileApp = () => (
  <ToastProvider>
    <UserProvider>
      <ProjectProvider>
        <MapProvider>
          <MobileProvider>
            <MobileSurveyProvider>
              <MobileOnesnapProvider>
                <Mobile />
              </MobileOnesnapProvider>
            </MobileSurveyProvider>
          </MobileProvider>
        </MapProvider>
      </ProjectProvider>
    </UserProvider>
  </ToastProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  isMobile() ? <MobileApp /> : <DesktopApp />
);