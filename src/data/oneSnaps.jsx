// src/data/projects.js
import { v4 as uuidv4 } from "uuid";
import { dropdownProgress } from "./dropdown";

const generateRandomDate = () => Math.floor(Math.random() * 100).toString().padStart(2, '0') + (Math.floor(Math.random() * 9) + 1) + (Math.floor(Math.random() * 9) + 1) + Math.floor(Math.random() * 1000).toString().padStart(3, '0');

export const mockOneSnap = Array.from({ length: 200 }).map((_, i) => {
  const randomStage = dropdownProgress[Math.floor(Math.random() * dropdownProgress.length)];
  const random=generateRandomDate()
  return {
    id: random,
    name: `OneSnap Name-${i + 1}`,
    date: "28 Jun 2025",
  };
});