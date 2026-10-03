const STORAGE_KEY = "human3-assessment-session-v1";

export function createLocalStore(storageLike = globalThis.localStorage) {
  const hasStorage =
    storageLike &&
    typeof storageLike.setItem === "function" &&
    typeof storageLike.getItem === "function" &&
    typeof storageLike.removeItem === "function";

  return {
    save(session) {
      if (!hasStorage) {
        return false;
      }
      storageLike.setItem(STORAGE_KEY, JSON.stringify(session));
      return true;
    },
    load() {
      if (!hasStorage) {
        return null;
      }
      try {
        const raw = storageLike.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    },
    clear() {
      if (hasStorage) {
        storageLike.removeItem(STORAGE_KEY);
      }
    }
  };
}

export const localStore = createLocalStore();

