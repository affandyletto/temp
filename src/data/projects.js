// src/data/projects.js

import { v4 as uuidv4 } from "uuid";
import { dropdownProgress } from "./dropdown";

export const mockProjects = Array.from({ length: 200 }).map((_, i) => {
  const randomStage =
    dropdownProgress[Math.floor(Math.random() * dropdownProgress.length)];

  return {
    id: uuidv4(),
    name: `Project ${i + 1}`,
    number: String(i + 1).padStart(2, "0"),
    stage: randomStage.name,
    stage_id: randomStage.id,
    clientOrganization: `Client Organization ${i + 1}`,
    isArchive: Math.random() < 0.5, // true or false secara acak
  };
});
