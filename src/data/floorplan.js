// src/data/floorplan.js

import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

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

const getRandom6Digit = () => Math.floor(100000 + Math.random() * 900000);
const formatDateTime = (date) => {
  const options = {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const dateStr = new Intl.DateTimeFormat("en-US", options).format(date);
  return `${dateStr} PDT`;
};

export const mockPhotos = Array.from({ length: 10 }).map((_, i) => {
  const date = faker.date.recent({ days: 30 });
  const imageUrls = [
    "/images/sample-photo-1.webp",
    "/images/sample-photo-2.webp",
  ];
  const image = imageUrls[Math.floor(Math.random() * imageUrls.length)];

  return {
    id: uuidv4(),
    name: `MV63X-${i + 1}`,
    elementId: getRandom6Digit(),
    cameraName: "CAMERA-1",
    datetime: formatDateTime(date),
    uploadedBy: "River Admin Stewart ",
    image,
  };
});

const formatDateTime2 = (date) => {
  const options = {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const dateStr = new Intl.DateTimeFormat("en-US", options).format(date);
  return dateStr;
};

export const mockAlbums = Array.from({ length: 2 }).map((_, i) => {
  const date = faker.date.recent({ days: 30 });
  const totalPhotosArr = [1, 2, 3, 4, 5];
  const totalPhotos =
    totalPhotosArr[Math.floor(Math.random() * totalPhotosArr.length)];

  const photos = mockPhotos
    .sort(() => 0.5 - Math.random())
    .slice(0, totalPhotos); // ambil acak sejumlah totalPhotos

  return {
    id: uuidv4(),
    name: `Album-0${i + 1}`,
    category: "Daily Report",
    totalPhotos,
    image: "/images/sample-photo-1.webp",
    createdBy: "River Admin Stewart",
    projectName: `Project Alpha ${i + 1}`,
    date: "2025-06-01",
    datetime: formatDateTime2(date),
    photos,
  };
});
