import * as strings from "./projectStrings";
import fit4MeImage from "../data/images/fit4me.png";
import skystoneImage from "../data/images/skystone.png";
import lazLogo from "../data/images/laz-logo.png";
import expTrackerImage from "../data/images/expense-tracker.png";
import rrpsImage from "../data/images/rrps.png";
import chessImage from "../data/images/chess.jpg";
import newsedgeImage from "../data/images/newsedge.png";
import openLineImage from "../data/images/openline.png";
import citymindImage from "../data/images/citymind.png";

export type Project = {
  title: string;
  description?: string;
  tags: string[];
  link?: string;
  repo?: string;
  image?: string;
  year: number;
};

export const projects: Project[] = [
  {
    title: strings.newsEdgeTitle,
    description: strings.newsEdgeDescription,
    tags: strings.newsEdgeTags,
    repo: strings.newsEdgeRepo,
    image: newsedgeImage,
    year: 2026,
  },
  {
    title: strings.cityMindTitle,
    description: strings.cityMindDescription,
    tags: strings.cityMindTags,
    repo: strings.cityMindRepo,
    image: citymindImage,
    year: 2026,
  },
  {
    title: strings.openLineTitle,
    description: strings.openLineDescription,
    tags: strings.openLineTags,
    repo: strings.openLineRepo,
    image: openLineImage,
    year: 2026,
  },
  {
    title: strings.rrpsTitle,
    description: strings.rrpsDescription,
    tags: strings.rrpsTags,
    repo: strings.rrpsRepo,
    image: rrpsImage,
    year: 2025,
  },
  {
    title: strings.fit4MeTitle,
    description: strings.fit4MeDescription,
    tags: strings.fit4MeTags,
    repo: strings.fit4MeRepo,
    image: fit4MeImage,
    year: 2025,
  },
  {
    title: strings.cropTitle,
    description: strings.cropDescription,
    tags: strings.cropTags,
    repo: strings.cropRepo,
    image: lazLogo,
    year: 2025,
  },
  {
    title: strings.skystonesTitle,
    description: strings.skystonesDescription,
    tags: strings.skystonesTags,
    repo: strings.skystonesRepo,
    image: skystoneImage,
    year: 2024,
  },
  {
    title: strings.chessTitle,
    description: strings.chessDescription,
    tags: strings.chessTags,
    repo: strings.chessRepo,
    image: chessImage,
    year: 2023,
  },
  {
    title: strings.expTrackerTitle,
    description: strings.expTrackerDescription,
    tags: strings.expTrackerTags,
    repo: strings.expTrackerRepo,
    image: expTrackerImage,
    year: 2024,
  },
  // {
  //   title: strings.pwgenTitle,
  //   description: strings.pwgenDescription,
  //   tags: strings.pwgenTags,
  //   repo: strings.pwgenRepo,
  //   year: 2024,
  // },
].sort((a, b) => b.year - a.year);
