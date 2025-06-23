// src/data/projects.js
import { v4 as uuidv4 } from "uuid";

export const projects = Array.from({ length: 200 }).map((_, i) => ({
  id: uuidv4(),
  name: `Project ${i + 1}`,
  number: i + 1,
  stage: `Stage ${i + 1}`,
  clientOrganization: `Client Organization ${i + 1}`
}));

