export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  organization: string;
  location?: string;
  description?: string;
  highlights?: string[];
  technologies?: string[];
  note?: string;
}
export interface Certificate {
  id: string;
  name: string;
  issuer?: string;
  image?: string;
  credentialUrl?: string;
}
export interface SkillGroup {
  name: string;
  items: string[];
}
