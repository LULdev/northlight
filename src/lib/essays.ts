export type Format = "Stills" | "Motion" | "Mixed";
export type Access = "Open" | "Members";
export type SetSize = "Small" | "Medium" | "Large";
export type SortKey = "latest" | "saved" | "rating" | "size";

export type Essay = {
  slug: string;
  title: string;
  photographer: string;
  location: string;
  country: string;
  region: string;
  state?: string;
  subject: string;
  style: string;
  format: Format;
  rating: number;
  practice: string;
  school: string;
  access: Access;
  photos: number;
  videos: number;
  sizeMb: number;
  saves: number;
  postedAt: string;
  cover: string;
  gallery: string[];
  captions: string[];
  excerpt: string;
  body: string;
};

export const PAGE_SIZE = 9;

export const essays: Essay[] = [
  {
    slug: "hunza-after-snow",
    title: "Hunza After Snow",
    photographer: "Amina Qureshi",
    location: "Hunza Valley",
    country: "Pakistan",
    region: "South Asia",
    subject: "Landscape",
    style: "Color",
    format: "Stills",
    rating: 9,
    practice: "Travel",
    school: "National College of Arts",
    access: "Open",
    photos: 28,
    videos: 0,
    sizeMb: 186,
    saves: 412,
    postedAt: "2026-09-02",
    cover: "/photos/hunza.jpg",
    gallery: ["/photos/hunza.jpg", "/photos/hunza-2.jpg"],
    captions: [
      "Rakaposhi catching the last plane of light after a two-day storm.",
      "Apricot terraces, stone irrigation, and the valley floor still holding snow.",
    ],
    excerpt: "A quiet week in the Karakoram after the first real snow of the season.",
    body: "The jeep road from Gilgit was closed until noon. When it opened, the valley had been rinsed — rooftops dark with melt, orchards skeletal, the river a pale braid. I walked the same three kilometres each morning, waiting for the cloud to lift off Rakaposhi. Most of the pictures in this set were made between 6:40 and 7:15, when the granite goes copper for twelve minutes and then goes grey again.",
  },
  {
    slug: "karachi-after-rain",
    title: "Karachi After Rain",
    photographer: "Bilal Hassan",
    location: "Karachi",
    country: "Pakistan",
    region: "South Asia",
    subject: "Street",
    style: "Night",
    format: "Mixed",
    rating: 8,
    practice: "Photojournalist",
    school: "Indus Valley School",
    access: "Open",
    photos: 34,
    videos: 6,
    sizeMb: 248,
    saves: 531,
    postedAt: "2026-08-28",
    cover: "/photos/karachi.jpg",
    gallery: ["/photos/karachi.jpg", "/photos/karachi-2.jpg"],
    captions: [
      "Burns Road after the monsoon, sodium and neon in the wet asphalt.",
      "The harbour at blue hour — nets, hulls, and the city as a smear of light.",
    ],
    excerpt: "Monsoon nights on Burns Road and the working harbour at Keamari.",
    body: "Karachi in August is a city that photographs itself. The rain writes the streets in specular highlights; every stall becomes a lantern. I shot this set on two lenses only — 35 and 50 — and kept the camera at chest height. The six clips are field notes: generators, a tea boy calling, the harbour crane that never sleeps.",
  },
  {
    slug: "lahore-last-light",
    title: "Lahore, Last Light",
    photographer: "Sana Iftikhar",
    location: "Lahore",
    country: "Pakistan",
    region: "South Asia",
    subject: "Architecture",
    style: "Golden Hour",
    format: "Stills",
    rating: 9,
    practice: "Architecture",
    school: "National College of Arts",
    access: "Open",
    photos: 22,
    videos: 0,
    sizeMb: 154,
    saves: 388,
    postedAt: "2026-08-21",
    cover: "/photos/lahore.jpg",
    gallery: ["/photos/lahore.jpg", "/photos/lahore-2.jpg"],
    captions: [
      "Badshahi Mosque, empty courtyard, the sandstone going red.",
      "A marble jali and a slice of sky — the city held at arm’s length.",
    ],
    excerpt: "Mughal stone and the twelve minutes when Lahore turns the colour of brick dust.",
    body: "I had permission to be in the courtyard after the last prayer. The tourists had gone. What remains of a mosque at that hour is geometry: minarets as metronomes, the marble floor as a tide table for shadow. The second frame is from a smaller courtyard I will not name — a jali that has been looking at the same patch of sky since the 17th century.",
  },
  {
    slug: "skardu-cold-desert",
    title: "Skardu Cold Desert",
    photographer: "Omar Sheikh",
    location: "Skardu",
    country: "Pakistan",
    region: "South Asia",
    subject: "Landscape",
    style: "Color",
    format: "Mixed",
    rating: 8,
    practice: "Landscape",
    school: "Beaconhouse National University",
    access: "Members",
    photos: 19,
    videos: 4,
    sizeMb: 201,
    saves: 276,
    postedAt: "2026-08-14",
    cover: "/photos/skardu.jpg",
    gallery: ["/photos/skardu.jpg", "/photos/skardu-2.jpg"],
    captions: [
      "Katpana dunes against the Karakoram wall, noon, no wind.",
      "A river of stars and one lantern — the coldest night of the trip.",
    ],
    excerpt: "Sand against granite: the Katpana dunes and a night with no moon.",
    body: "People come to Skardu for the peaks and are unprepared for the desert. Katpana is a small erg, pale as bone, parked against a wall of granite as if someone had made a mistake in the geology. I camped one night on the downwind side. The stills are the dunes; the clips are the wind arriving at 2 a.m., which you cannot photograph, only hold.",
  },
  {
    slug: "tokyo-rain-alleys",
    title: "Tokyo Rain Alleys",
    photographer: "Kenji Watanabe",
    location: "Tokyo",
    country: "Japan",
    region: "East Asia",
    subject: "Street",
    style: "Night",
    format: "Stills",
    rating: 9,
    practice: "Street",
    school: "Tokyo Polytechnic",
    access: "Open",
    photos: 41,
    videos: 0,
    sizeMb: 312,
    saves: 644,
    postedAt: "2026-08-09",
    cover: "/photos/tokyo.jpg",
    gallery: ["/photos/tokyo.jpg", "/photos/tokyo-2.jpg"],
    captions: [
      "Golden Gai adjacent, umbrellas, vending light, no names on the signs.",
      "Dawn from the overpass — the city before it starts arguing with itself.",
    ],
    excerpt: "Narrow weather. Neon as a practical light source, not a style.",
    body: "I do not chase neon. I chase the rain that makes neon useful. This set was made over eleven nights in Shinjuku and Yanaka, always after 11, always with a hood that never quite kept the lens dry. The dawn frame is the apology: Tokyo from above, empty, the expressway drawing a single long breath.",
  },
  {
    slug: "kyoto-raked-garden",
    title: "Kyoto, Raked",
    photographer: "Yuki Mori",
    location: "Kyoto",
    country: "Japan",
    region: "East Asia",
    subject: "Architecture",
    style: "Overcast",
    format: "Stills",
    rating: 8,
    practice: "Architecture",
    school: "Tokyo Polytechnic",
    access: "Open",
    photos: 16,
    videos: 0,
    sizeMb: 98,
    saves: 219,
    postedAt: "2026-08-03",
    cover: "/photos/kyoto.jpg",
    gallery: ["/photos/kyoto.jpg", "/photos/kyoto-2.jpg"],
    captions: [
      "Temple garden, maple, lantern — the gravel raked that morning.",
      "Arashiyama bamboo, a path with no one on it for nine minutes.",
    ],
    excerpt: "Two gardens and the discipline of standing still in overcast light.",
    body: "Overcast is the correct weather for Kyoto. Colour saturates without glare; stone keeps its temperature. I was given twenty minutes in the first garden and used twelve. The bamboo grove is a cliché until you wait long enough for it to empty, at which point it becomes a study in verticals and the colour green actually is.",
  },
  {
    slug: "iceland-black-sand",
    title: "Iceland Black Sand",
    photographer: "Sigrid Holm",
    location: "Reynisfjara",
    country: "Iceland",
    region: "Nordics",
    subject: "Seascape",
    style: "Storm Light",
    format: "Mixed",
    rating: 9,
    practice: "Landscape",
    school: "Oslo Foto",
    access: "Open",
    photos: 24,
    videos: 5,
    sizeMb: 267,
    saves: 498,
    postedAt: "2026-07-29",
    cover: "/photos/iceland.jpg",
    gallery: ["/photos/iceland.jpg", "/photos/iceland-2.jpg"],
    captions: [
      "Basalt organ pipes, a sea that wants the camera.",
      "A turf roof and a black river in the interior — the island emptying out.",
    ],
    excerpt: "The south coast in a gale, and a quieter day in the highlands.",
    body: "Reynisfjara is over-photographed and still underrated, which is a useful combination: the basalt does not care how many pictures have been made of it. I shot with a rain cover and a 1/15th that I should not have risked. The highland frame is the counterweight — a hut, moss, a river the colour of wet slate.",
  },
  {
    slug: "lofoten-winter-light",
    title: "Lofoten Winter Light",
    photographer: "Erik Nilsen",
    location: "Reine",
    country: "Norway",
    region: "Nordics",
    subject: "Landscape",
    style: "Color",
    format: "Stills",
    rating: 10,
    practice: "Landscape",
    school: "Oslo Foto",
    access: "Members",
    photos: 18,
    videos: 0,
    sizeMb: 142,
    saves: 721,
    postedAt: "2026-07-22",
    cover: "/photos/lofoten.jpg",
    gallery: ["/photos/lofoten.jpg", "/photos/lofoten-2.jpg"],
    captions: [
      "Cabins on stilts, a faint aurora, the fjord holding still.",
      "Stockfish racks and red clapboard — the working village, not the postcard.",
    ],
    excerpt: "Four days of polar blue and one night the sky remembered how to be green.",
    body: "The light in Lofoten in January is not a golden hour. It is a golden four hours, sideways, from a sun that never quite commits. I stayed in a rorbu that smelled of tar and coffee. The aurora on the first night was a rumour; on the third it arrived properly, low, almost embarrassed, which is how I prefer it.",
  },
  {
    slug: "marrakech-medina",
    title: "Marrakech Medina",
    photographer: "Noor Al-Farsi",
    location: "Marrakech",
    country: "Morocco",
    region: "Maghreb",
    subject: "Street",
    style: "Color",
    format: "Stills",
    rating: 8,
    practice: "Travel",
    school: "École supérieure des arts visuels",
    access: "Open",
    photos: 31,
    videos: 0,
    sizeMb: 198,
    saves: 355,
    postedAt: "2026-07-18",
    cover: "/photos/marrakech.jpg",
    gallery: ["/photos/marrakech.jpg", "/photos/marrakech-2.jpg"],
    captions: [
      "A cobalt door and the geometry of shade in the medina.",
      "Rooftops, dishes, the Atlas as a rumour on the horizon.",
    ],
    excerpt: "Walls, doors, and the hour when the medina photographs its own shadow.",
    body: "I am not interested in the square. I am interested in the lanes that feed it, where the light is a blade between two walls and a door is a full paragraph of colour. The rooftop frame is the only wide shot in the set — late, tea gone cold, the mountains just visible if you know they are there.",
  },
  {
    slug: "sahara-dawn",
    title: "Sahara Dawn",
    photographer: "Youssef Benali",
    location: "Merzouga",
    country: "Morocco",
    region: "Maghreb",
    subject: "Landscape",
    style: "Golden Hour",
    format: "Mixed",
    rating: 9,
    practice: "Landscape",
    school: "École supérieure des arts visuels",
    access: "Open",
    photos: 14,
    videos: 3,
    sizeMb: 176,
    saves: 402,
    postedAt: "2026-07-11",
    cover: "/photos/sahara.jpg",
    gallery: ["/photos/sahara.jpg", "/photos/sahara-2.jpg"],
    captions: [
      "Erg Chebbi at first light — ridgelines, one caravan as punctuation.",
      "The same dunes at night, a fire the size of a coin, the rest of the sky.",
    ],
    excerpt: "A small erg, a large sky, and the oldest available light.",
    body: "You walk out before the camels. The dunes at that hour are a drawing, not a photograph — every ridge a line, every slipface a fill. I made fourteen stills and three clips of wind moving sand the way a hand moves a tablecloth. The night frame is the reason I carried a tripod across 400 metres of soft erg and did not regret it.",
  },
  {
    slug: "patagonia-wind",
    title: "Patagonia Wind",
    photographer: "Rafael Mendes",
    location: "Torres del Paine",
    country: "Chile",
    region: "Americas",
    subject: "Mountains",
    style: "Storm Light",
    format: "Stills",
    rating: 9,
    practice: "Landscape",
    school: "Universidad de Chile",
    access: "Open",
    photos: 26,
    videos: 0,
    sizeMb: 221,
    saves: 467,
    postedAt: "2026-07-04",
    cover: "/photos/patagonia.jpg",
    gallery: ["/photos/patagonia.jpg", "/photos/patagonia-2.jpg"],
    captions: [
      "The towers, a milky lake, grass that has learned to live sideways.",
      "A guanaco on the ridge, holding its ground against the same wind.",
    ],
    excerpt: "A week of weather in Torres del Paine, which is to say a week of the point.",
    body: "The wind in Paine is not an inconvenience. It is the subject. Tents fail, filters sandblast, and the towers appear and vanish like a thought you cannot finish. I hiked the French Valley twice; the second time the sky opened for eleven minutes and I made the frame that opens this set. The guanaco was there both days, unimpressed.",
  },
  {
    slug: "new-york-off-hours",
    title: "New York, Off Hours",
    photographer: "Maya Chen",
    location: "New York",
    country: "United States",
    region: "Americas",
    state: "New York",
    subject: "Street",
    style: "Night",
    format: "Mixed",
    rating: 8,
    practice: "Street",
    school: "International Center of Photography",
    access: "Open",
    photos: 37,
    videos: 8,
    sizeMb: 289,
    saves: 512,
    postedAt: "2026-06-27",
    cover: "/photos/subway.jpg",
    gallery: ["/photos/subway.jpg", "/photos/subway-2.jpg"],
    captions: [
      "A platform after the last useful train, tiles and a smear of light.",
      "Steam on an empty avenue at 5 a.m. — the city between shifts.",
    ],
    excerpt: "Subway platforms and avenues in the hours the city pretends to rest.",
    body: "I rode the last trains and the first ones and almost none of the ones in between. New York at 4 a.m. is a set that has not been struck. The platform frame is 125th Street; the street frame is farther south, steam from a pipe that has been performing this trick since before I was born. The clips are mostly sound: brakes, a radio from a bodega, nobody talking.",
  },
  {
    slug: "big-sur-fog-line",
    title: "Big Sur Fog Line",
    photographer: "Elena Voss",
    location: "Big Sur",
    country: "United States",
    region: "Americas",
    state: "California",
    subject: "Seascape",
    style: "Golden Hour",
    format: "Stills",
    rating: 9,
    practice: "Landscape",
    school: "California Institute of the Arts",
    access: "Open",
    photos: 20,
    videos: 0,
    sizeMb: 167,
    saves: 339,
    postedAt: "2026-06-19",
    cover: "/photos/bigsur.jpg",
    gallery: ["/photos/bigsur.jpg", "/photos/bigsur-2.jpg"],
    captions: [
      "The arch, the swell, fog taking the sun and giving it back.",
      "A kelp cove at low tide — the Pacific as a working table.",
    ],
    excerpt: "Highway One in the season when the ocean breathes on the cliffs.",
    body: "Fog is the correct weather for this coast. Without it the bridge is a postcard; with it the bridge is a sentence that trails off. I pulled over in the same three turnouts for four mornings. The cove frame was a descent I will not recommend in writing. Tide pools, a sea stack, and the sound of water rearranging rocks.",
  },
  {
    slug: "venice-in-fog",
    title: "Venice in Fog",
    photographer: "Giulia Romano",
    location: "Venice",
    country: "Italy",
    region: "Europe",
    subject: "City",
    style: "Overcast",
    format: "Stills",
    rating: 8,
    practice: "Travel",
    school: "IUAV Venice",
    access: "Members",
    photos: 17,
    videos: 0,
    sizeMb: 121,
    saves: 284,
    postedAt: "2026-06-12",
    cover: "/photos/venice.jpg",
    gallery: ["/photos/venice.jpg", "/photos/venice-2.jpg"],
    captions: [
      "A canal dissolving. One gondola as a rumour.",
      "An empty campo at dawn, the wellhead keeping watch.",
    ],
    excerpt: "Acqua alta of the atmosphere — the city reduced to plaster and quiet.",
    body: "Fog is the only honest way to photograph Venice now. It subtracts the crowd and leaves the construction: palazzi as cliffs, water as a floor. I was there in February, which is the month the city belongs to itself again. The campo frame was 6:10 a.m.; a baker opened a shutter and then closed it when he saw the camera, which I took as a blessing.",
  },
  {
    slug: "yellowstone-steam",
    title: "Yellowstone Steam",
    photographer: "Jonah Ellis",
    location: "Yellowstone",
    country: "United States",
    region: "Americas",
    state: "Wyoming",
    subject: "Wildlife",
    style: "Color",
    format: "Mixed",
    rating: 8,
    practice: "Wildlife",
    school: "University of Montana",
    access: "Open",
    photos: 29,
    videos: 7,
    sizeMb: 254,
    saves: 376,
    postedAt: "2026-06-05",
    cover: "/photos/yellowstone.jpg",
    gallery: ["/photos/yellowstone.jpg", "/photos/yellowstone-2.jpg"],
    captions: [
      "Bison in the steam of a river at dawn, sage brushed with frost.",
      "Grand Prismatic from above — the boardwalk empty, the spring doing its work.",
    ],
    excerpt: "A park in the shoulder season, when the animals have the roads.",
    body: "I went in late October. The hotels were closing. Bison used the road as a road. The river-steam frame was made from a pull-off I have used for eight years; the spring frame was a walk I timed for a weather window that lasted twenty minutes. The clips are bison breath, a geyser that did not quite erupt, and wind in lodgepole.",
  },
  {
    slug: "serengeti-crossing",
    title: "Serengeti Crossing",
    photographer: "Asha Mwangi",
    location: "Serengeti",
    country: "Tanzania",
    region: "East Africa",
    subject: "Wildlife",
    style: "Golden Hour",
    format: "Mixed",
    rating: 10,
    practice: "Wildlife",
    school: "University of Nairobi",
    access: "Members",
    photos: 33,
    videos: 9,
    sizeMb: 341,
    saves: 802,
    postedAt: "2026-05-28",
    cover: "/photos/serengeti.jpg",
    gallery: ["/photos/serengeti.jpg", "/photos/serengeti-2.jpg"],
    captions: [
      "The herd as weather — wildebeest filling the grass to the horizon.",
      "One acacia, two giraffes, the day putting itself away.",
    ],
    excerpt: "The migration as a landscape problem, not a trophy problem.",
    body: "I am not a shooter of teeth. I am a shooter of weather that happens to be made of animals. This set treats the crossing as a field of motion: dust, grass, the long line of a herd that is also a river. The dusk frame is the one I would keep if I could keep only one — an acacia holding the last of the colour, two giraffes as commas.",
  },
];

