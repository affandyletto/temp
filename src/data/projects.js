// src/data/projects.js
import { v4 as uuidv4 } from "uuid";
import { dropdownProgress } from "./dropdown";

const generateRandomDate = () => Math.floor(Math.random() * 100).toString().padStart(2, '0') + (Math.floor(Math.random() * 9) + 1) + (Math.floor(Math.random() * 9) + 1) + Math.floor(Math.random() * 1000).toString().padStart(3, '0');

export const mockProjects = Array.from({ length: 200 }).map((_, i) => {
  const randomStage = dropdownProgress[Math.floor(Math.random() * dropdownProgress.length)];
  const random=generateRandomDate()
  return {
    id: random,
    name: `Project ${i + 1}`,
    number: random,
    stage: randomStage.name,
    stage_id: randomStage.id,
    clientOrganization: `Client Organization ${i + 1}`,
    isArchive: Math.random() < 0.5,
  };
});