import * as strings from "./projectStrings";
import fit4MeImage from "../data/images/fit4me.png";
import skystoneImage from "../data/images/skystone.png";
import lazLogo from "../data/images/laz-logo.png";
import expTrackerImage from "../data/images/expense-tracker.png";
import rrpsImage from "../data/images/rrps.png";
import chessImage from "../data/images/chess.jpg";

export type Project = {
  title: string;
  description?: string;
  tags: string[];
  link?: string;
  repo?: string;
  image?: string; /* optional image path (square format) */
};

export const projects: Project[] = [
  {
    title: strings.rrpsTitle,
    description: strings.rrpsDescription,
    tags: strings.rrpsTags,
    repo: strings.rrpsRepo,
    image: rrpsImage
  },
  {
    title: strings.fit4MeTitle,
    description: strings.fit4MeDescription,
    tags: strings.fit4MeTags,
    repo: strings.fit4MeRepo,
    image: fit4MeImage
  },
  {
    title: strings.cropTitle,
    description: strings.cropDescription,
    tags: strings.cropTags,
    repo: strings.cropRepo,
    image: lazLogo
  },
  {
    title: strings.skystonesTitle,
    description: strings.skystonesDescription,
    tags: strings.skystonesTags,
    repo: strings.skystonesRepo,
    image: skystoneImage
  },
  {
    title: strings.chessTitle,
    description: strings.chessDescription,
    tags: strings.chessTags,
    repo: strings.chessRepo,
    image: chessImage
  },
  {
    title: strings.expTrackerTitle,
    description: strings.expTrackerDescription,
    tags: strings.expTrackerTags,
    repo: strings.expTrackerRepo,
    image: expTrackerImage
  },
  {
    title: strings.pwgenTitle,
    description: strings.pwgenDescription,
    tags: strings.pwgenTags,
    repo: strings.pwgenRepo,
  },
];
