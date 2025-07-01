// src/data/sitedata.js

import { v4 as uuidv4 } from "uuid";

// Helper untuk angka 6 digit
const getRandom6Digit = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const statuses = ["Semi-Operational", "Operational"];
const labels = ["Camera-01", "Camera-02"];
const categories = ["Installed", "Pending Replacement"];
const locations = ["Front Lobby Area", "Admin Office"];
const heights = ["10ft", "12ft"];
const surfaces = ["Ceiling", "Waiting"];
const laborCosts = ["$5.00", "$10.00"];

export const mockSurveyInformation = Array.from({ length: 10 }).map((_, i) => ({
  id: uuidv4(),
  floorplan: `Floorplan- ${i + 1}`,
  eid: getRandom6Digit(),
  status: statuses[Math.floor(Math.random() * statuses.length)],
  label: labels[Math.floor(Math.random() * labels.length)],
  category: categories[Math.floor(Math.random() * categories.length)],
  descriptiveLocation: locations[Math.floor(Math.random() * locations.length)],
  elementHeight: heights[Math.floor(Math.random() * heights.length)],
  mountingSurface: surfaces[Math.floor(Math.random() * surfaces.length)],
  budgetLaborCost: laborCosts[Math.floor(Math.random() * laborCosts.length)],
}));

export const mockInstallationInformation = Array.from({ length: 10 }).map(
  (_, i) => ({
    id: uuidv4(),
    floorplan: `Floorplan- ${i + 1}`,
    eid: getRandom6Digit(),
    label: labels[Math.floor(Math.random() * labels.length)],
    installation: "Installation",
    assigned: "Assigned",
    installedOn: "Installed On",
    installedBy: "Installed By",
    technicianAssigned: "Technician Assigned",
    estimatedTime: "Estimated Installation Time",
    techTypeRequired: "Tech Type Required",
    specificInstallationNote: "Specific Installation Note",
  })
);

export const mockElementInformation = Array.from({ length: 10 }).map(
  (_, i) => ({
    id: uuidv4(),
    floorplan: `Floorplan- ${i + 1}`,
    eid: getRandom6Digit(),
    label: labels[Math.floor(Math.random() * labels.length)],
    classification: "(Not Specified)",
    partNumber: getRandom6Digit(),
    accessories: "Accessories",
    price: laborCosts[Math.floor(Math.random() * laborCosts.length)],
  })
);

const billTypes = ["Space & Infrastructure", "(Not Specified)"];
const billElements = ["MPOE", "Restroom"];
const billAccessories = [true, false];
const billQantity = [10, 20];

export const mockBillMaterials = Array.from({ length: 5 }).map((_, i) => ({
  id: uuidv4(),
  type: billTypes[Math.floor(Math.random() * billTypes.length)],
  element: billElements[Math.floor(Math.random() * billElements.length)],
  partNumber: getRandom6Digit(),
  accessories:
    billAccessories[Math.floor(Math.random() * billAccessories.length)],
  quantity: billQantity[Math.floor(Math.random() * billQantity.length)],
  data: [
    {
      id: uuidv4(),
      category: "Category 1",
      element: "Element 1",
      partNumber: "",
      accessories: "",
      quantity: 2,
    },
    {
      id: uuidv4(),
      category: "Category 1",
      element: "Element 2",
      partNumber: "",
      accessories: "",
      quantity: 3,
    },
    {
      id: uuidv4(),
      superCategory: "Super Category Name",
      category: "Category 1",
      element: "Custom Element 1",
      partNumber: "PART-001",
      accessories: "",
      quantity: 4,
      subdata: [
        {
          id: uuidv4(),
          accessories: "ACC-01",
          quantity: 5,
        },
        {
          id: uuidv4(),
          accessories: "ACC-02",
          quantity: 3,
        },
      ],
    },
  ],
}));
