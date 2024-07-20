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
    heading: 'Govt Upper Primary School North Vazhakulam',
    subheading: 'Client Side Website For Schools',
    pltf: ['Html', 'CSS', 'JavaScript'],
    para: `
      The webpage for UP School North Vazhakulam is a dynamic and engaging platform built using HTML, CSS, and JavaScript. It effectively advertises the school's offerings, showcasing its vibrant community, academic excellence, and extracurricular activities. The homepage features an attractive layout with high-quality images and informative content sections. CSS is used to ensure a visually appealing and responsive design that looks great on both desktop and mobile devices. Interactive elements created with JavaScript, such as photo galleries, enhance user engagement and provide a seamless browsing experience. The webpage serves as a comprehensive resource for prospective students and parents, offering detailed information about the faculty, facilities, and contact details. 
      `,
  },
  {
    id: 2,
    name: 'BlckDrop',
    heading: 'BLCKDROP',
    subheading: 'A Shoe Shopping E-commerce Application',
    pltf: ['Flutter', 'Dart', 'Firebase'],
    para: `BlckDop is an innovative shoe shopping e-commerce application designed for footwear enthusiasts. Built using Flutter and created with Firebase as the backend, BlckDop offers a seamless and engaging shopping experience, allowing users to browse and purchase shoes from their favorite brands such as Puma, Nike, and Adidas. With its intuitive interface and user-friendly design, BlckDop ensures that customers can easily find and buy the latest and most stylish shoes on the market.`,
  },
  {
    id: 3,
    name: 'McDonald',
    heading: 'McDonald Desktop Application',
    subheading: 'A concept McDonald desktop application',
    pltf: ['C#', 'WPF', '.Net', 'Microsoft SQL Server'],
    para: `A concept McDonald's desktop application created with the .NET framework, WPF, and Microsoft SQL Server as the backend. It was my first project in the world of .NET and C#. Users can log in or create an account, order their favorite meals, and enjoy an immersive UI that captures the beloved motif of the McDonald's fast food chain. This project combines robust functionality with an engaging user experience, making it a perfect introduction to developing applications in .NET and C#.`,
  },
  {
    id: 4,
    name: 'Game hub',
    heading: 'Game Hub',
    pltf: ['Flutter', 'Dart'],
    subheading: 'All in one retro games application',
    para: `Game Hub is my first Android application created using Flutter, where users can enjoy playing retro games like Snake, Tetris, Minesweeper, and Flappy Bird. The app offers a nostalgic gaming experience with a modern touch, providing a fun and engaging way to relive classic games on your mobile device.`,
  },
  {
    id: 5,
    name: '95R',
    heading: '95R',
    subheading: 'A responsive website',
    pltf: ['Html', 'CSS', 'Javascript'],
    para: `
Developing a conceptual webpage for 95R, an imagined Australian decentralized solid waste management company, marked my first venture into web development during my internship with Terrific Minds. 95R's mission is to promote sustainable technologies to reduce waste and foster a greener planet. The responsive webpage featured an interactive overview of 95R's innovative waste management solutions, such as advanced recycling, composting, and community-driven programs, along with success stories and case studies. Ensuring the site adapted seamlessly to various devices, I enhanced user engagement and highlighted 95R's forward-thinking approach. This project provided valuable hands-on web development experience and deepened my appreciation for sustainable practices.
`,
  },
];
