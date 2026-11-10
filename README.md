# Currículum · Facundo J. López

Vue 3 + TypeScript + PrimeVue 4 + Vite. Sitio estático, sin backend.

## Desarrollo

Node.js 22.12+ o 24 LTS.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

`build` comprueba los tipos y genera `dist/`. El botón **Guardar PDF** abre el diálogo de impresión del navegador: selecciona «Guardar como PDF». La hoja de impresión elimina navegación y botones.

## Editar el currículum

Todo el contenido está en `src/data/`:

| Archivo           | Contenido                                            |
| ----------------- | ---------------------------------------------------- |
| `profile.ts`      | Nombre, presentación, fotografía, contacto y redes   |
| `experience.ts`   | Experiencia profesional, en el orden de presentación |
| `education.ts`    | Formación académica                                  |
| `certificates.ts` | Certificados y enlaces opcionales a credenciales     |
| `skills.ts`       | Grupos de tecnologías                                |

Para añadir experiencia o formación, agrega un objeto al array correspondiente. No hay que modificar componentes:

```ts
{
  id: 'empresa-puesto-2026', // único y estable dentro de la lista
  period: '2026 — Actualidad',
  title: 'Desarrollador Java',
  organization: 'Nombre de empresa',
  highlights: ['Describe tu aportación y su resultado.'],
  technologies: ['Java', 'Spring Boot'], // opcional
}
```

Para añadir un certificado:

```ts
{
  id: 'certificado-2026',
  name: 'Nombre de la certificación',
  issuer: 'Entidad emisora', // opcional
  image: '/img/mi-certificado.png', // opcional; archivo en public/img/
  credentialUrl: 'https://ejemplo.com/credencial', // opcional
}
```

`description`, `highlights`, `technologies` y `note` son opcionales en las entradas de experiencia y formación. Un certificado sin imagen muestra un icono. Mantén los registros en el orden deseado; las fechas son texto libre para admitir periodos incompletos sin lógica de ordenación ambigua. Ejecuta `npm test` y `npm run build` después de editar.

## Arquitectura: SOLID y KISS

- **Responsabilidad única:** los archivos de datos contienen contenido, los tipos definen contratos y cada componente resuelve una parte de la presentación.
- **Abierto a extensión:** añadir registros no requiere cambiar las vistas. `EntryTimeline` sirve tanto para experiencia como para educación; `ResumeSection` compone contenido mediante un slot.
- **Contratos pequeños:** `TimelineEntry`, `Certificate` y `SkillGroup` declaran solo lo que consume cada vista. Las props son de solo lectura.
- **Dependencias explícitas:** `App.vue` conecta datos y componentes. Los componentes de listas reciben contenido mediante props y no importan datos concretos.
- **Simplicidad:** Composition API, sin clases de servicio, almacenes globales, router ni capas de abstracción innecesarias. La sustitución se mantiene respetando los contratos de props; no se introduce herencia artificial.

`src/styles.css` contiene diseño adaptable, foco de teclado, reducción de movimiento e impresión. Los componentes PrimeVue (`Button`, `Card`, `Tag`) se importan individualmente. No hay dependencias de Bootstrap ni jQuery.

## Verificación

`npm test` valida identificadores, recursos y contactos. `npm run build` comprueba TypeScript y la compilación de producción. El workflow de validación ejecuta ambos y conserva `dist` como artefacto. El workflow `deploy.yml` vuelve a validar antes de publicar en GitHub Pages.

Prueba de navegador adicional:

```sh
npx playwright install chromium
npm run dev
# En otra terminal:
npx playwright test
```

## GitHub Pages

La configuración `base: '/'` corresponde al dominio raíz `faqlive.github.io`. Para un sitio bajo un subdirectorio cambia `base` y las rutas de recursos. GitHub Pages debe usar **GitHub Actions** como fuente de publicación. Cada push a `master` compila y publica `dist/` mediante `.github/workflows/deploy.yml`. También puede ejecutarse manualmente desde Actions. Las ramas de trabajo no despliegan. No sirvas directamente el código fuente de Vue.

## Contenido pendiente de actualizar

La fuente original es de 2021. La entrada de DECIDE conserva el cargo original y avisa de que la vigencia del puesto debe confirmarse. No se han añadido empleos, versiones recientes, resultados ni credenciales no facilitadas. Comprueba la denominación y los datos de cada certificado. Los teléfonos de referencias personales se han retirado de la web pública. El PDF histórico sigue disponible en `public/CV-FJL-092021.pdf`, pero el botón de impresión genera una versión del contenido actual.

## Navegación por apartados y estilo

En pantalla se muestra un único apartado. `useSectionNavigation` sincroniza la selección con el fragmento de la URL y los botones atrás/adelante. `SectionPanel` aplica una entrada de 220 ms con desvanecimiento y desplazamiento suave, desactivada si se solicita reducir movimiento. Al imprimir se muestran todos los apartados.

La paleta recupera los tonos del CV original: azul petróleo `#2A5463`, azul medio `#4A95B0` y celeste `#CEF0FC`. El preset de PrimeVue se configura en `src/main.ts` y los estilos de presentación en `src/styles.css`.
