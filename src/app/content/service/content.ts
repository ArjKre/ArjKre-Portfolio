export interface Content {
  id: number;
  title: string;
  subtitle?: string;
  link?: string;
  para: string;
  tech: string[];
  photo?: string;
}

export let contentList: Content[] = [
  {
    id: 0,
    title: 'Govt Up School North Vazhakulam',
    subtitle: 'Client Side Website For Schools',
    tech:['Html', 'CSS', 'JavaScript'],
    para:`The UP School North Vazhakulam webpage showcases the school's vibrant community, academic excellence, and extracurricular activities. It features an attractive layout with high-quality images, responsive design, and interactive elements like photo galleries. The site provides detailed information for prospective students and parents about the faculty, facilities, and contact details.`,
  },
  {
    id: 1,
    title: 'McDonald Desktop Application',
    subtitle: 'A concept McDonald desktop application',
    tech: ['C#', 'WPF', '.Net', 'Microsoft SQL Server'],
    para:`A concept McDonald's desktop application, created with Microsoft SQL Server as the backend, was my first project. Users can log in or create an account, order meals, and enjoy an immersive UI reflecting McDonald's motif. This project combines robust functionality with an engaging user experience, serving as an excellent introduction to application development.`,
  },
  {
    id: 2,
    title: '95R',
    subtitle: 'A responsive website',
    tech: ['Html', 'CSS', 'Javascript'],
    para:`During my internship with Terrific Minds, I developed a conceptual webpage for 95R, an imagined Australian decentralized solid waste management company. The responsive site showcased 95R's mission to promote sustainable technologies, featuring innovative waste management solutions, success stories, and case studies. This project provided valuable web development experience and deepened my appreciation for sustainable practices.`,
  },
  {
    id: 3,
    title: 'BlckDrop',
    subtitle: 'A Shoe Shopping E-commerce Application',
    tech: ['Flutter', 'Dart', 'Firebase'],
    para:`BlckDop is an innovative e-commerce app for footwear enthusiasts, offering a seamless shopping experience. Users can browse and purchase shoes from top brands like Puma, Nike, and Adidas. Its intuitive interface and user-friendly design make finding and buying the latest stylish shoes easy.`,
  },
  {
    id: 4,
    title: 'Game hub',
    subtitle: 'All-in-One retro games application',
    tech: ['Flutter', 'Dart'],
    para:`Game Hub is my first Android application, where users can enjoy retro games like Snake, Tetris, Minesweeper, and Flappy Bird. The app offers a nostalgic gaming experience with a modern touch, providing a fun and engaging way to relive classic games on mobile devices.`,
  }
];
