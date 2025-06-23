// src/data/clients.js

import { v4 as uuidv4 } from "uuid";

export const mockClients = Array.from({ length: 200 }).map((_, i) => ({
  id: uuidv4(),
  name: `Client ${i + 1}`,
  email: `client${i + 1}@mail.com`,
  number: `+62 812 0000 ${i + 1}`,
  projects: Math.floor(Math.random() * 10),
}));
