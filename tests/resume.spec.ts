import { experience } from "../src/data/experience";
import { education } from "../src/data/education";
import { test, expect } from "@playwright/test";

test("desktop content, contacts, resources and print action", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Facundo J. López", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Experiencia profesional" }),
  ).toBeHidden();
  await expect(page.locator(".entry")).toHaveCount(
    experience.length + education.length,
  );
  await expect(page.locator(".certificate-card")).toHaveCount(2);
  await expect(page.locator(".contact-email")).toHaveAttribute(
    "href",
    "mailto:facundojlopez@gmail.com",
  );
  await page.evaluate(() => {
    window.print = () => {
      document.body.dataset.printed = "true";
    };
  });
  await page.getByRole("button", { name: "Guardar PDF" }).click();
  await expect(page.locator("body")).toHaveAttribute("data-printed", "true");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Certificados", exact: true })
    .click();
  await page.waitForFunction(() =>
    Array.from(document.images).every(
      (img) => img.complete && img.naturalWidth > 0,
    ),
  );
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".site-header")).toBeHidden();
  await expect(
    page.getByRole("heading", { name: "Experiencia profesional" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("mobile menu, anchors and no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Abrir menú" });
  await expect(page.getByRole("navigation")).toBeHidden();
  await menu.click();
  await expect(
    page.getByRole("button", { name: "Cerrar menú" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Formación" })
    .click();
  await expect(page).toHaveURL(/#educacion$/);
  await expect(page.getByRole("navigation")).toBeHidden();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("separate sections, history, deep links and reduced motion", async ({
  page,
}) => {
  await page.goto("/#experiencia");
  await expect(page.locator(".section-panel:visible")).toHaveCount(1);
  await expect(
    page.getByRole("heading", { name: "Experiencia profesional" }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Experiencia", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Formación" })
    .click();
  await expect(page.locator(".section-panel:visible")).toHaveCount(1);
  await expect(
    page.getByRole("heading", { name: "Formación académica" }),
  ).toBeVisible();
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Experiencia profesional" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Experiencia profesional" }),
  ).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Certificados", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Certificaciones", exact: true }),
  ).toBeVisible();
  expect(
    await page
      .locator(".section-panel:visible")
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe("0s");
  await page.goto("/#apartado-inexistente");
  await expect(
    page.getByRole("heading", { name: "Facundo J. López", exact: true }),
  ).toBeVisible();
});

test("experience details expand independently between heading and technology tags", async ({
  page,
}) => {
  await page.goto("/#experiencia");
  const cards = page.locator("#experiencia .entry-card");
  const first = cards.nth(0);
  const second = cards.nth(1);
  await expect(
    first.getByRole("heading", { name: "Backend Java Developer", exact: true }),
  ).toBeVisible();
  await expect(first.locator(".organization")).toHaveText(
    "Capgemini Engineering",
  );
  await expect(first.locator(".entry-description")).toBeHidden();
  await expect(first.locator(".tags")).toBeVisible();
  const toggle = first.getByRole("button", { name: /Ver detalles/ });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(
    first.getByRole("button", { name: /Ocultar detalles/ }),
  ).toHaveAttribute("aria-expanded", "true");
  await expect(first.locator(".entry-description")).toBeVisible();
  await expect(second.locator(".entry-description")).toBeHidden();
  await second.getByRole("button", { name: /Ver detalles/ }).click();
  await expect(first.locator(".entry-description")).toBeVisible();
  await expect(second.locator(".entry-description")).toBeVisible();
  expect(
    await first.locator(".entry-description").evaluate((el) => {
      const tags = el.parentElement?.querySelector(".tags");
      return Boolean(
        tags &&
        el.compareDocumentPosition(tags) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
    }),
  ).toBe(true);
  await first.getByRole("button", { name: /Ocultar detalles/ }).click();
  await expect(first.locator(".entry-description")).toBeHidden();
  await expect(first.locator(".tags")).toBeVisible();
  await page.emulateMedia({ media: "print" });
  await expect(first.locator(".entry-description")).toBeVisible();
  await expect(first.locator(".entry-toggle")).toBeHidden();
  await page.emulateMedia({ media: "screen" });
  await page.goto("/#educacion");
  await expect(
    page.locator("#educacion .entry-description").first(),
  ).toBeVisible();
  await expect(page.locator("#educacion .entry-toggle")).toHaveCount(0);
});

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 375, height: 812 },
]) {
  test(`content scrolls independently with a visible footer at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/#experiencia");
    const content = page.locator("#contenido");
    const footer = page.locator(".site-footer");
    await expect(
      footer.getByRole("link", { name: "Volver a presentación" }),
    ).toBeVisible();
    await expect(footer.locator(".pi-arrow-up")).toHaveCount(0);
    const before = await footer.boundingBox();
    await content.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });
    expect(await content.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
    expect(await footer.boundingBox()).toEqual(before);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    expect(before!.y + before!.height).toBeLessThanOrEqual(viewport.height);
    expect(
      await content.evaluate((el) => el.getBoundingClientRect().bottom),
    ).toBeLessThanOrEqual(before!.y);
    await footer.getByRole("link", { name: "Volver a presentación" }).click();
    await expect(page).toHaveURL(/#inicio$/);
    await expect.poll(() => content.evaluate((el) => el.scrollTop)).toBe(0);
    if (viewport.width < 681)
      await page.getByRole("button", { name: "Abrir menú" }).click();
    const link = page
      .getByRole("navigation")
      .getByRole("link", { name: "Formación" });
    await link.hover();
    expect(
      await link.evaluate((el) => getComputedStyle(el).textDecorationLine),
    ).toBe("none");
    await page.emulateMedia({ media: "print" });
    expect(await content.evaluate((el) => getComputedStyle(el).overflowY)).toBe(
      "visible",
    );
    await expect(footer).toBeHidden();
  });
}

test("English translations cover the CV and persist with the chosen theme", async ({
  page,
}) => {
  await page.goto("/#experiencia");
  const details = page.locator("#experiencia .entry-toggle").first();
  await details.click();
  await page.getByRole("combobox", { name: "Idioma" }).selectOption("en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.getByRole("heading", { name: "Professional experience" }),
  ).toBeVisible();
  await expect(
    page.locator("#experiencia .entry-description").first(),
  ).toContainText("distributed application");
  await expect(details).toHaveAttribute("aria-expanded", "true");
  await expect(details).toHaveAccessibleName(/Hide details/);
  await expect(page.locator("#experiencia .competency-tag").first()).toHaveText(
    "Teamwork",
  );
  await expect(page.locator(".entry-period").first()).toHaveText(
    "Jul 2025 — Present",
  );
  await page.getByRole("button", { name: "Dark mode", exact: true }).click();
  await expect(page.locator("html")).toHaveClass(/app-dark/);
  await expect(
    page.getByRole("button", { name: "Dark mode", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(page.getByRole("combobox", { name: "Language" })).toHaveValue(
    "en",
  );
  await expect(page.locator("html")).toHaveClass(/app-dark/);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Education", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "University Master’s Degree in Development and Operations (MUDEVOPS)",
    }),
  ).toBeVisible();
  await expect(page.locator("#educacion")).toContainText(
    "Grade: Notable (Very Good)",
  );
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Certifications", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Scrum Manager Course", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Technologies", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Data and real-time processing" }),
  ).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Let’s stay in touch." }),
  ).toBeVisible();
  await page.locator(".footer-return").click();
  await expect(page.getByRole("button", { name: "Save PDF" })).toBeVisible();
  await expect(page.locator(".hero-headline")).toHaveText(
    "Technology that serves people and processes.",
  );
  await page.emulateMedia({ media: "print" });
  expect(
    await page
      .locator("body")
      .evaluate((el) => getComputedStyle(el).backgroundColor),
  ).toBe("rgb(255, 255, 255)");
  await expect(
    page.locator("#experiencia .entry-description").first(),
  ).toBeVisible();
  await expect(page.locator(".site-header")).toBeHidden();
  await page.emulateMedia({ media: "screen" });
  await page.getByRole("combobox", { name: "Language" }).selectOption("es");
  await page.getByRole("button", { name: "Modo oscuro", exact: true }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator("html")).not.toHaveClass(/app-dark/);
});

test("preferences work on mobile without storage and honour the initial system theme", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error("Storage blocked");
    };
    Storage.prototype.setItem = () => {
      throw new Error("Storage blocked");
    };
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/#experiencia");
  await expect(page.locator("html")).toHaveClass(/app-dark/);
  await page.getByRole("combobox", { name: "Idioma" }).selectOption("en");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Education", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Education", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("navigation")).toBeHidden();
  await page.getByRole("button", { name: "Dark mode", exact: true }).click();
  await expect(page.locator("html")).not.toHaveClass(/app-dark/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const footer = await page.locator(".site-footer").boundingBox();
  expect(footer!.y + footer!.height).toBeLessThanOrEqual(812);
  expect(errors).toEqual([]);
});

test("Oracle certificate displays its issue date in both languages and opens the original PDF", async ({
  page,
}) => {
  await page.goto("/#certificados");
  const card = page.locator(".certificate-card").filter({
    has: page.getByRole("heading", {
      name: "Oracle Certified Associate, Java SE 8 Programmer",
      exact: true,
    }),
  });
  await expect(card.locator("time")).toHaveAttribute("datetime", "2020-02-27");
  await expect(card.locator("time")).toHaveText("27 de febrero de 2020");
  await expect(card).toContainText("273462111OCAJSE8");
  await expect(card.locator("img")).toBeVisible();
  const link = card.getByRole("link", { name: "Ver certificado (PDF)" });
  const href = await link.getAttribute("href");
  const response = await page.request.get(href!);
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await page.getByRole("combobox", { name: "Idioma" }).selectOption("en");
  await expect(card.locator("time")).toHaveText("February 27, 2020");
  await expect(
    card.getByRole("link", { name: "View certificate (PDF)" }),
  ).toHaveAttribute("href", href!);
});
