import { profile } from "../data/profile";
import { experience } from "../data/experience";
import { education } from "../data/education";
import { certificates } from "../data/certificates";
import { skills } from "../data/skills";
import type { TimelineEntry } from "../types/resume";

// Keep identifiers, company names, contact details, assets and technical product names shared.
export const englishExperience: Record<string, Partial<TimelineEntry>> = {
  capgemini: {
    period: "Jul 2025 — Present",
    title: "Backend Java Developer",
    location: "Remote · Full-time",
    description:
      "Backend development for a distributed application that automates industrial processes and coordinates AGVs and automated manufacturing cells.",
    highlights: [
      "Design and implementation of microservices with Spring Boot, Kafka, Redis and Flink; real-time data processing, transformation and enrichment to support the platform’s decision logic.",
      "Optimised backend connections and redesigned database queries, improving performance, load times and reliability.",
      "Contributed to test-environment deployments with Kubernetes and Azure DevOps, and to AI-assisted development demos to improve team productivity.",
    ],
    competencies: ["Teamwork", "Problem solving", "Process improvement"],
  },
  proeduca: {
    period: "Feb 2022 — Jul 2025",
    title: "Java Full Stack Developer",
    location: "Madrid, Spain · Hybrid · Full-time",
    description:
      "Design and development of LTI applications integrated with Moodle and Canvas for teachers, administrators and students.",
    highlights: [
      "Backend development with Spring and frontend development with Vue, alongside maintenance of legacy Wicket applications.",
      "Implemented Spring Security and JWT and moved applications to a stateless model to support independent sessions across multiple windows.",
      "Migrated Java 8 to Java 17 and Vue 2 to Vue 3; proposed and implemented Vite and Pinia to improve development workflows and state management.",
      "Developed TeamCity pipelines and an Ansible playbook for Moodle environment upgrades, reducing deployment times and improving operational efficiency.",
    ],
    competencies: ["Initiative", "Adaptability", "Process improvement"],
  },
  decide: {
    period: "Jul 2020 — Jan 2022",
    title: "Junior Java Developer",
    location: "Madrid, Spain · Full-time",
    highlights: [
      "Modelled and developed business rules with IBM Operational Decision Manager (ODM) for the financial and logistics sectors.",
      "Created test plans for operations that group business rules.",
    ],
    competencies: [
      "Analytical thinking",
      "Test planning",
      "Attention to detail",
    ],
    technologies: ["Java", "IBM ODM", "Data modelling", "SoapUI"],
  },
  gss: {
    period: "Nov 2014 — Jul 2019",
    title: "Helpdesk",
    location: "Madrid metropolitan area",
    highlights: [
      "Supported platforms with over 1,600 workstations and administered Active Directory and G Suite.",
      "Administered Avaya and Asterisk telephony: extensions, users, vectors, VDNs, recordings and skill groups.",
      "Managed CRM/CTI systems with Altitude, InConcert, Presence and Luxor Cairo, and pull printing with HP and Epson.",
      "Configured and repaired computer equipment.",
    ],
    competencies: [
      "User support",
      "Incident resolution",
      "Platform management",
    ],
  },
  mentalroots: {
    period: "Sep 2010 — Feb 2013",
    title: "Co-founder",
    location: "Rosario, Argentina",
    highlights: [
      "Managed purchasing, customer accounts, inventory and sales.",
      "Provided IT support, website maintenance and IT training.",
    ],
    competencies: [
      "Purchasing management",
      "Inventory management",
      "Customer management",
      "Sales",
      "User training",
    ],
  },
  metalsur: {
    period: "Jul 2010 — Jul 2011",
    title: "Manufacturing Engineering Office",
    location: "Villa Gobernador Gálvez, Santa Fe, Argentina",
    highlights: [
      "Performed time studies, designed fixtures and balanced the finishing section’s production line.",
    ],
    competencies: [
      "Process analysis",
      "Work organisation",
      "Process improvement",
    ],
  },
};
export const englishEducation: Record<string, Partial<TimelineEntry>> = {
  "unir-devops": {
    period: "Feb 2024 — Feb 2025",
    title:
      "University Master’s Degree in Development and Operations (MUDEVOPS)",
    description: "Grade: Notable (Very Good).",
  },
  cice: {
    title:
      "Master’s in Java and Database Administration – Official Oracle Programme",
  },
  "unr-gestion": {
    title: "University Technical Degree in Management and Production",
    description: "Recognised in Spain as a Diplomado qualification.",
  },
  "politecnico-bachiller": {
    title: "Secondary School Diploma in the Production of Goods and Services",
  },
};
export const enContent = {
  profile: {
    ...profile,
    headline: "Technology that serves people and processes.",
    summary:
      "I am a Backend / Full Stack Developer with over ten years of IT experience and strong skills in Java, Spring Boot and Vue. My strengths include analytical thinking, problem solving and adaptability. I bring initiative, a collaborative approach and a practical perspective that connects technology with people’s needs and business goals. I hold a University Master’s Degree in DevOps and am currently studying AI Engineering.",
  },
  experience: experience.map((entry) => ({
    ...entry,
    ...englishExperience[entry.id],
  })),
  education: education.map((entry) => ({
    ...entry,
    ...englishEducation[entry.id],
  })),
  certificates: certificates.map((entry) => ({
    ...entry,
    name: entry.id === "scrum" ? "Scrum Manager Course" : entry.name,
  })),
  skills: skills.map((group, index) => ({
    ...group,
    name: [
      "Backend",
      "Data and real-time processing",
      "Frontend and educational integration",
      "DevOps and tools",
    ][index]!,
    items: group.items.map((item) =>
      item === "Microservicios"
        ? "Microservices"
        : item === "APIs REST"
          ? "REST APIs"
          : item,
    ),
  })),
};