export const FILTERS = [
  { key: "subject", label: "Subject", get: (e: Essay) => e.subject },
  { key: "location", label: "Location", get: (e: Essay) => e.location },
  { key: "region", label: "Region", get: (e: Essay) => e.region },
  { key: "state", label: "State (USA)", get: (e: Essay) => e.state ?? "" },
  { key: "style", label: "Style", get: (e: Essay) => e.style },
  { key: "format", label: "Format", get: (e: Essay) => e.format },
  { key: "rating", label: "Rating", get: (e: Essay) => `${e.rating}/10` },
  { key: "practice", label: "Practice", get: (e: Essay) => e.practice },
  { key: "school", label: "School", get: (e: Essay) => e.school },
  { key: "access", label: "Open or Members", get: (e: Essay) => e.access },
  {
    key: "size",
    label: "Set size",
    get: (e: Essay) => setSizeOf(e),
  },
] as const;

export type FilterKey = (typeof FILTERS)[number]["key"];

export type EssaySearch = {
  q?: string;
  subject?: string;
  location?: string;
  region?: string;
  state?: string;
  style?: string;
  format?: string;
  rating?: string;
  practice?: string;
  school?: string;
  access?: string;
  size?: string;
  sort?: SortKey;
  page?: number;
};

export function setSizeOf(e: Essay): SetSize {
  const n = e.photos + e.videos;
  if (n <= 18) return "Small";
  if (n <= 32) return "Medium";
  return "Large";
}

