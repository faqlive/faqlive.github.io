<script setup lang="ts">
import Button from "primevue/button";
import SiteHeader from "./components/SiteHeader.vue";
import ProfileHero from "./components/ProfileHero.vue";
import ResumeSection from "./components/ResumeSection.vue";
import EntryTimeline from "./components/EntryTimeline.vue";
import SkillGroups from "./components/SkillGroups.vue";
import CertificateGrid from "./components/CertificateGrid.vue";
import { profile } from "./data/profile";
import { experience } from "./data/experience";
import { education } from "./data/education";
import { skills } from "./data/skills";
import { certificates } from "./data/certificates";
const sections = [
  { id: "experiencia", label: "Experiencia" },
  { id: "habilidades", label: "Tecnologías" },
  { id: "educacion", label: "Formación" },
  { id: "certificados", label: "Certificados" },
  { id: "contacto", label: "Contacto" },
];
</script>
<template>
  <a class="skip-link" href="#contenido">Saltar al contenido</a
  ><SiteHeader :name="profile.name" :sections="sections" />
  <main id="contenido" class="page-container">
    <ProfileHero :profile="profile" />
    <ResumeSection
      id="experiencia"
      title="Experiencia profesional"
      eyebrow="01 / Trayectoria"
      ><EntryTimeline :entries="experience"
    /></ResumeSection>
    <ResumeSection
      id="habilidades"
      title="Herramientas para construir"
      eyebrow="02 / Tecnologías"
      description="Tecnologías utilizadas en la experiencia y los proyectos del currículum."
      ><SkillGroups :groups="skills"
    /></ResumeSection>
    <aside class="project-callout">
      <div>
        <p class="eyebrow">Del conocimiento a la práctica</p>
        <h2>El código también cuenta mi historia.</h2>
        <p>Explora mis repositorios y proyectos publicados.</p>
      </div>
      <Button
        as="a"
        :href="profile.github"
        label="Ver proyectos en GitHub"
        icon="pi pi-github"
        target="_blank"
        rel="noopener noreferrer"
      />
    </aside>
    <ResumeSection
      id="educacion"
      title="Formación académica"
      eyebrow="03 / Aprendizaje"
      ><EntryTimeline :entries="education"
    /></ResumeSection>
    <ResumeSection
      id="certificados"
      title="Certificaciones"
      eyebrow="04 / Conocimientos acreditados"
      ><CertificateGrid :certificates="certificates"
    /></ResumeSection>
    <ResumeSection
      id="contacto"
      title="Sigamos en contacto."
      eyebrow="05 / Hablemos"
      ><div class="contact-layout">
        <p>
          Para conversar sobre desarrollo, proyectos y oportunidades
          profesionales.
        </p>
        <div>
          <a class="contact-email" :href="`mailto:${profile.email}`">{{
            profile.email
          }}</a
          ><a class="contact-phone" :href="`tel:${profile.phone}`">{{
            profile.phoneLabel
          }}</a>
        </div>
      </div></ResumeSection
    >
  </main>
  <footer class="site-footer">
    <span>© {{ new Date().getFullYear() }} {{ profile.name }}</span
    ><a href="#inicio"
      >Volver arriba <i class="pi pi-arrow-up" aria-hidden="true"></i
    ></a>
  </footer>
</template>
