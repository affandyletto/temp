import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Bottomnav } from "@/components/Mobile/Bottomnav";
import { Topnav } from "@/components/Mobile/Topnav";
import { TopnavDetail } from "@/components/Mobile/TopnavDetail";
import { TopnavDetailSnap } from "@/components/Mobile/OneSnap/TopnavDetailSnap";
import { TopnavDetailAlbum } from "@/components/Mobile/OneSnap/TopnavDetailAlbum";

import { Projects } from "@/apps/Mobile/Projects";
import { OneSnap } from "@/apps/Mobile/OneSnap";
import { ProjectDetail } from "@/apps/Mobile/ProjectDetail";
import { BottomModal } from "@/components/Mobile/BottomModal"
import { Survey } from "@/apps/Mobile/Survey";
import { ElementDetails } from "@/apps/Mobile/ElementDetails";
import { useMobileSurvey } from "@/context/Mobile/MobileSurveyContext"
import { useMobileOnesnap } from "@/context/Mobile/MobileOnesnapContext"
import { useParams } from 'react-router-dom';
import { OneSnapDetail } from "@/apps/Mobile/OneSnapDetail";
import { AlbumDetails } from "@/apps/Mobile/AlbumDetails";
import { Login } from "@/apps/Mobile/Login";
import { ForgotPassword } from "@/apps/Mobile/ForgotPassword";
import { SetNewPassword } from "@/apps/Mobile/SetNewPassword";

import { ConfirmationModal } from "@/components/Mobile/ConfirmationModal"

function ProjectsLayout() {
  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        {/* Fixed Top Navigation */}
        <div className="flex-shrink-0">
          <Topnav />
        </div>
        
        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 pt-20 pb-6">
          <Projects />
        </main>
        
        {/* Fixed Bottom Navigation */}
        <div className="flex-shrink-0">
          <Bottomnav activeTab="projects" />
        </div>
      </div>
      <BottomModal isSurvey={false}/>
    </>
  );
}

function OneSnapLayout() {
  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        {/* Fixed Top Navigation */}
        <div className="flex-shrink-0">
          <Topnav />
        </div>
        
        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 pt-20 pb-6">
          <OneSnap />
        </main>
        
        {/* Fixed Bottom Navigation */}
        <div className="flex-shrink-0">
          <Bottomnav activeTab="oneSnap" />
        </div>
      </div>
      <BottomModal isSurvey={false}/>
    </>
  );
}

function OneSnapDetailLayout() {
  return (
    <>
      {/* Top Navigation for Detail */}
      <TopnavDetailSnap />
      
      {/* Main Content Area */}
      <main className="pt-20 min-h-screen overflow-y-auto">
        <OneSnapDetail />
      </main>
      <BottomModal isSurvey={false}/>
    </>
  );
}

function AlbumDetailLayout() {
  return (
    <>
      {/* Top Navigation for Detail */}
      <TopnavDetailAlbum />
      
      {/* Main Content Area */}
      <main className="pt-20 min-h-screen overflow-y-auto">
        <AlbumDetails />
      </main>
      <BottomModal isSurvey={false}/>
    </>
  );
}

function ProjectDetailLayout() {
  return (
    <>
      {/* Top Navigation for Detail */}
      <TopnavDetail />
      
      {/* Main Content Area */}
      <main className="pt-20 px-4 min-h-screen overflow-y-auto">
        <ProjectDetail />
      </main>
    </>
  );
}

function SurveyLayout() {
  const { surveyId } = useParams();
  const { selectedElement, setSelectedElement } = useMobileSurvey()
  
  return (
    <div>
      {/* Top Navigation for Detail */}
      <TopnavDetail isSurvey={true} surveyId={surveyId} />
      {selectedElement ?
        <ElementDetails surveyId={surveyId}/>
        :
        <Survey surveyId={surveyId}/>
      }
      <BottomModal isSurvey={true}/>
    </div>
  );
}

function Mobile() {
  return (
    <Router>
      <>
        <Routes>
          {/* Projects List Route */}
          <Route 
            path="/projects" 
            element={<ProjectsLayout />} 
          />
          
          {/* OneSnap Route */}
          <Route 
            path="/oneSnap" 
            element={<OneSnapLayout />} 
          />
          
          <Route 
            path="/projects/:projectId" 
            element={<ProjectDetailLayout />} 
          />
          
          <Route 
            path="/survey/:surveyId" 
            element={<SurveyLayout />} 
          />
          
          <Route 
            path="/oneSnap/:oneSnapId" 
            element={<OneSnapDetailLayout />} 
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

          <Route 
            path="/album/:albumId" 
            element={<AlbumDetailLayout />} 
          />
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/projects" replace />} />
        </Routes>
      </>
      <ConfirmationModal/>
    </Router>
  );
}

export default Mobile;