import * as strings from "./projectStrings";

export type Project = {
  title: string;
  description?: string;
  tags: string[];
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: strings.fit4MeTitle,
    description: strings.fit4MeDescription,
    tags: strings.fit4MeTags,
    repo: strings.fit4MeRepo
  },
  {
    title: strings.cropTitle,
    description: strings.cropDescription,
    tags: strings.cropTags,
    repo: strings.cropRepo
  },
  {
    title: strings.skystonesTitle,
    description: strings.skystonesDescription,
    tags: strings.skystonesTags,
    repo: strings.skystonesRepo
  },
  {
    title: strings.pwgenTitle,
    description: strings.pwgenDescription,
    tags: strings.pwgenTags,
    repo: strings.pwgenRepo
  },
];
