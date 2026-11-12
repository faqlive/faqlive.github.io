export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  organization: string;
  location?: string;
  description?: string;
  highlights?: string[];
  technologies?: string[];
  competencies?: string[];
  note?: string;
}
export interface Certificate {
  id: string;
  name: string;
  issuer?: string;
  image?: string;
  credentialUrl?: string;
  issuedOn?: string;
  credentialId?: string;
  documentUrl?: string;
}
export interface SkillGroup {
  name: string;
  items: string[];
}
