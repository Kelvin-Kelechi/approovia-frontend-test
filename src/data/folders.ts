import { Folder } from "../types";

export const initialFolders: Folder[] = [
  {
    id: "folder-ecommerce",
    name: "E-Commerce",
    projects: [
      { id: "project-storefront", name: "Online Storefront UI" },
      { id: "project-cart", name: "Shopping Cart System" },
    ],
  },
  {
    id: "folder-healthtech",
    name: "HealthTech",
    projects: [
      { id: "project-patient-portal", name: "Patient Portal" },
      { id: "project-telemedicine", name: "Telemedicine Chat App" },
    ],
  },
  {
    id: "folder-fintech",
    name: "FinTech",
    projects: [
      { id: "project-wallet", name: "Digital Wallet" },
      { id: "project-invest", name: "Investment Tracker" },
    ],
  },
];
