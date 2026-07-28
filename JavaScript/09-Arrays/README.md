# 09-Arrays

## Introduction
This section is part of the complete JavaScript syllabus and focuses on **Arrays**.

## Why This Topic Matters
Most product data is list-based, so array methods are central to everyday development.

## Concepts Covered
- Array declaration with literals and `new Array()`
- Reading and updating elements by index
- Nested and mixed-value arrays
- Sparse arrays and missing-index behavior
- Core mutating methods: `pop`, `push`, `shift`, `unshift`
- Mutating vs non-mutating methods
- Array-to-string conversion with `toString` and `join`
- Array merging with `concat` and spread syntax
- `splice` (mutates) vs `slice` (returns new array)
- `delete` operator holes in arrays
- map/filter/reduce/reduceRight
- find/some/every
- indexOf/lastIndexOf
- Array iterators: `keys` and `entries`
- `Array.from` with iterables and array-like objects
- sort with numeric comparators and `localeCompare`
- `fill` for range replacement and `flat` for nested arrays
- `Array.of` for explicit array construction
- flatMap

## Learning Objectives
By the end of this section, you should be able to:
- Choose correct array methods
- Use immutable transformations
- Build readable data pipelines

## Recommended Learning Order
1. Start with `array-declaration-access-and-structure.js`.
2. Practice indexing, nested access, and sparse array output.
3. Continue with `array-mutating-methods-pop-push-shift-unshift.js`.
4. Observe how each method mutates array state and what value it returns.
5. Continue with `array-conversion-concat-splice-slice-and-spread.js`.
6. Compare mutating (`splice`) vs non-mutating (`slice`) behavior with the same input.
7. Continue with `array-callback-methods-and-iterators.js`.
8. Compare outputs of `forEach`, `map`, `filter`, and `reduce`.
9. Continue with `array-advanced-methods-sort-fill-flat-and-of.js`.
10. Compare default `sort()` vs comparator-based numeric sorts.
11. Write one variation that uses different input arrays.
12. Add your own notes for confusing edge cases.

## Prerequisites
08-Numbers-and-Math

## Folder Contents
- README.md (this guide)
- `array-declaration-access-and-structure.js` - Declaration styles, element access, nested arrays, sparse arrays
- `array-mutating-methods-pop-push-shift-unshift.js` - Core mutating methods with before/after state outputs
- `array-conversion-concat-splice-slice-and-spread.js` - Conversion, merge, and extraction methods with mutating vs non-mutating comparison
- `array-callback-methods-and-iterators.js` - Callback methods (`forEach`, `map`, `filter`, `reduce`) and iterator patterns (`keys`, `entries`, `Array.from`)
- `array-advanced-methods-sort-fill-flat-and-of.js` - Sorting strategies, object string sorting, `fill`, `flat`, and `Array.of`

## Real-World Applications
Catalogs, notifications, and dashboards all process arrays at scale.

## Next Topic
- [10-Objects](../10-Objects/README.md)

## Related Topics
- [10-Objects](../10-Objects/README.md)
- [28-Coding-Exercises](../28-Coding-Exercises/README.md)
- [03-Variables-Scope-and-Data-Types](../03-Variables-Scope-and-Data-Types/README.md)

