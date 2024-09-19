export interface Content {
  id: number;
  title: string;
  para: string;
  tech: string[];
  link?: string;
}

export let contentList: Content[] = [
  {
    id: 0,
    title: 'Govt Up School North Vazhakulam',
    tech: ['Html', 'CSS', 'JavaScript'],
    link: 'https://arjkre.github.io/UP_School/index.html',
    para: `The UP School North Vazhakulam webpage highlights the school's community, academic excellence, and extracurriculars with a responsive design, high-quality images, and interactive elements, providing detailed information for prospective students and parents.`,
  },
  {
    id: 1,
    title: '95R',
    tech: ['Html', 'CSS', 'Javascript'],
    para: `A dynamic, responsive website for 95R, a conceptual Australian waste management company, highlighting innovative sustainability solutions and impactful case studies, which sharpened my web development skills and reinforced my passion for using technology to drive environmental change.`,
  },
  {
    id: 2,
    title: 'McDonald Desktop Application',
    tech: ['C#', 'WPF', '.Net', 'Microsoft SQL Server'],
    para: `A concept McDonald's desktop application with WPF .Net Framework & Microsoft SQL Server backend, featuring user login, meal ordering, and an immersive UI reflecting McDonald's motif, combining robust functionality with an engaging user experience.`,
  },
  {
    id: 3,
    title: 'BlckDrop',
    tech: ['Flutter', 'Dart', 'Firebase'],
    para: `BlckDop is an e-commerce app for footwear enthusiasts, providing a seamless shopping experience with an intuitive interface for browsing and purchasing shoes from top brands like Puma, Nike, and Adidas.`,
  },
  {
    id: 4,
    title: 'Game hub',
    tech: ['Flutter', 'Dart'],
    para: `Game Hub is my first Android app, offering a nostalgic yet modern experience with classic games like Snake, Tetris, Minesweeper, and Flappy Bird on mobile devices.`,
  },
];
