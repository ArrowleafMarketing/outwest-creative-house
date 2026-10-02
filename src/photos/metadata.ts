/**
 * Hand-authored metadata for the OutWest photo library. Written by looking at each
 * frame, not inferred from filenames — edit freely, nothing regenerates this file.
 *
 * `category` follows the PLACE / PERSON / DETAIL / WORK rhythm in docs/DIRECTION.md.
 * Alternating those across a page is what keeps the layout feeling editorial.
 */

export type PhotoCategory =
  /** The house itself — sets, architecture, the room in use. */
  | "place"
  /** Someone in front of the camera, or behind it. */
  | "person"
  /** Tight crop — texture, hands, boots, objects. */
  | "detail"
  /** Finished client or brand work made in the house. */
  | "work";

export type PhotoTag =
  | "bw"
  | "bts"
  | "group"
  | "holiday"
  | "business"
  | "denim"
  | "western"
  | "motion"
  | "hard-light"
  | "product"
  /** Material and surface — plaster, stone, grain. The brand's texture device. */
  | "texture"
  /** The space with nobody in it. */
  | "empty";

export type PhotoMeta = {
  alt: string;
  category: PhotoCategory;
  /** The shoot this frame belongs to, where one is identifiable. */
  series?: string;
  tags?: PhotoTag[];
};

