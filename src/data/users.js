// src/data/users.js

import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import { formatDateTime } from "@/utils/date";
import { optionsUserApps, optionsUserTypes } from "./dropdown";

export const mockUsers = Array.from({ length: 20 }).map(() => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();
  const username = faker.internet
    .userName({ firstName, lastName })
    .toLowerCase();
  const type =
    optionsUserTypes[Math.floor(Math.random() * optionsUserTypes.length)];
  const app =
    optionsUserApps[Math.floor(Math.random() * optionsUserApps.length)];
  const rawDate = faker.date.recent({ days: 60 });

  return {
    id: uuidv4(),
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    email,
    username,
    type: type.label,
    type_value: type.value,
    app: app.label,
    app_value: app.value,
    lastLogin: formatDateTime(rawDate),
  };
});

export const mockCheckboxOneSurvey = [
  {
    id: "onesurvey-1",
    label: "Organization Admin",
    info: "Role Organization Admin",
    value: false,
  },
  {
    id: "onesurvey-2",
    label: "Account Manager",
    info: "Role Account Manager",
    value: false,
  },
  {
    id: "onesurvey-3",
    label: "Collaborator",
    info: "Role Collaborator",
    value: false,
  },
  {
    id: "onesurvey-4",
    label: "Technician",
    info: "Role Technician",
    value: false,
  },
  { id: "onesurvey-5", label: "Viewer", info: "Role Viewer", value: false },
];

export const mockCheckboxOneSnap = [
  {
    id: "onesnap-3",
    label: "Collaborator",
    info: "Role Collaborator",
    value: false,
  },
  {
    id: "onesnap-4",
    label: "Technician",
    info: "Role Technician",
    value: false,
  },
  { id: "onesnap-5", label: "Viewer", info: "Role Viewer", value: false },
];
