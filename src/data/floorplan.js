// src/data/floorplan.js

import { v4 as uuidv4 } from "uuid";

export const floorPlanItems = [
  {
    id: uuidv4(),
    name: "Floor Plan 1",
    lastUpdated: "7 days ago",
    thumbnail: "/images/sample-floor-plan.webp",
    isArchive: false,
  },
  {
    id: uuidv4(),
    name: "Floor Plan 2",
    lastUpdated: "7 days ago",
    thumbnail: "/images/sample-floor-plan.webp",
    isArchive: false,
  },
  {
    id: uuidv4(),
    name: "Floor Plan 3",
    lastUpdated: "7 days ago",
    thumbnail: "/images/sample-floor-plan.webp",
    isArchive: false,
  },
  {
    id: uuidv4(),
    name: "Floor Plan 4",
    lastUpdated: "7 days ago",
    thumbnail: "/images/sample-floor-plan.webp",
    isArchive: false,
  },
  {
    id: uuidv4(),
    name: "Floor Plan 5",
    lastUpdated: "7 days ago",
    thumbnail: "/images/sample-floor-plan.webp",
    isArchive: true,
  },
];

export const attachmentItems = [
  {
    id: uuidv4(),
    name: "File Example 1",
    size: "850 KB",
    createdAt: "2024-05-18",
    type: "image",
    url: "/images/sample-floor-plan.webp",
  },
  {
    id: uuidv4(),
    name: "File Example 2",
    size: "1.4 MB",
    createdAt: "2024-05-20",
    type: "image",
    url: "/images/sample-floor-plan-2.webp",
  },
  {
    id: uuidv4(),
    name: "File Example 3",
    size: "1.2 MB",
    createdAt: "2024-05-15",
    type: "pdf",
    url: "/files/FloorPlan-A.pdf",
  },
];

export const reportItems = [
  {
    id: uuidv4(),
    detail: "Lorem ipsum dolor sit amet consectetur sollicitudin ut.",
    type: "pdf",
    dateTime: "31 May 2025, 12:20 AM WIB",
    createdBy: "Affandy Letto",
    fileName: "Report 01",
    fileUrl: "/files/report-01.pdf",
  },
  {
    id: uuidv4(),
    detail: "Lorem ipsum dolor sit amet consectetur sollicitudin ut.",
    type: "pdf",
    dateTime: "31 May 2025, 12:20 AM WIB",
    createdBy: "Affandy Letto",
    fileName: "Report 02",
    fileUrl: "/files/report-02.pdf",
  },
];
