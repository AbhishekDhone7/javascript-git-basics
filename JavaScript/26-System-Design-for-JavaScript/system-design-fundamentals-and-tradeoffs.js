/*
  Topic: System design for JavaScript basics
  Difficulty: Intermediate
  Primary Concept: Thinking about scale, caching, and trade-offs
*/

console.log("--- System design fundamentals ---");

function createInMemoryCache(ttlMs) {
  const store = new Map();

  return {
    set(key, value) {
      store.set(key, { value, expiresAt: Date.now() + ttlMs });
    },
    get(key) {
      const entry = store.get(key);
      if (!entry) {
        return null;
      }

      if (Date.now() > entry.expiresAt) {
        store.delete(key);
        return null;
      }

      return entry.value;
    },
  };
}

const cache = createInMemoryCache(1000);
cache.set("profile:1", { id: 1, name: "Cached User" });
console.log("Cached profile:", cache.get("profile:1"));

function buildPaginatedResponse(items, page, pageSize) {
  const start = (page - 1) * pageSize;
  return {
    page,
    pageSize,
    total: items.length,
    items: items.slice(start, start + pageSize),
  };
}

console.log("Paginated response:", buildPaginatedResponse([1, 2, 3, 4, 5], 2, 2));

console.log("--- Notes ---");
console.log("Design for failure, define clear boundaries, and choose cache or consistency trade-offs intentionally.");
