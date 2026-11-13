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
      "I contribute to the development of a distributed application for industrial automation, coordinating automated guided vehicles (AGVs) and manufacturing cells.",
    highlights: [
      "Develop microservices with Spring Boot and real-time data processing with Kafka, Flink and Redis to support the platform’s decision logic.",
      "Optimise backend connections and redesign database queries to improve application performance, load times and reliability.",
      "Collaborate on test-environment deployments with Kubernetes and Azure DevOps.",
      "Contribute to AI-assisted development demos to explore improvements in team productivity.",
    ],
    competencies: ["Teamwork", "Problem solving", "Process improvement"],
  },
  proeduca: {
    period: "Feb 2022 — Jul 2025",
    title: "Java Full Stack Developer",
    location: "Madrid, Spain · Hybrid · Full-time",
    description:
      "Development and evolution of educational applications integrated with Moodle and Canvas through LTI, used by teachers, administrators and students.",
    highlights: [
      "Developed backend features with Spring and frontend features with Vue, and maintained legacy Wicket applications.",
      "Strengthened security with Spring Security and JWT and adapted applications to a stateless model to support independent sessions across multiple windows.",
      "Modernised the stack by migrating Java 8 to Java 17 and Vue 2 to Vue 3. Proposed and introduced Vite and Pinia to improve development workflows and state management.",
      "Developed TeamCity pipelines and an Ansible playbook for Moodle environment upgrades, reducing deployment times and improving operational efficiency.",
    ],
    competencies: ["Initiative", "Adaptability", "Process improvement"],
  },
  decide: {
    period: "Jul 2020 — Jan 2022",
    title: "Junior Java Developer",
    location: "Madrid, Spain · Full-time",
    description:
      "Development of business rule solutions with IBM Operational Decision Manager (ODM) for the financial and logistics sectors.",
    highlights: [
      "Modelled and developed business rules and the operations that group them within IBM ODM.",
      "Prepared test plans to validate the behaviour of operations and their business rules.",
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
    description:
      "Technical support and administration of platforms with over 1,600 workstations, combining user support with systems, telephony and application management.",
    highlights: [
      "Administered Active Directory and G Suite to support users’ working environments.",
      "Managed Avaya and Asterisk telephony, configuring extensions, users, vectors, VDNs, recordings and skill groups.",
      "Administered CRM/CTI platforms including Altitude, InConcert, Presence and Luxor Cairo, along with HP and Epson pull-printing systems.",
      "Configured and repaired computer equipment as part of incident resolution and day-to-day support.",
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
    description:
      "As a co-founder, combined the commercial management of the business with IT services and customer support.",
    highlights: [
      "Managed purchasing, inventory, customer accounts and sales, connecting commercial needs with day-to-day business operations.",
      "Provided technical support, website maintenance and IT training for users.",
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
    description:
      "Support for the analysis and improvement of manufacturing processes in the finishing section.",
    highlights: [
      "Performed time studies, designed fixtures and contributed to production-line balancing to improve work organisation.",
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
