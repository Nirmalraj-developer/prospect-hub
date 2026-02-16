import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";

const INSIGHTS = [
  { 
    label: "ICP Hiring Signal", 
    features: [
      "Identify Hiring Intent",
      "Detect Growth Companies",
      "Track Expansion Signals",
      "Discover Active Recruiters"
    ]
  },
  { number: 326, label: "Role Expansion Signal", text: "Companies hiring Engineering Managers in UK Healthcare" },
  { number: 91, label: "AI Adoption Signal", text: "Hospitals expanding AI teams this week" },
  { number: 43, label: "Funding Signal", text: "Recently funded HealthTech startups hiring CTOs" },
  { number: 214, label: "CRM Migration Signal", text: "Organizations adopting Salesforce CRM" },
  { number: 118, label: "Leadership Change Signal", text: "Leadership changes in mid-size pharma firms" }
];

export function AIInsightWidget() {
  return null;
}
