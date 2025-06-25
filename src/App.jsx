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
import { mockProjects } from "./data/projects";
import Organization from "./pages/Organization";
import Users from "./pages/Users";
import Elements from "./pages/Elements";

function App() {
  const { isCollapsed } = useSidebar();
  const defaultProjectId = mockProjects[0]?.id;

  return (
    <Router>
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
              element={
                <Navigate to={`/projects/${defaultProjectId}`} replace />
              }
            />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:id" element={<ClientDetail />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/quality-check" element={<QualityCheck />} />
            <Route path="/users" element={<Users />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/elements" element={<Elements />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