export function parseSearch(search: Record<string, unknown>): EssaySearch {
  const str = (k: string) =>
    typeof search[k] === "string" && search[k] ? (search[k] as string) : undefined;
  const pageRaw = search.page;
  const page =
    typeof pageRaw === "number"
      ? pageRaw
      : typeof pageRaw === "string"
        ? Number(pageRaw)
        : 1;
  const sort = str("sort");
  return {
    q: str("q"),
    subject: str("subject"),
    location: str("location"),
    region: str("region"),
    state: str("state"),
    style: str("style"),
    format: str("format"),
    rating: str("rating"),
    practice: str("practice"),
    school: str("school"),
    access: str("access"),
    size: str("size"),
    sort:
      sort === "saved" || sort === "rating" || sort === "size" || sort === "latest"
        ? sort
        : "latest",
    page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1,
  };
}

export function facetOptions(key: FilterKey): { value: string; count: number }[] {
  const spec = FILTERS.find((f) => f.key === key)!;
  const counts = new Map<string, number>();
  for (const e of essays) {
    const v = spec.get(e);
    if (!v) continue;
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([value, count]) => ({ value, count }));
}

export function matches(e: Essay, s: EssaySearch): boolean {
  if (s.q) {
    const q = s.q.toLowerCase();
    const blob = `${e.title} ${e.photographer} ${e.location} ${e.country} ${e.subject} ${e.excerpt}`.toLowerCase();
    if (!blob.includes(q)) return false;
  }
  if (s.subject && e.subject !== s.subject) return false;
  if (s.location && e.location !== s.location) return false;
  if (s.region && e.region !== s.region) return false;
  if (s.state && e.state !== s.state) return false;
  if (s.style && e.style !== s.style) return false;
  if (s.format && e.format !== s.format) return false;
  if (s.rating && `${e.rating}/10` !== s.rating) return false;
  if (s.practice && e.practice !== s.practice) return false;
  if (s.school && e.school !== s.school) return false;
  if (s.access && e.access !== s.access) return false;
  if (s.size && setSizeOf(e) !== s.size) return false;
  return true;
}

