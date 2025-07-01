// src/data/dropdown.js

import { v4 as uuidv4 } from "uuid";

export const dropdownProgress = [
  {
    id: 1,
    name: "Lead In/Profile",
  },
  {
    id: 2,
    name: "Pre-Design",
  },
  {
    id: 3,
    name: "Take Off",
  },
  {
    id: 4,
    name: "Design",
  },
  {
    id: 5,
    name: "Deployment",
  },
  {
    id: 6,
    name: "Live Build",
  },
];

export const optionsAccountManager = [
  { label: "Account Manager 1", value: "account-manager-01" },
  { label: "Account Manager 2", value: "account-manager-02" },
  { label: "Account Manager 3", value: "account-manager-03" },
];

export const optionsCollaborator = [
  { label: "Collaborator 1", value: "collaborator-01" },
  { label: "Collaborator 2", value: "collaborator-02" },
  { label: "Collaborator 3", value: "collaborator-03" },
];

export const optionsTechnician = [
  { label: "Thechnician 1", value: "technician-01" },
  { label: "Thechnician 2", value: "technician-02" },
  { label: "Thechnician 3", value: "technician-03" },
];

export const optionsViewer = [
  { label: "Viewer 1", value: "viewer-01" },
  { label: "Viewer 2", value: "viewer-02" },
  { label: "Viewer 3", value: "viewer-03" },
];

export const optionsClientOrganization = [
  { label: "Client 1", value: "client-01" },
  { label: "Client 2", value: "client-02" },
  { label: "Client 3", value: "client-03" },
];

export const optionsIndustry = [
  { label: "Industry 1", value: "industry-01" },
  { label: "Industry 2", value: "industry-02" },
  { label: "Industry 3", value: "industry-03" },
];

export const optionsStage = [
  { label: "Lead in/Profile", value: "leadin-profile" },
  { label: "Pre-Design", value: "predesign" },
  { label: "Take off", value: "takeoff" },
  { label: "Design", value: "design" },
  { label: "Deployment", value: "deployment" },
  { label: "LiveBuilt", value: "livebuilt" },
];

export const optionsClients = [
  { label: "Client 1", value: "client-01" },
  { label: "Client 2", value: "client-02" },
  { label: "Client 3", value: "client-03" },
];

export const optionsUserTypes = [
  { label: "Client", value: "Client" },
  { label: "Consultant", value: "consultant" },
  { label: "Associate", value: "associate" },
  { label: "Employee", value: "employee" },
];

export const optionsUserApps = [
  { label: "OneSurvey", value: "onesurvey" },
  { label: "OneSnap", value: "onesnap" },
];

export const optionsElemetCategories = [
  { label: "Category 1", value: "category-1" },
  { label: "Category 2", value: "category-2" },
  { label: "Category 3", value: "category-3" },
];

export const optionsElemetSuperCategories = [
  { label: "Super Category 1", value: "super-category-1" },
  { label: "Super Category 2", value: "super-category-2" },
  { label: "Super Category 3", value: "super-category-3" },
];

export const optionsElemetClassifications = [
  { label: "Classification 1", value: "classification-1" },
  { label: "Classification 2", value: "classification-2" },
  { label: "Classification 3", value: "classification-3" },
];

export const optionsElemetInformation = [
  { label: "Short Text", value: "short-text" },
  { label: "Medium Text", value: "medium-text" },
  { label: "Long Text", value: "long-text" },
];

export const optionsFloorPlan = [
  { label: "Floor Plan 1", value: "floor-plan-1" },
  { label: "Floor Plan 2", value: "floor-plan-2" },
  { label: "Floor Plan 3", value: "floor-plan-3" },
];

export const optionsImageType = [
  { label: "Image 1", value: "image-type-1" },
  { label: "Image 2", value: "image-type-2" },
  { label: "Image 3", value: "image-type-3" },
];

export const optionsElement = [
  { label: "Element 1", value: "Element-1" },
  { label: "Element 2", value: "Element-2" },
  { label: "Element 3", value: "Element-3" },
];

export const optionsUser = [
  { label: "User 1", value: "User-1" },
  { label: "User 2", value: "User-2" },
  { label: "User 3", value: "User-3" },
];

export const optionsInformation = [
  { label: "MPOE", value: "MPOE" },
  { label: "Restroom", value: "Restroom" },
];

export const optionsStatus = [
  { label: "Operational", value: "Operational" },
  { label: "Semi-operational", value: "Semi-operational" },
];

export const optionsCategory = [
  { label: "Installed", value: "Installed" },
  { label: "Pending Replacement", value: "Pending-Replacement" },
];

export const optionsType = [
  { label: "Type-01", value: "type-01" },
  { label: "Type-02", value: "type-02" },
  { label: "Type-03", value: "type-03" },
];

export const optionClassification = [
  { label: "(Not Specified)", value: "(Not Specified)" },
];

export const optionsPartNumber = [
  { label: "Part 1 - $300", value: "$300" },
  { label: "Part 2 - $400", value: "$400" },
  { label: "Part 3 - $500", value: "$500" },
];

export const optionsAccessories = [
  { id: uuidv4(), label: "Accessory 1 - $100", value: false },
  { id: uuidv4(), label: "Accessory 2 - $200", value: false },
  { id: uuidv4(), label: "Accessory 3 - $300", value: false },
  { id: uuidv4(), label: "Accessory 4 - $400", value: false },
];

export const optionsFilterClassification = [
  { id: uuidv4(), label: "All", value: true },
  { id: uuidv4(), label: "(Not Specified)", value: true },
];

export const optionsFilterFloorplan = [
  { id: uuidv4(), label: "All", value: true },
  { id: uuidv4(), label: "First Survey", value: false },
];

export const optionsBillType = [
  { label: "Space & Infrastructure", value: "Space & Infrastructure" },
  { label: "(Not Specified)", value: "(Not Specified)" },
];
