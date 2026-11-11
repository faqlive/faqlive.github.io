import { describe, expect, it } from "vitest";
import { locales } from "./index";
import { englishExperience, englishEducation } from "./en";

describe("Bilingual curriculum content", () => {
  it("has matching, non-empty UI messages", () => {
    expect(Object.keys(locales.en.ui).sort()).toEqual(
      Object.keys(locales.es.ui).sort(),
    );
    expect(
      Object.values(locales.en.ui).every((value) => value.trim().length > 0),
    ).toBe(true);
  });
  it("requires an English translation for every experience and education record", () => {
    expect(Object.keys(englishExperience).sort()).toEqual(
      locales.es.content.experience.map((entry) => entry.id).sort(),
    );
    expect(Object.keys(englishEducation).sort()).toEqual(
      locales.es.content.education.map((entry) => entry.id).sort(),
    );
    for (const entry of locales.es.content.experience) {
      const translation = englishExperience[entry.id]!;
      expect(translation.highlights?.length).toBe(entry.highlights?.length);
      expect(translation.competencies?.length).toBe(entry.competencies?.length);
      if (entry.description) expect(translation.description).toBeTruthy();
      expect(translation.period).toBeTruthy();
      expect(translation.location).toBeTruthy();
    }
  });
  it("preserves contact links, identifiers, assets and record counts across languages", () => {
    const es = locales.es.content;
    const en = locales.en.content;
    for (const key of ["experience", "education", "certificates"] as const) {
      expect(en[key].map((item) => item.id)).toEqual(
        es[key].map((item) => item.id),
      );
    }
    for (const key of [
      "email",
      "phone",
      "github",
      "linkedin",
      "photo",
    ] as const)
      expect(en.profile[key]).toBe(es.profile[key]);
    expect(en.certificates.map((item) => item.image)).toEqual(
      es.certificates.map((item) => item.image),
    );
  });
});
