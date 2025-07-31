// src/context/DropdownContext.jsx
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { dropdownProgress } from "@/data/dropdown";
import { mockSurveys } from "@/data/surveys"
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
	const { id } = useParams();
	const [surveys, setSurveys] = useState(mockSurveys)
	const [selectedSurvey, setSelectedSurvey] = useState(null)
  	const [versionMode, setVersionMode] = useState(false)
	const [projects, setProjects] = useState([])
	const [project, setProject] = useState(null)
  	const surveyRef = useRef(null);

	useEffect(() => {
	  surveyRef.current = selectedSurvey;
	}, [selectedSurvey]);

	const updateSurvey = useCallback((newSettings) => {
	  if (!selectedSurvey || !selectedSurvey.id) return;
	  
	  setSurveys(prevSurveys => 
	    prevSurveys.map(s => 
	      s.id === selectedSurvey.id 
	        ? { ...s, ...newSettings }
	        : s
	    )
	  );
	}, [selectedSurvey]);

	const deleteVersion = useCallback((id) => {
		setSurveys(prevSurveys => prevSurveys.filter(s => s.id !== id));
		
		// If the deleted survey was selected, clear selection
		if (selectedSurvey && selectedSurvey.id === id) {
			setSelectedSurvey(null);
		}
	}, [selectedSurvey]);

	const renameVersion = useCallback((id, newVersionName) => {
		setSurveys(prevSurveys => {
			// Generate unique versionName
			let uniqueVersionName = newVersionName;
			let counter = 1;
			
			// Check for duplicates excluding the survey being renamed
			while (prevSurveys.some(s => s.id !== id && s.versionName === uniqueVersionName)) {
				uniqueVersionName = `${newVersionName} (${counter})`;
				counter++;
			}
			
			return prevSurveys.map(s => 
				s.id === id 
					? { ...s, versionName: uniqueVersionName }
					: s
			);
		});
	}, []);

	const loadSurvey = (id) => {
		const foundSurvey = surveys.find(s => s.id === id);
		console.info(surveys)
		if (foundSurvey) {
			setSelectedSurvey(foundSurvey);
		}
	}

	useEffect(() => {
		if(selectedSurvey && selectedSurvey.id) {
			const updatedSurvey = surveys.find(s => s.id === selectedSurvey.id);
			if (updatedSurvey) {
				setSelectedSurvey(updatedSurvey);
			}
		}
	}, [surveys])

	const handleHistoryClick = () => {
	    const url = new URL(window.location);
	    if (url.searchParams.has('version')) {
	    setVersionMode(false)
	      url.searchParams.delete('version');
	    } else {
	    	setVersionMode(true)
	      url.searchParams.set('version', selectedSurvey.versionName);
	    }
	    window.history.pushState({}, '', url);
	    
	    window.dispatchEvent(new Event('urlchange'));
	  };

  	const value = {
		versionMode, 
		setVersionMode, 
		surveys, 
		setSurveys, 
		selectedSurvey, 
		setSelectedSurvey, 
		project, 
		setProject, 
		updateSurvey, 
		loadSurvey, 
		surveyRef, 
		handleHistoryClick,
		deleteVersion,
		renameVersion
	};
  
  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => useContext(ProjectContext);