// ─────────────────────────────────────────────────────────────
// Company keys — numeric IDs used to associate case studies
// and design cards with experience entries on About / Resume.
//
// Assign the same number on:
//   • caseStudies[].companyKey
//   • designs[].companyKey
//   • timeline / experience entries (companyKey)
//
// Leave companyKey undefined (or omit) on multi-company /
// industry-wide items until you assign a number manually.
// ─────────────────────────────────────────────────────────────

export const COMPANY_KEYS = {
  0: 'Independent Practice',
  1: 'Glynlyon',
  2: 'Siemens',
  3: 'OpenTech Alliance',
  4: 'Freeport-McMoRan',
  5: 'Plexus Worldwide',
}

export function companyName(key) {
  if (key === null || key === undefined) return null
  return COMPANY_KEYS[key] ?? null
}

export function filterByCompanyKey(items, key) {
  if (key === null || key === undefined) return []
  return items.filter((item) => item.companyKey === key)
}
