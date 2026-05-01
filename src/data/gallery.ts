export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  rating: number; // 1–5; home page shows only rating === 5
};

export const galleryImages: GalleryImage[] = [
  // ── Rating 5 ──────────────────────────────────────────────────────────────
  { id: 'aurora3',                   src: '/images/photography/aurora3.jpeg',                   alt: 'Aurora 3',                         caption: 'Aurora Borealis',                                            width: 1600, height: 1000, rating: 5 },
  { id: 'milkyway1',                 src: '/images/photography/milkyway1.jpeg',                 alt: 'Milky Way 1',                      caption: 'Milky Way',                                                  width: 1600, height: 1000, rating: 5 },
  { id: 'grand_prismatic_spring1',   src: '/images/photography/grand_prismatic_spring1.jpeg',   alt: 'Grand Prismatic Spring',           caption: 'Grand Prismatic Spring, Yellowstone National Park',         width: 1600, height: 1000, rating: 5 },
  { id: 'zion',                      src: '/images/photography/zion.jpeg',                      alt: 'Zion',                             caption: 'Zion National Park',                                         width: 1600, height: 1000, rating: 5 },
  { id: 'west_thumb_geyser_basin1',  src: '/images/photography/west_thumb_geyser_basin1.jpeg',  alt: 'West Thumb Geyser Basin',          caption: 'West Thumb Geyser Basin, Yellowstone National Park',         width: 1600, height: 1000, rating: 5 },
  { id: 'black_sand_basin',          src: '/images/photography/black_sand_basin.jpeg',          alt: 'Black Sand Basin',                 caption: 'Black Sand Basin, Yellowstone National Park',               width: 1600, height: 1000, rating: 5 },
  { id: 'raven',                     src: '/images/photography/raven.jpeg',                     alt: 'Raven',                            caption: 'Raven',                                                      width: 1600, height: 1000, rating: 5 },
  { id: 'nevada',                    src: '/images/photography/nevada.jpeg',                    alt: 'Nevada',                           caption: 'Nevada',                                                     width: 1600, height: 1000, rating: 5 },
  { id: 'sky1',                      src: '/images/photography/sky1.jpeg',                      alt: 'Sky',                              caption: 'Sky',                                                        width: 1600, height: 1000, rating: 5 },
  { id: 'flower3',                   src: '/images/photography/flower3.jpeg',                   alt: 'Flower 3',                         caption: 'Flower',                                                     width: 1600, height: 1000, rating: 5 },
  { id: 'dog',                       src: '/images/photography/dog.jpeg',                       alt: 'Dog',                              caption: 'Dog at Yellowstone National Park',                           width: 1600, height: 1000, rating: 5 },
  { id: 'mole',                      src: '/images/photography/mole.jpeg',                      alt: 'Mole',                             caption: 'Mole near Grand Prismatic Spring',                           width: 1600, height: 1000, rating: 5 },

  // ── Rating 4 ──────────────────────────────────────────────────────────────
  { id: 'bison_herd',                src: '/images/photography/bison_herd.jpeg',                alt: 'Bison Herd',                       caption: 'Bison Herd, Yellowstone National Park',                      width: 1600, height: 1000, rating: 4 },
  { id: 'aurora',                    src: '/images/photography/aurora.jpeg',                    alt: 'Aurora',                           caption: 'Aurora Borealis',                                            width: 1600, height: 1000, rating: 4 },
  { id: 'aurora2',                   src: '/images/photography/aurora2.jpeg',                   alt: 'Aurora 2',                         caption: 'Aurora Borealis',                                            width: 1600, height: 1000, rating: 4 },
  { id: 'aurora4',                   src: '/images/photography/aurora4.jpeg',                   alt: 'Aurora 4',                         caption: 'Aurora Borealis',                                            width: 1600, height: 1000, rating: 4 },
  { id: 'milkyway2',                 src: '/images/photography/milkyway2.jpeg',                 alt: 'Milky Way 2',                      caption: 'Milky Way',                                                  width: 1600, height: 1000, rating: 4 },
  { id: 'grand_prismatic_spring2',   src: '/images/photography/grand_prismatic_spring2.jpeg',   alt: 'Grand Prismatic Spring 2',         caption: 'Grand Prismatic Spring, Yellowstone National Park',         width: 1600, height: 1000, rating: 4 },
  { id: 'rock_arch',                 src: '/images/photography/rock_arch.jpeg',                 alt: 'Rock Arch',                        caption: 'Rock Arch',                                                  width: 1600, height: 1000, rating: 4 },
  { id: 'bison1',                    src: '/images/photography/bison1.jpeg',                    alt: 'Bison',                            caption: 'Bison in Yellowstone National Park',                         width: 1600, height: 1000, rating: 4 },
  { id: 'elk',                       src: '/images/photography/elk.jpeg',                       alt: 'Elk',                              caption: 'Elk in Yellowstone National Park',                            width: 1600, height: 1000, rating: 4 },
  { id: 'hawaii1',                   src: '/images/photography/hawaii1.jpeg',                   alt: 'Hawaii',                           caption: 'Hawaii',                                                     width: 1600, height: 1000, rating: 4 },
  { id: 'timpooneke_trail_utah',     src: '/images/photography/timpooneke_trail_utah.jpeg',     alt: 'Timpooneke Trail Utah',            caption: 'Timpooneke Trail, Utah',                                     width: 1600, height: 1000, rating: 4 },
  { id: 'toronto_city',              src: '/images/photography/toronto_city.jpeg',              alt: 'Toronto City',                     caption: 'Toronto City',                                               width: 1600, height: 1000, rating: 4 },
  { id: 'utah_rain',                 src: '/images/photography/utah_rain.jpeg',                 alt: 'Utah Rain',                        caption: 'Utah Rain',                                                  width: 1600, height: 1000, rating: 4 },
  { id: 'moon3',                     src: '/images/photography/moon3.jpeg',                     alt: 'Moon',                             caption: 'Moon',                                                       width: 1600, height: 1000, rating: 4 },
  { id: 'uw_rock_garden_snow_storm', src: '/images/photography/uw_rock_garden_snow_storm.jpeg', alt: 'UW Rock Garden Snow Storm',        caption: 'University of Waterloo Rock Garden during Snow Storm',       width: 1600, height: 1000, rating: 4 },

  // ── Rating 3 ──────────────────────────────────────────────────────────────
  { id: 'bison2',                    src: '/images/photography/bison2.jpeg',                    alt: 'Bison 2',                          caption: 'Bison in Yellowstone National Park',                         width: 1600, height: 1000, rating: 3 },
  { id: 'west_thumb_geyser_basin2',  src: '/images/photography/west_thumb_geyser_basin2.jpeg',  alt: 'West Thumb Geyser Basin 2',        caption: 'West Thumb Geyser Basin, Yellowstone National Park',         width: 1600, height: 1000, rating: 3 },
  { id: 'west_thumb_geyser_basin3',  src: '/images/photography/west_thumb_geyser_basin3.jpeg',  alt: 'West Thumb Geyser Basin 3',        caption: 'West Thumb Geyser Basin, Yellowstone National Park',         width: 1600, height: 1000, rating: 3 },
  { id: 'western_coneflower',        src: '/images/photography/western_coneflower.jpeg',        alt: 'Western Coneflower',               caption: 'Western Coneflower',                                         width: 1600, height: 1000, rating: 3 },
  { id: 'constellation_orion',       src: '/images/photography/constellation_orion.jpeg',       alt: 'Constellation Orion',              caption: 'Orion Constellation',                                        width: 1600, height: 1000, rating: 3 },
  { id: 'moon1',                     src: '/images/photography/moon1.jpeg',                     alt: 'Moon 1',                           caption: 'Moon',                                                       width: 1600, height: 1000, rating: 3 },
  { id: 'moon2',                     src: '/images/photography/moon2.jpeg',                     alt: 'Moon 2',                           caption: 'Moon',                                                       width: 1600, height: 1000, rating: 3 },
  { id: 'moon4',                     src: '/images/photography/moon4.jpeg',                     alt: 'Moon 4',                           caption: 'Moon',                                                       width: 1600, height: 1000, rating: 3 },
  { id: 'moon5',                     src: '/images/photography/moon5.jpeg',                     alt: 'Moon 5',                           caption: 'Moon',                                                       width: 1600, height: 1000, rating: 3 },
  { id: 'yellowstone_park_bison',    src: '/images/photography/yellowstone_park_bison.jpeg',    alt: 'Yellowstone Park Bison',           caption: 'Yellowstone National Park',                                  width: 1600, height: 1000, rating: 3 },
  { id: 'flower1',                   src: '/images/photography/flower1.jpeg',                   alt: 'Flower 1',                         caption: 'Flower',                                                     width: 1600, height: 1000, rating: 3 },
  { id: 'flower2',                   src: '/images/photography/flower2.jpeg',                   alt: 'Flower 2',                         caption: 'Flower',                                                     width: 1600, height: 1000, rating: 3 },
  { id: 'flower4',                   src: '/images/photography/flower4.jpeg',                   alt: 'Flower 4',                         caption: 'Flower',                                                     width: 1600, height: 1000, rating: 3 },
  { id: 'flower5',                   src: '/images/photography/flower5.jpeg',                   alt: 'Flower 5',                         caption: 'Flower',                                                     width: 1600, height: 1000, rating: 3 },

  // ── New Images ──────────────────────────────────────────────────────────────
  
];
