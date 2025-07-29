// src/context/DropdownContext.jsx

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { dropdownProgress } from "@/data/dropdown";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
	const [surveys, setSurveys] = useState([])
	const [survey, setSurvey] = useState(null)
	const [projects, setProjects] = useState([])
	const [project, setProject] = useState(null)
  	const surveyRef = useRef(null);

	useEffect(() => {
	  surveyRef.current = survey;
	}, [survey]);

	const updateSurvey = useCallback((newSettings) => {
	  setSurvey(prev => ({
	    ...prev,
	    ...newSettings
	  }));
	}, []);

	const initialLoad=()=>{
	 	setSurvey({
	 		elementSize:30
	 	})
	}

	useEffect(()=>{
		initialLoad()
	},[])

  	const value = { surveys, setSurveys, survey, setSurvey,  project, setProject, updateSurvey, surveyRef };
  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => useContext(ProjectContext);
