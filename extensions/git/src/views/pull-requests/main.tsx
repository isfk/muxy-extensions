import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PullRequestsPanel } from "./pull-requests-panel";
import "@/styles/global.css";

const root = document.getElementById("root");
if (root) createRoot(root).render(<StrictMode><PullRequestsPanel /></StrictMode>);