export const photoMetadata: Record<string, PhotoMeta> = {
  "a7402189-2": { alt: "Close black-and-white beauty portrait, hand resting on the shoulder", category: "person", tags: ["bw"] },
  "a7402373-edit": { alt: "Full-length black-and-white figure standing on a soft grey sweep", category: "person", tags: ["bw"] },
  "a7402383": { alt: "Black-and-white seated portrait in a bodysuit and heels", category: "person", tags: ["bw"] },
  "a7402385": { alt: "Seated portrait on a warm cream sweep", category: "person" },
  "a7402481": { alt: "Black-and-white seated figure on a wide grey sweep", category: "person", tags: ["bw"] },

  "denim-daze-06": { alt: "Full-length in a blue jumpsuit and wide-brim hat on an olive backdrop", category: "work", series: "Denim Daze", tags: ["denim", "western"] },
  "denim-daze-09": { alt: "Profile in denim overalls and a hat against olive", category: "work", series: "Denim Daze", tags: ["denim"] },
  "denim-daze-13": { alt: "Black-and-white seated portrait in a hat and silver boots", category: "work", series: "Denim Daze", tags: ["bw", "denim", "western"] },
  "denim-daze-18": { alt: "Seated in flared denim and fur trim against terracotta", category: "work", series: "Denim Daze", tags: ["denim"] },
  "denim-daze-27": { alt: "Close portrait against a terracotta backdrop", category: "work", series: "Denim Daze" },
  "denim-daze-28": { alt: "Lifting a hat overhead against terracotta", category: "work", series: "Denim Daze", tags: ["denim", "western"] },
  "denim-daze-46": { alt: "Wide frame of a group on a sofa, studio sweep and lighting visible", category: "place", series: "Denim Daze", tags: ["group", "bts", "denim"] },
  "denim-daze-49": { alt: "Reclining upside down on a leather sofa beneath a woven wall disc", category: "work", series: "Denim Daze", tags: ["denim"] },
  "denim-daze-77": { alt: "Portrait in a hat against a large woven disc", category: "work", series: "Denim Daze", tags: ["denim", "western"] },

  "dsc-1421": { alt: "Holiday set — decorated tree, wreath and a green velvet sofa", category: "place", tags: ["holiday"] },
  "dsc-1424": { alt: "Wide holiday set with a green sofa, tree and wood coffee table", category: "place", tags: ["holiday"] },
  "dsc-1426": { alt: "Holiday corner with arched shelving and cone trees", category: "place", tags: ["holiday"] },
  "dsc-1430": { alt: "Wicker settee framed by a pine tree and garland", category: "place", tags: ["holiday"] },
  "dsc-1433": { alt: "Close detail of garland and brass stars against plaster", category: "detail", tags: ["holiday"] },
  "dsc-1435": { alt: "White sofa and flocked tree against a deep green velvet curtain", category: "place", tags: ["holiday"] },
  "dsc-1441": { alt: "Cognac leather settee beside a tree in window light", category: "place", tags: ["holiday"] },
  "dsc-1443": { alt: "Cream armchair with woven cone trees on a soft rug", category: "place", tags: ["holiday"] },
  "dsc-1450": { alt: "Holiday corner with woven trees and dried pampas", category: "place", tags: ["holiday"] },

  // --- The space, unpeopled. Source: Drive "Photo / Tyler's Picks - sept.2026 / Space SHOTZZ".
  // More of these are coming; see src/photos/README.md.
  "a7500703-2": { alt: "Plaster side table holding a small olive tree on an empty sweep", category: "place", tags: ["empty", "hard-light"] },
  "a7500704-2": { alt: "Close detail of a wooden bowl on the grain of a cast plaster surface", category: "detail", tags: ["empty", "texture"] },
  "a7500738-2": { alt: "Wide letterbox of a plaster table and olive tree, shadow curving behind", category: "place", tags: ["empty", "hard-light"] },
  "a7500748": { alt: "Olive tree on a plaster pedestal, a hard diagonal shadow across the wall", category: "detail", tags: ["empty", "texture", "hard-light"] },
  "a7500769": { alt: "Olive tree on a plaster pedestal against a softly shadowed wall", category: "place", tags: ["empty", "hard-light"] },
  "a7500819": { alt: "Cream lounge chair and olive tree beneath blind-slatted light", category: "place", tags: ["empty", "hard-light"] },
  "a7500862": { alt: "Cream lounge chair, olive tree and side table in raking window light", category: "place", tags: ["empty", "hard-light"] },

  "dsc-8329": { alt: "Seated in a berry dress beside a leather chair in hard light", category: "person", tags: ["hard-light"] },
  "dsc-8431": { alt: "Seated in a blush dress beneath an olive tree and plaster arch", category: "person" },
  "dsc-8488": { alt: "Photographers working a set together in the studio", category: "person", tags: ["bts", "group"] },
  "dsc-8635": { alt: "Seated portrait in a green top, a second camera entering frame", category: "person", tags: ["bts"] },
  "dsc-8658": { alt: "Three women gathered around a chair, laughing", category: "person", tags: ["group"] },
  "dsc-8740": { alt: "Group of three in hard directional light", category: "person", tags: ["group", "hard-light"] },
  "dsc-8936": { alt: "Seated portrait under olive branch shadows on plaster", category: "person", tags: ["hard-light"] },
  "dsc-8996": { alt: "Reclining in a berry dress among olive trees and plaster", category: "person" },
  "dsc-9006-2": { alt: "Leaning against a bolster beneath olive trees", category: "person" },
  "dsc-9070": { alt: "Laughing with both hands in her hair", category: "person" },
  "dsc-9123": { alt: "Standing against a plaster arch beside an olive tree", category: "person" },
  "dsc-9149": { alt: "Seated in a green top against warm plaster", category: "person" },
  "dsc-9252": { alt: "Reclining in a leather top and white skirt on a pale sweep", category: "person" },
  "dsc-9267": { alt: "Seated in brown boots and a white skirt on a pale sweep", category: "person" },
  "dsc-9270": { alt: "Wide studio frame — a shoot in progress on the cyc wall", category: "place", tags: ["bts", "group"] },
  "dsc-9288": { alt: "Reclining on a white sweep, arm outstretched", category: "person" },
  "dsc-9292": { alt: "Photographers crouched around a subject mid-shoot", category: "person", tags: ["bts", "group"] },
  "dsc-9321": { alt: "Standing in a white tiered skirt and leather top", category: "person" },
  "dsc-9333": { alt: "Mid-movement against a wall, hard shadow cast behind", category: "person", tags: ["hard-light", "motion"] },

  "dsc-9365": { alt: "Holding a product bowl out to camera in a striped dress", category: "work", tags: ["product"] },
  "dsc-9394": { alt: "Product shoot in progress, lighting gear in frame", category: "work", tags: ["product", "bts"] },
  "dsc-9456": { alt: "Product bowl held to camera in moody directional light", category: "work", tags: ["product", "hard-light"] },
  "dsc-9509": { alt: "Close crop of hands lifting a forkful from a bowl", category: "detail", tags: ["product"] },

  "dscf0005": { alt: "Seated in a leather chair surrounded by plants in warm light", category: "person" },
  "dscf2069": { alt: "Black-and-white group of three on a settee", category: "person", tags: ["bw", "group"] },
  "dscf3201": { alt: "Standing in a blazer holding a laptop on a cream sweep", category: "person", tags: ["business"] },
  "dscf5779": { alt: "Denim jacket and white western boots on a leather sofa", category: "person", tags: ["denim", "western"] },
  "dscf5969": { alt: "Reclining backwards over a chair against a teal backdrop", category: "person", tags: ["denim"] },

  "first-light-09": { alt: "Portrait at a table against a deep brown curtain", category: "person", series: "First Light" },
  "first-light-13": { alt: "Seated in dappled light in a mesh top", category: "person", series: "First Light", tags: ["hard-light"] },
  "first-light-17": { alt: "A woman seated on a low cream lounge chair between an olive tree and a side table", category: "person", series: "First Light" },
  "first-light-38": { alt: "Seated in a low lounge chair in raking afternoon light", category: "place", series: "First Light", tags: ["hard-light"] },

  "photo-07-08-2025-11-08-00-34": { alt: "Walking toward camera in a denim set and hat, bag swinging", category: "person", tags: ["denim", "western", "motion"] },
  "photo-07-08-2025-11-37-24-99": { alt: "Wide studio frame with the sweep, stand and room visible", category: "place", tags: ["bts"] },
  "photo-28-07-2026-14-03-26-0": { alt: "Seated on a cantilever chair against a deep teal backdrop", category: "person", tags: ["denim"] },
  "photo-28-07-2026-14-16-26-73": { alt: "Black-and-white seated portrait on the studio cyc", category: "person", tags: ["bw", "denim"] },
  "photo-28-07-2026-14-16-31-69": { alt: "Black-and-white wide frame, studio edges and stands in view", category: "person", tags: ["bw", "bts"] },
  "photo-28-07-2026-14-49-17-38": { alt: "Black-and-white standing figure, wide stance on the cyc", category: "person", tags: ["bw", "denim"] },
  "photo-28-07-2026-15-01-11-79": { alt: "Kneeling in a white slip dress against teal", category: "person" },

  "rambler-x-westbound-052": { alt: "Black-and-white group of three in western styling", category: "work", series: "Rambler x Westbound", tags: ["bw", "group", "western"] },
  "rambler-x-westbound-094": { alt: "Reclining in denim and a felt hat beside a potted cactus", category: "work", series: "Rambler x Westbound", tags: ["denim", "western"] },
  "rambler-x-westbound-097": { alt: "Wide reclining frame in denim and a felt hat", category: "work", series: "Rambler x Westbound", tags: ["denim", "western"] },
  "rambler-x-westbound-102": { alt: "Reclining on a cream sweep, studio floor visible at the edge", category: "work", series: "Rambler x Westbound", tags: ["denim", "western", "bts"] },
  "rambler-x-westbound-198": { alt: "Crop of a tan western boot stepping beneath a fringed skirt", category: "detail", series: "Rambler x Westbound", tags: ["western"] },
  "rambler-x-westbound-200": { alt: "Crop of western boots and a leather fringe bag mid-stride", category: "detail", series: "Rambler x Westbound", tags: ["western"] },

  "taylor-schiers-064": { alt: "Motion-blurred figure walking across the studio", category: "person", series: "Taylor Schiers", tags: ["motion", "business"] },
  "taylor-schiers-076": { alt: "Standing in a blazer with a laptop, one heel raised", category: "person", series: "Taylor Schiers", tags: ["business"] },
  "taylor-schiers-096": { alt: "Stepping off a white sofa in a black suit against teal velvet", category: "person", series: "Taylor Schiers", tags: ["business", "motion"] },
  "taylor-schiers-118": { alt: "Reclining across a chair holding a magazine overhead", category: "person", series: "Taylor Schiers", tags: ["business"] },
};
