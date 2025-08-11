// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSidebar } from "./context/SidebarContext";
import Sidebar from "./components/Navigation/Sidebar";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Tickets from "./pages/Tickets";
import QualityCheck from "./pages/QualityCheck";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import Organization from "./pages/Organization";
import Users from "./pages/Users";
import Elements from "./pages/Elements";
import ProjectAlbumDetail from "./pages/ProjectAlbumDetail";
import ProjectAlbums from "./pages/ProjectAlbums";
import ProjectPhotos from "./pages/ProjectPhotos";
import OneSnapPage from "./pages/OneSnapPage"
import { OneSnapDetail } from "./pages/OneSnapDetail"
import { Survey } from "./pages/Survey"
import { Login } from "@/apps/Mobile/Login";
import { ForgotPassword } from "@/apps/Mobile/ForgotPassword";
import { SetNewPassword } from "@/apps/Mobile/SetNewPassword";
import { useUser } from "./context/UserContext";


function App() {
  const { isCollapsed } = useSidebar();
  const { loading, isLoggedIn } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/setNewPassword" element={<SetNewPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Survey route - completely isolated without any layout */}
        <Route 
          path="/survey/:id" 
          element={
            <div>
              <Survey />
            </div>
          } 
        />

        <Route 
            path="/login" 
            element={<Login />} 
          />

          <Route 
            path="/forgotPassword" 
            element={<ForgotPassword />} 
          />

          <Route 
            path="/setNewPassword" 
            element={<SetNewPassword />} 
          />
        
        {/* All other routes with sidebar layout */}
        <Route
          path="/*"
          element={
            <div className="flex">
              <Sidebar />
              <main
                className={`min-h-screen w-full transition-all duration-300 ${
                  isCollapsed ? "ml-24" : "ml-72"
                }`}
              >
                <Routes>
                  <Route
                    path="/"
                    element={<Navigate to="/projects" replace />}
                  />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route
                    path="/projects/:id/all-photos"
                    element={<ProjectPhotos />}
                  />
                  <Route
                    path="/projects/:id/all-albums"
                    element={<ProjectAlbums />}
                  />
                  <Route
                    path="/projects/:id/all-albums/:albumId"
                    element={<ProjectAlbumDetail />}
                  />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/clients/:id" element={<ClientDetail />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/quality-check" element={<QualityCheck />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/oneSnap" element={<OneSnapPage />} />
                  <Route path="/oneSnap/:id" element={<OneSnapDetail />} />
                  <Route path="/organization" element={<Organization />} />
                  <Route path="/elements" element={<Elements />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;