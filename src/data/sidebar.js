// src/data/sidebar.js

import {
  BookText,
  Box,
  Building2,
  Camera,
  CircleHelp,
  Layers,
  LayoutDashboard,
  RefreshCcw,
  Settings,
  SquareCheckBig,
  Ticket,
  User,
  UserPlus,
  UserRoundCog,
} from "lucide-react";

export const menuItems = [
  {
    id: 1,
    name: "Menu",
    menus: [
      {
        label: "Projects",
        icon: LayoutDashboard,
        to: "/projects",
      },
      {
        label: "Clients",
        icon: Building2,
        to: "/clients",
      },
      {
        label: "Tickets",
        icon: Ticket,
        to: "/tickets",
      },
      {
        label: "Quality Check",
        icon: SquareCheckBig,
        to: "/quality-check",
      },
      {
        label: "Users",
        icon: UserPlus,
        to: "/users",
      },
      {
        label: "Organization",
        icon: UserRoundCog,
        to: "/organization",
      },
      {
        label: "Elements",
        icon: Layers,
        to: "/elements",
      },
    ],
  },
  {
    id: 2,
    name: "Other Applications",
    menus: [
      {
        label: "JobCapture",
        icon: Camera,
        to: "/job-capture",
      },
      {
        label: "OneSnap",
        icon: Box,
        to: "/oneSnap",
      },
      {
        label: "OneProposal",
        icon: BookText,
        to: "/one-proposal",
      },
    ],
  },
];

export const menuDropdownUsers = [
  {
    label: "Profile",
    icon: User,
    to: "/profile",
  },
  {
    label: "Setting",
    icon: Settings,
    to: "/setting",
  },
  {
    label: "Help",
    icon: CircleHelp,
    to: "/help",
  },
  {
    label: "Clear Cache",
    icon: RefreshCcw,
    to: "/clear-cache",
  },
];

export const organizations = [
  {
    url: "organization-01",
    name: "Organization-01",
  },
  {
    url: "organization-02",
    name: "Organization-02",
  },
  {
    url: "organization-03",
    name: "Organization-03",
  },
  {
    url: "organization-04",
    name: "Organization-04",
  },
  {
    url: "organization-05",
    name: "Organization-05",
  },
];
