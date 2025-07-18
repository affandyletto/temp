// src/data/tabs.js

import SiteData from "@/apps/Projects/SiteData";
import SiteElements from "@/apps/Projects/SiteElements";
import Surveys from "@/apps/Projects/Surveys";
import Attachment from "@/apps/Projects/Attachment";
import Report from "@/apps/Projects/Report";
import Gallery from "@/apps/Projects/Gallery";
import Tickets from "@/apps/Projects/Tickets";
import Task from "@/apps/Projects/Task";
import Proposal from "@/apps/Projects/Proposal";
import SiteSetting from "@/apps/Projects/SiteSetting";
import BasicInfo from "@/apps/Clients/BasicInfo";
import Projects from "@/apps/Clients/Projects";
import OneSnaps from "@/apps/Clients/OneSnaps";


import {OneSnapGallery} from "@/apps/OneSnap/Gallery";
import {OneSnapGalleryAlbum} from "@/apps/OneSnap/Album";
import {OneSnapReports}  from "@/apps/OneSnap/Report";
import {OneSnapArchive}  from "@/apps/OneSnap/Archive";
import {Participant}  from "@/apps/OneSnap/Participant";
import {FloorplanBuilder}  from "@/apps/OneSnap/FloorplanBuilder";


export const tabsProjectDetail = [
  {
    label: "Surveys",
    value: "surveys",
    content: <Surveys />,
  },
  {
    label: "Site Elements",
    value: "site-elements",
    content: <SiteElements />,
  },
  {
    label: "Site Data",
    value: "site-data",
    content: <SiteData />,
  },
  {
    label: "Attachment",
    value: "attachment",
    content: <Attachment />,
  },
  {
    label: "Report",
    value: "report",
    content: <Report />,
  },
  {
    label: "Gallery",
    value: "gallery",
    content: <Gallery />,
  },
  {
    label: "Tickets",
    value: "tickets",
    content: <Tickets />,
  },
  {
    label: "Task",
    value: "task",
    content: <Task />,
  },
  {
    label: "Proposal",
    value: "proposal",
    content: <Proposal />,
  },
  {
    label: "Site Setting",
    value: "site-setting",
    content: <SiteSetting />,
  },
];

export const tabsClientDetail = [
  {
    label: "Basic Info",
    value: "basic-info",
    content: <BasicInfo />,
  },
  {
    label: "Projects",
    value: "projects",
    content: <Projects />,
  },
  {
    label: "One Snaps",
    value: "one-snaps",
    content: <OneSnaps />,
  },
];

export const tabsOneSnapDetail = [
  {
    label: "Gallery",
    value: "gallery",
    content: <OneSnapGallery />,
  },
  {
    label: "Albums",
    value: "albums",
    content: <OneSnapGalleryAlbum />,
  },
  {
    label: "Map",
    value: "map",
    content: <></>,
  },
  {
    label: "Reports",
    value: "reports",
    content: <OneSnapReports />,
  },
  {
    label: "Archive",
    value: "archive",
    content: <OneSnapArchive />,
  },
  {
    label: "Participant",
    value: "participant",
    content: <Participant />,
  },
  {
    label: "Floor Plan Builder",
    value: "floorplanBuilder",
    content: <FloorplanBuilder />,
  },
  ]