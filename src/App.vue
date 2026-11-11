<script setup lang="ts">
import SectionPanel from "./components/SectionPanel.vue";
import { useSectionNavigation } from "./composables/useSectionNavigation";
import Button from "primevue/button";
import SiteHeader from "./components/SiteHeader.vue";
import ProfileHero from "./components/ProfileHero.vue";
import ResumeSection from "./components/ResumeSection.vue";
import EntryTimeline from "./components/EntryTimeline.vue";
import SkillGroups from "./components/SkillGroups.vue";
import CertificateGrid from "./components/CertificateGrid.vue";
import { computed, watchEffect } from "vue";
import { useLocale } from "./composables/useLocale";
const { ui, content } = useLocale();
const profile = computed(() => content.value.profile);
const experience = computed(() => content.value.experience);
const education = computed(() => content.value.education);
const skills = computed(() => content.value.skills);
const certificates = computed(() => content.value.certificates);
const sections = computed(() => [
  { id: "inicio", label: ui.value.navIntro },
  { id: "experiencia", label: ui.value.navExperience },
  { id: "habilidades", label: ui.value.navSkills },
  { id: "educacion", label: ui.value.navEducation },
  { id: "certificados", label: ui.value.navCertificates },
  { id: "contacto", label: ui.value.navContact },
]);
watchEffect(() => {
  document.title = `${profile.value.name} · ${profile.value.role}`;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", ui.value.metaDescription);
});
const { activeSection } = useSectionNavigation(
  sections.value.map((section) => section.id),
);
</script>
<template>
  <a class="skip-link" href="#contenido">{{ ui.skip }}</a
  ><SiteHeader
    :name="profile.name"
    :sections="sections"
    :active-section="activeSection"
  />
  <main id="contenido" class="page-container" tabindex="-1">
    <SectionPanel :active="activeSection === 'inicio'"
      ><ProfileHero :profile="profile"
    /></SectionPanel>
    <SectionPanel :active="activeSection === 'experiencia'">
      <ResumeSection
        id="experiencia"
        :title="ui.experienceTitle"
        :eyebrow="ui.experienceEyebrow"
        ><EntryTimeline :entries="experience" collapsible
      /></ResumeSection>
    </SectionPanel>
    <SectionPanel :active="activeSection === 'habilidades'">
      <ResumeSection
        id="habilidades"
        :title="ui.skillsTitle"
        :eyebrow="ui.skillsEyebrow"
        :description="ui.skillsDescription"
        ><SkillGroups :groups="skills"
      /></ResumeSection>
      <aside class="project-callout">
        <div>
          <p class="eyebrow">{{ ui.projectEyebrow }}</p>
          <h2>{{ ui.projectTitle }}</h2>
          <p>{{ ui.projectDescription }}</p>
        </div>
        <Button
          as="a"
          :href="profile.github"
          :label="ui.projectLink"
          icon="pi pi-github"
          target="_blank"
          rel="noopener noreferrer"
        />
      </aside>
    </SectionPanel>
    <SectionPanel :active="activeSection === 'educacion'">
      <ResumeSection
        id="educacion"
        :title="ui.educationTitle"
        :eyebrow="ui.educationEyebrow"
        ><EntryTimeline :entries="education"
      /></ResumeSection>
    </SectionPanel>
    <SectionPanel :active="activeSection === 'certificados'">
      <ResumeSection
        id="certificados"
        :title="ui.certificatesTitle"
        :eyebrow="ui.certificatesEyebrow"
        ><CertificateGrid :certificates="certificates"
      /></ResumeSection>
    </SectionPanel>
    <SectionPanel :active="activeSection === 'contacto'">
      <ResumeSection
        id="contacto"
        :title="ui.contactTitle"
        :eyebrow="ui.contactEyebrow"
        ><div class="contact-layout">
          <p>
            {{ ui.contactDescription }}
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
    </SectionPanel>
  </main>
  <footer class="site-footer">
    <span>© {{ new Date().getFullYear() }} {{ profile.name }}</span>
    <div class="footer-social" role="group" :aria-label="ui.social">
      <a
        :href="profile.github"
        aria-label="GitHub"
        title="GitHub"
        target="_blank"
        rel="noopener noreferrer"
        ><i class="pi pi-github" aria-hidden="true"></i
      ></a>
      <a
        :href="profile.linkedin"
        aria-label="LinkedIn"
        title="LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
        ><i class="pi pi-linkedin" aria-hidden="true"></i
      ></a>
    </div>
    <a class="footer-return" href="#inicio">{{ ui.returnIntro }}</a>
  </footer>
</template>
