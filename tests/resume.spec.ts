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
