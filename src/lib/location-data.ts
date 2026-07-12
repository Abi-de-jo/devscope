// ─── Location Lookup Data ─────────────────────────────────────────────
//
// Small static lookup for GitHub location queries.  GitHub's user location
// field is freeform text — we maintain known spelling variants and a
// city→state mapping so we can OR-combine queries for state-level scope.

/* ─── All known locations (flat list for suggestions) ──────────────── */

const ALL_CITIES = [
  "Chennai", "Madras", "Mumbai", "Bombay", "Bangalore", "Bengaluru",
  "Hyderabad", "Secunderabad", "Pune", "Poona", "Delhi", "New Delhi",
  "Kolkata", "Calcutta", "Ahmedabad", "Ahmadabad", "Jaipur", "Lucknow",
  "Chandigarh", "Bhopal", "Patna", "Indore", "Nagpur", "Coimbatore",
  "Kovai", "Kochi", "Cochin", "Trivandrum", "Thiruvananthapuram",
  "Mysore", "Mysuru", "Manipal", "Madurai", "Tiruchirappalli", "Trichy",
  "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Thanjavur",
  "Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Warangal",
  "Karimnagar", "Nizamabad", "Howrah", "Durgapur", "Siliguri", "Asansol",
  "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Jodhpur", "Udaipur",
  "Kota", "Ajmer", "Noida", "Ghaziabad", "Agra", "Varanasi",
  "Kozhikode", "Calicut", "Jabalpur", "Gwalior", "Gaya", "Muzaffarpur",
  "Ludhiana", "Amritsar", "Jalandhar", "Panaji", "Margao",
  // USA
  "San Francisco", "Los Angeles", "San Diego", "San Jose", "Sacramento",
  "Bay Area", "New York", "Brooklyn", "Buffalo", "Austin", "Houston",
  "Dallas", "San Antonio", "Seattle", "Bellevue", "Redmond", "Boston",
  "Cambridge", "Chicago", "Miami", "Orlando", "Tampa", "Atlanta",
  "Denver", "Boulder", "Portland",
  // Global
  "London", "Berlin", "Toronto", "Singapore", "Tokyo", "Paris",
  "Sydney", "Bangkok", "Dubai",
];

const ALL_STATES = [
  "Tamil Nadu", "Karnataka", "Maharashtra", "Andhra Pradesh", "Telangana",
  "Delhi", "West Bengal", "Gujarat", "Rajasthan", "Uttar Pradesh",
  "Kerala", "Madhya Pradesh", "Bihar", "Punjab", "Goa",
  "California", "New York", "Texas", "Washington", "Massachusetts",
  "Illinois", "Florida", "Georgia", "Colorado", "Oregon",
];

const ALL_COUNTRIES = [
  "India", "USA", "United Kingdom", "UK", "Germany", "Canada",
  "Singapore", "Japan", "Australia", "France", "Brazil", "Netherlands",
];

/* ─── City name variants (normalised → variants) ──────────────────── */

export const CITY_VARIANTS: Record<string, string[]> = {
  chennai: ["Chennai", "Madras"],
  mumbai: ["Mumbai", "Bombay"],
  bangalore: ["Bangalore", "Bengaluru", "Bangaluru"],
  bengaluru: ["Bengaluru", "Bangalore"],
  hyderabad: ["Hyderabad", "Secunderabad"],
  pune: ["Pune", "Poona"],
  delhi: ["Delhi", "New Delhi", "NCR"],
  kolkata: ["Kolkata", "Calcutta"],
  ahmedabad: ["Ahmedabad", "Ahmadabad"],
  jaipur: ["Jaipur"],
  lucknow: ["Lucknow"],
  chandigarh: ["Chandigarh"],
  bhopal: ["Bhopal"],
  patna: ["Patna"],
  indore: ["Indore"],
  nagpur: ["Nagpur"],
  coimbatore: ["Coimbatore", "Kovai"],
  kochi: ["Kochi", "Cochin"],
  trivandrum: ["Trivandrum", "Thiruvananthapuram"],
  mysore: ["Mysore", "Mysuru"],
  manipal: ["Manipal"],
  trichy: ["Tiruchirappalli", "Trichy"],
  tiruchirappalli: ["Tiruchirappalli", "Trichy"],
  madurai: ["Madurai"],
  "san francisco": ["San Francisco", "SF", "Bay Area"],
  "new york": ["New York", "NYC", "New York City"],
  london: ["London"],
  berlin: ["Berlin"],
  toronto: ["Toronto"],
  singapore: ["Singapore"],
  tokyo: ["Tokyo"],
  paris: ["Paris"],
  sydney: ["Sydney"],
  bangkok: ["Bangkok"],
  dubai: ["Dubai"],
};

/* ─── State → city mapping (for state-level scope) ────────────────── */

