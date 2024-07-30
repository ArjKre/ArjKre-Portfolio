export interface MenuItem {
  id: number;
  name: string;
  title?: string;
  heading?: string;
  subheading?: string;
  pltf?: string[];
  para?: string;
  photo?: string;
  video?: string;
}

export let menuList: MenuItem[] = [
  { id: 0, name: 'About' },
  {
    id: 1,
    name: 'UP School',
    heading: 'Govt Up School North Vazhakulam',
    subheading: 'Client Side Website For Schools',
    pltf: ['Html', 'CSS', 'JavaScript'],
    para: `
The UP School North Vazhakulam webpage showcases the school's vibrant community, academic excellence, and extracurricular activities. It features an attractive layout with high-quality images, responsive design, and interactive elements like photo galleries. The site provides detailed information for prospective students and parents about the faculty, facilities, and contact details.
      `,
  },
  {
    id: 2,
    name: 'BlckDrop',
    heading: 'BLCKDROP',
    subheading: 'A Shoe Shopping E-commerce Application',
    pltf: ['Flutter', 'Dart', 'Firebase'],
    para: `BlckDop is an innovative e-commerce app for footwear enthusiasts, offering a seamless shopping experience. Users can browse and purchase shoes from top brands like Puma, Nike, and Adidas. Its intuitive interface and user-friendly design make finding and buying the latest stylish shoes easy.`,
  },
  {
    id: 3,
    name: 'McDonald',
    heading: 'McDonald Desktop Application',
    subheading: 'A concept McDonald desktop application',
    pltf: ['C#', 'WPF', '.Net', 'Microsoft SQL Server'],
    para: `A concept McDonald's desktop application, created with Microsoft SQL Server as the backend, was my first project. Users can log in or create an account, order meals, and enjoy an immersive UI reflecting McDonald's motif. This project combines robust functionality with an engaging user experience, serving as an excellent introduction to application development.`,
  },
  {
    id: 4,
    name: 'Game hub',
    heading: 'Game Hub',
    pltf: ['Flutter', 'Dart'],
    subheading: 'All-in-One retro games application',
    para: `Game Hub is my first Android application, where users can enjoy retro games like Snake, Tetris, Minesweeper, and Flappy Bird. The app offers a nostalgic gaming experience with a modern touch, providing a fun and engaging way to relive classic games on mobile devices.`,
  },
  {
    id: 5,
    name: '95R',
    heading: '95R',
    subheading: 'A responsive website',
    pltf: ['Html', 'CSS', 'Javascript'],
    para: `
During my internship with Terrific Minds, I developed a conceptual webpage for 95R, an imagined Australian decentralized solid waste management company. The responsive site showcased 95R's mission to promote sustainable technologies, featuring innovative waste management solutions, success stories, and case studies. This project provided valuable web development experience and deepened my appreciation for sustainable practices.
`,
  },
];
