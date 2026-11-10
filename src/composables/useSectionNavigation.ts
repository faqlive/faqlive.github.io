import { ref, onMounted, onUnmounted, nextTick } from "vue";

/** Keeps section selection in the URL, including browser back/forward navigation. */
export function useSectionNavigation(
  ids: readonly string[],
  fallback = "inicio",
) {
  const readHash = () => {
    const id = window.location.hash.slice(1);
    return ids.includes(id) ? id : fallback;
  };
  const activeSection = ref(readHash());
  const syncSection = async () => {
    activeSection.value = readHash();
    await nextTick();
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("contenido")?.focus({ preventScroll: true });
  };
  onMounted(() => window.addEventListener("hashchange", syncSection));
  onUnmounted(() => window.removeEventListener("hashchange", syncSection));
  return { activeSection };
}