export function sortEssays(list: Essay[], sort: SortKey = "latest"): Essay[] {
  const copy = [...list];
  switch (sort) {
    case "saved":
      return copy.sort((a, b) => b.saves - a.saves);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating || b.saves - a.saves);
    case "size":
      return copy.sort((a, b) => b.sizeMb - a.sizeMb);
    default:
      return copy.sort((a, b) => (a.postedAt < b.postedAt ? 1 : -1));
  }
}

export function queryEssays(s: EssaySearch): {
  total: number;
  page: number;
  pages: number;
  items: Essay[];
  lead: Essay | undefined;
} {
  const filtered = sortEssays(essays.filter((e) => matches(e, s)), s.sort);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(s.page ?? 1, pages);
  const start = (page - 1) * PAGE_SIZE;
  return {
    total: filtered.length,
    page,
    pages,
    items: filtered.slice(start, start + PAGE_SIZE),
    lead: page === 1 && !hasActiveFilters(s) ? filtered[0] : undefined,
  };
}

export function hasActiveFilters(s: EssaySearch): boolean {
  return Boolean(
    s.q ||
      s.subject ||
      s.location ||
      s.region ||
      s.state ||
      s.style ||
      s.format ||
      s.rating ||
      s.practice ||
      s.school ||
      s.access ||
      s.size,
  );
}

export function activeFilterEntries(s: EssaySearch): { key: FilterKey | "q"; label: string; value: string }[] {
  const out: { key: FilterKey | "q"; label: string; value: string }[] = [];
  if (s.q) out.push({ key: "q", label: "Search", value: s.q });
  for (const f of FILTERS) {
    const v = s[f.key];
    if (v) out.push({ key: f.key, label: f.label, value: v });
  }
  return out;
}

export function getEssay(slug: string): Essay | undefined {
  return essays.find((e) => e.slug === slug);
}

export function relatedEssays(essay: Essay, n = 3): Essay[] {
  return essays
    .filter(
      (e) =>
        e.slug !== essay.slug &&
        (e.region === essay.region || e.subject === essay.subject || e.practice === essay.practice),
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, n);
}

export function formatBytes(mb: number): string {
  return `${mb.toFixed(0)} MB`;
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
