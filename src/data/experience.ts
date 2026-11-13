import type { TimelineEntry } from "../types/resume";
export const experience: TimelineEntry[] = [
  {
    id: "capgemini",
    competencies: [
      "Trabajo en equipo",
      "Resolución de problemas",
      "Mejora de procesos",
    ],
    period: "Jul. 2025 — Actualidad",
    title: "Backend Java Developer",
    organization: "Capgemini Engineering",
    location: "En remoto · Jornada completa",
    description:
      "Participo en el desarrollo de una aplicación distribuida para automatización industrial, orientada a coordinar vehículos de guiado automático (AGVs) y células de manufactura.",
    highlights: [
      "Desarrollo microservicios con Spring Boot y procesamiento de datos en tiempo real con Kafka, Flink y Redis para alimentar la lógica de decisión de la plataforma.",
      "Optimizo conexiones backend y rediseño consultas a base de datos para mejorar el rendimiento, los tiempos de carga y la fiabilidad de la aplicación.",
      "Colaboro en el despliegue de entornos de prueba con Kubernetes y Azure DevOps.",
      "Participo en demos de desarrollo asistido por IA para explorar mejoras en la productividad del equipo.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Kafka",
      "Flink",
      "Redis",
      "Kubernetes",
      "Azure DevOps",
    ],
  },
  {
    id: "proeduca",
    competencies: ["Iniciativa", "Adaptación al cambio", "Mejora de procesos"],
    period: "Feb. 2022 — Jul. 2025",
    title: "Java Full Stack Developer",
    organization: "PROEDUCA",
    location: "Madrid, España · Híbrido · Jornada completa",
    description:
      "Desarrollo y evolución de aplicaciones educativas integradas mediante LTI con Moodle y Canvas, utilizadas por profesores, gestores y estudiantes.",
    highlights: [
      "Desarrollé funcionalidades backend con Spring y frontend con Vue, y mantuve aplicaciones legacy en Wicket.",
      "Reforcé la seguridad con Spring Security y JWT y adapté las aplicaciones a un modelo stateless para permitir sesiones independientes en varias ventanas.",
      "Modernicé el stack mediante migraciones de Java 8 a Java 17 y de Vue 2 a Vue 3. Propuse e incorporé Vite y Pinia para mejorar el desarrollo y la gestión de estado.",
      "Desarrollé pipelines en TeamCity y un playbook de Ansible para actualizar entornos Moodle, reduciendo tiempos de despliegue y mejorando la eficiencia operativa.",
    ],
    technologies: [
      "Java 17",
      "Spring",
      "Spring Security",
      "JWT",
      "Vue 3",
      "Vite",
      "Pinia",
      "Wicket",
      "TeamCity",
      "Ansible",
      "AWS Elastic Beanstalk",
      "Moodle",
      "Canvas",
    ],
  },
  {
    id: "decide",
    competencies: [
      "Pensamiento analítico",
      "Planificación de pruebas",
      "Atención al detalle",
    ],
    period: "Jul. 2020 — Ene. 2022",
    title: "Junior Java Developer",
    organization: "decide4AI",
    location: "Madrid, España · Jornada completa",
    description:
      "Desarrollo de soluciones basadas en reglas de negocio con IBM Operational Decision Manager (ODM) para los sectores financiero y logístico.",
    highlights: [
      "Modelé y desarrollé las reglas y las operaciones que las agrupan dentro del entorno IBM ODM.",
      "Preparé planes de pruebas para validar el comportamiento de las operaciones y sus reglas de negocio.",
    ],
    technologies: ["Java", "IBM ODM", "Modelado de datos", "SoapUI"],
  },
  {
    id: "gss",
    competencies: [
      "Atención al usuario",
      "Resolución de incidencias",
      "Gestión de plataformas",
    ],
    period: "Nov. 2014 — Jul. 2019",
    title: "Helpdesk",
    organization: "GSS (Global Sales Solutions)",
    location: "Madrid y alrededores",
    description:
      "Soporte técnico y administración de plataformas con más de 1.600 puestos, combinando atención a usuarios y gestión de sistemas, telefonía y aplicaciones.",
    highlights: [
      "Administré Active Directory y G Suite para dar soporte al entorno de trabajo de los usuarios.",
      "Gestioné telefonía Avaya y Asterisk, configurando extensiones, usuarios, vectores, VDN, locuciones y grupos de habilidades.",
      "Administré plataformas CRM/CTI como Altitude, InConcert, Presence y Luxor Cairo, además de sistemas de impresión Pull Printing de HP y Epson.",
      "Preparé y reparé equipos informáticos como parte de la resolución de incidencias y el soporte diario.",
    ],
  },
  {
    id: "mentalroots",
    competencies: [
      "Gestión de compras",
      "Gestión de stock",
      "Gestión de clientes",
      "Ventas",
      "Formación a usuarios",
    ],
    period: "Sept. 2010 — Feb. 2013",
    title: "Socio fundador",
    organization: "MentalRoots",
    location: "Rosario, Argentina",
    description:
      "Como socio fundador, combiné la gestión comercial del negocio con la prestación de servicios informáticos y la atención a clientes.",
    highlights: [
      "Gestioné compras, stock, cuentas de clientes y ventas, conectando las necesidades comerciales con la operativa del negocio.",
      "Realicé tareas de soporte técnico, mantenimiento web y formación informática a usuarios.",
    ],
  },
  {
    id: "metalsur",
    competencies: [
      "Análisis de procesos",
      "Organización del trabajo",
      "Mejora de procesos",
    ],
    period: "Jul. 2010 — Jul. 2011",
    title: "Oficina de Ingeniería de Manufactura",
    organization: "Metal Sur",
    location: "Villa Gobernador Gálvez, Santa Fe, Argentina",
    description:
      "Apoyo al análisis y la mejora de los procesos de manufactura en la sección de terminación.",
    highlights: [
      "Realicé estudios de tiempos, diseñé dispositivos y participé en el balance de línea para mejorar la organización del trabajo.",
    ],
  },
];
