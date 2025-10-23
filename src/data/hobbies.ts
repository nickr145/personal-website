export type HobbyImage = {
  id: string;
  category: 'sketch' | 'photography';
  src: string; // public path
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

// Placeholder entries — replace with your real images in public/images/hobbies/... 
export const hobbies: HobbyImage[] = [
  {
    id: 'IMG_7574',
    category: 'sketch',
    src: '/images/hobbies/sketches/IMG_7574.jpg',
    alt: 'Sketch IMG_7574',
    caption: '',
    width: 1200,
    height: 900,
  },
  {
    id: 'IMG_7610',
    category: 'sketch',
    src: '/images/hobbies/sketches/IMG_7610.jpg',
    alt: 'Sketch IMG_7610',
    caption: '',
    width: 1200,
    height: 900,
  },
  {
    id: 'IMG_7806',
    category: 'sketch',
    src: '/images/hobbies/sketches/IMG_7806.jpg',
    alt: 'Sketch IMG_7806',
    caption: '',
    width: 1200,
    height: 900,
  },
  {
    id: 'IMG_8446',
    category: 'sketch',
    src: '/images/hobbies/sketches/IMG_8446.jpg',
    alt: 'Sketch IMG_8446',
    caption: '',
    width: 1200,
    height: 900,
  },
  {
    id: 'IMG_8787',
    category: 'sketch',
    src: '/images/hobbies/sketches/IMG_8787.jpg',
    alt: 'Sketch IMG_8787',
    caption: '',
    width: 1200,
    height: 900,
  }
];
