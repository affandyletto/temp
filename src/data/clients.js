// src/data/clients.js

import { formatDate } from "@/utils/date";
import { v4 as uuidv4 } from "uuid";

export const mockClients = Array.from({ length: 200 }).map((_, i) => ({
  id: uuidv4(),
  name: `Client ${i + 1}`,
  email: `client${i + 1}@mail.com`,
  number: `+62 812 0000 ${i + 1}`,
  projects: Math.floor(Math.random() * 10),
}));

export const mockSnaps = Array.from({ length: 200 }).map((_, i) => ({
  id: uuidv4(),
  title: `Title-${i + 1}`,
  creator: `Creator-${i + 1}`,
  createdAt: formatDate(new Date(2025, 4, (i % 31) + 1)),
  image: "/images/color-grey.webp",
}));
