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
  ).toBeVisible();
  await expect(page.locator(".entry")).toHaveCount(9);
  await expect(page.locator(".certificate-card")).toHaveCount(2);
  await expect(
    page.getByRole("link", { name: "facundojlopez@gmail.com", exact: true }),
  ).toHaveAttribute("href", "mailto:facundojlopez@gmail.com");
  await page.evaluate(() => {
    window.print = () => {
      document.body.dataset.printed = "true";
    };
  });
  await page.getByRole("button", { name: "Guardar PDF" }).click();
  await expect(page.locator("body")).toHaveAttribute("data-printed", "true");
  await page
    .getByRole("heading", { name: "Certificaciones", exact: true })
    .scrollIntoViewIfNeeded();
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
