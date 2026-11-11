import { profile } from "../data/profile";
import { experience } from "../data/experience";
import { education } from "../data/education";
import { certificates } from "../data/certificates";
import { skills } from "../data/skills";
import { enContent } from "./en";
import { esUi, enUi } from "./ui";
export const locales = {
  es: {
    ui: esUi,
    content: { profile, experience, education, certificates, skills },
  },
  en: { ui: enUi, content: enContent },
};
export type Language = keyof typeof locales;