export const STATE_CITIES: Record<string, Record<string, string[]>> = {
  India: {
    "Tamil Nadu": [
      "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
      "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Thanjavur",
    ],
    Karnataka: [
      "Bangalore", "Bengaluru", "Mysore", "Mysuru", "Mangalore",
      "Hubli", "Dharwad", "Belgaum", "Belagavi", "Gulbarga",
    ],
    Maharashtra: [
      "Mumbai", "Pune", "Nagpur", "Thane", "Nashik",
      "Aurangabad", "Solapur", "Kolhapur",
    ],
    "Andhra Pradesh": [
      "Hyderabad", "Visakhapatnam", "Vijayawada", "Guntur", "Tirupati",
    ],
    Telangana: [
      "Hyderabad", "Secunderabad", "Warangal", "Karimnagar", "Nizamabad",
    ],
    Delhi: ["Delhi", "New Delhi", "NCR"],
    "West Bengal": [
      "Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol",
    ],
    Gujarat: [
      "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar",
    ],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
    "Uttar Pradesh": ["Lucknow", "Noida", "Ghaziabad", "Agra", "Varanasi"],
    Kerala: [
      "Kochi", "Cochin", "Thiruvananthapuram", "Trivandrum",
      "Kozhikode", "Calicut",
    ],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior"],
    Bihar: ["Patna", "Gaya", "Muzaffarpur"],
    Punjab: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
    Goa: ["Goa", "Panaji", "Margao"],
  },
  USA: {
    California: [
      "San Francisco", "Los Angeles", "San Diego", "San Jose",
      "Sacramento", "Bay Area", "SF",
    ],
    "New York": ["New York", "NYC", "Brooklyn", "Buffalo"],
    Texas: ["Austin", "Houston", "Dallas", "San Antonio"],
    Washington: ["Seattle", "Bellevue", "Redmond"],
    Massachusetts: ["Boston", "Cambridge"],
    Illinois: ["Chicago"],
    Florida: ["Miami", "Orlando", "Tampa"],
    Georgia: ["Atlanta"],
    Colorado: ["Denver", "Boulder"],
    Oregon: ["Portland"],
  },
};

/* ─── Country name variants ────────────────────────────────────────── */

export const COUNTRY_VARIANTS: Record<string, string[]> = {
  india: ["India", "Bharat"],
  usa: ["USA", "United States", "United States of America"],
  "united states": ["USA", "United States", "United States of America"],
  uk: ["UK", "United Kingdom", "England", "Britain"],
  "united kingdom": ["UK", "United Kingdom", "England"],
  germany: ["Germany", "Deutschland"],
  canada: ["Canada"],
  singapore: ["Singapore"],
  japan: ["Japan"],
  australia: ["Australia"],
  france: ["France"],
  brazil: ["Brazil"],
  netherlands: ["Netherlands", "Holland"],
};

/* ─── Suggestion helper ────────────────────────────────────────────── */

export interface LocationSuggestion {
  label: string;
  scope: "city" | "state" | "country";
}

/**
 * Given a partial input + current scope, return matching suggestions.
 * Matches against cities, states, or countries depending on scope.
 */
export function getLocationSuggestions(
  input: string,
  scope: "city" | "state" | "country",
  limit = 6
): LocationSuggestion[] {
  const q = input.trim().toLowerCase();
  if (q.length < 2) return [];

  let pool: LocationSuggestion[];

  if (scope === "city") {
    pool = ALL_CITIES.map((c) => ({ label: c, scope: "city" as const }));
  } else if (scope === "state") {
    pool = ALL_STATES.map((s) => ({
      label: s,
      scope: "state" as const,
    }));
  } else {
    pool = ALL_COUNTRIES.map((c) => ({
      label: c,
      scope: "country" as const,
    }));
  }

  // Exact prefix match first, then includes match
  const prefix = pool.filter((s) =>
    s.label.toLowerCase().startsWith(q)
  );
  const includes = pool.filter(
    (s) =>
      !s.label.toLowerCase().startsWith(q) &&
      s.label.toLowerCase().includes(q)
  );

  return [...prefix, ...includes].slice(0, limit);
}

/* ─── Existing helpers ─────────────────────────────────────────────── */

/**
 * Get location variants for a city.  Falls back to title-cased original
 * if no lookup entry exists.
 */
export function getCityVariants(city: string): string[] {
  const key = city.trim().toLowerCase();
  return CITY_VARIANTS[key] ?? [city.trim()];
}

/**
 * Get all cities in a state (from our static mapping).
 * Returns null if the state isn't in our lookup.
 */
export function getStateCities(
  country: string,
  state: string
): string[] | null {
  const countryKey = country.trim().toLowerCase();
  const countryEntry = STATE_CITIES[countryKey];
  if (!countryEntry) return null;

  const stateKey = Object.keys(countryEntry).find(
    (k) => k.toLowerCase() === state.trim().toLowerCase()
  );
  return stateKey ? countryEntry[stateKey] : null;
}

/**
 * Get location variants for a country.
 */
export function getCountryVariants(country: string): string[] {
  const key = country.trim().toLowerCase();
  return COUNTRY_VARIANTS[key] ?? [country.trim()];
}
