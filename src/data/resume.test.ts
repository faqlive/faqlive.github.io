import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { experience } from "./experience";
import { education } from "./education";
import { certificates } from "./certificates";
import { profile } from "./profile";

describe("Curriculum content integrity", () => {
  it.each([
    ["experience", experience],
    ["education", education],
    ["certificates", certificates],
  ] as const)("%s has unique stable identifiers", (_, entries) => {
    expect(new Set(entries.map((entry) => entry.id)).size).toBe(entries.length);
    expect(entries.every((entry) => entry.id.trim().length > 0)).toBe(true);
  });
  it("references existing public images", () => {
    for (const image of [
      profile.photo,
      ...certificates.map((item) => item.image).filter(Boolean),
    ]) {
      expect(existsSync(`public${image}`), `Missing image: ${image}`).toBe(
        true,
      );
    }
  });
  it("provides valid contact and social links", () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(profile.phone).toMatch(/^\+\d+$/);
    for (const link of [
      profile.github,
      profile.linkedin,
      ...certificates.flatMap((item) =>
        item.credentialUrl ? [item.credentialUrl] : [],
      ),
    ]) {
      expect(new URL(link).protocol).toBe("https:");
    }
  });
});
