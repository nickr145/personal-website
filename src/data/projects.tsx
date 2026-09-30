import * as strings from "./projectStrings";
import efficientTokenizerImage from "../data/images/efficient-tokenizer.webp";
import fit4MeImage from "../data/images/fit4me.png";
import skystoneImage from "../data/images/skystone.png";
import lazLogo from "../data/images/laz-logo.png";
import expTrackerImage from "../data/images/expense-tracker.webp";
import rrpsImage from "../data/images/rrps.png";
import chessImage from "../data/images/chess.jpg";
import newsedgeImage from "../data/images/newsedge.webp";
import openLineImage from "../data/images/openline.webp";
import citymindImage from "../data/images/citymind.webp";
import fincragImage from "../data/images/fincrag.jpg";
import aMGSPImage from "../data/images/aMGSP.jpg";
import dEDOSImage from "../data/images/dEDOS.jpg";

export type Project = {
  title: string;
  description?: string;
  tags: string[];
  link?: string;
  repo?: string;
  writingSlug?: string;
  image?: string;
  date: string;
};

const MONTH_ABBREVIATIONS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatProjectDate(date: string): string {
  const [year, month] = date.split("-").map(Number);
  return `${MONTH_ABBREVIATIONS[month - 1]} ${year}`;
}

export const projects: Project[] = [
  {
    title: strings.dEDOSTitle,
    description: strings.dEDOSDescription,
    tags: strings.dEDOSTags,
    repo: strings.dEDOSRepo,
    image: dEDOSImage,
    date: "2026-09",
  },
  {
    title: strings.aMGSPTitle,
    description: strings.aMGSPDescription,
    tags: strings.aMGSPTags,
    repo: strings.aMGSPRepo,
    image: aMGSPImage,
    date: "2026-09",
  },
  {
    title: strings.finCragTitle,
    description: strings.finCragDescription,
    tags: strings.finCragTags,
    repo: strings.finCragRepo,
    image: fincragImage,
    date: "2026-08",
  },
  {
    title: strings.efficientTokenizerTitle,
    description: strings.efficientTokenizerDescription,
    tags: strings.efficientTokenizerTags,
    writingSlug: 'efficient-tokenizer',
    image: efficientTokenizerImage,
    date: "2026-05",
  },
  {
    title: strings.newsEdgeTitle,
    description: strings.newsEdgeDescription,
    tags: strings.newsEdgeTags,
    repo: strings.newsEdgeRepo,
    image: newsedgeImage,
    date: "2026-08",
  },
  {
    title: strings.cityMindTitle,
    description: strings.cityMindDescription,
    tags: strings.cityMindTags,
    repo: strings.cityMindRepo,
    image: citymindImage,
    date: "2026-03",
  },
  {
    title: strings.openLineTitle,
    description: strings.openLineDescription,
    tags: strings.openLineTags,
    repo: strings.openLineRepo,
    image: openLineImage,
    date: "2026-03",
  },
  {
    title: strings.rrpsTitle,
    description: strings.rrpsDescription,
    tags: strings.rrpsTags,
    repo: strings.rrpsRepo,
    image: rrpsImage,
    date: "2025-12",
  },
  {
    title: strings.fit4MeTitle,
    description: strings.fit4MeDescription,
    tags: strings.fit4MeTags,
    repo: strings.fit4MeRepo,
    image: fit4MeImage,
    date: "2025-09",
  },
  {
    title: strings.cropTitle,
    description: strings.cropDescription,
    tags: strings.cropTags,
    repo: strings.cropRepo,
    image: lazLogo,
    date: "2025-07",
  },
  {
    title: strings.skystonesTitle,
    description: strings.skystonesDescription,
    tags: strings.skystonesTags,
    repo: strings.skystonesRepo,
    image: skystoneImage,
    date: "2024-11",
  },
  {
    title: strings.chessTitle,
    description: strings.chessDescription,
    tags: strings.chessTags,
    repo: strings.chessRepo,
    image: chessImage,
    date: "2022-12",
  },
  {
    title: strings.expTrackerTitle,
    description: strings.expTrackerDescription,
    tags: strings.expTrackerTags,
    repo: strings.expTrackerRepo,
    image: expTrackerImage,
    date: "2024-12",
  },
  // {
  //   title: strings.pwgenTitle,
  //   description: strings.pwgenDescription,
  //   tags: strings.pwgenTags,
  //   repo: strings.pwgenRepo,
  //   date: "2024-01",
  // },
].sort((a, b) => b.date.localeCompare(a.date));
