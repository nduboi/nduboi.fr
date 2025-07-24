export interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  images: string[]
  features: string[]
  challenges: string[]
  learnings: string[]
  status: "Finished" | "In Progress" | "To Improve"
  improvements?: string[]
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "MyRPG",
    description: "A complete RPG game with CSFML for Linux",
    longDescription:
      "MyRPG is a complete role-playing game developed in C with the CSFML library. This project represents several months of development and includes a combat system, inventory management, quest system, and a fully customized graphical interface.",
    technologies: ["C", "CSFML", "Linux"],
    githubUrl: "https://github.com/nduboi/MyRPG",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    features: [
      "Turn-based combat system",
      "Advanced inventory management",
      "Dynamic quest system",
      "Intuitive graphical interface",
      "Game save and load functionality",
    ],
    challenges: [
      "Graphics performance optimization",
      "Memory management in C",
      "Modular code architecture",
      "Precise collision system",
    ],
    learnings: [
      "Graphics programming with CSFML",
      "Advanced memory management",
      "Video game architecture",
      "Performance optimization",
    ],
    status: "Finished",
  },
  {
    id: 2,
    title: "Arcade",
    description: "An application where you can change display-lib and game on run-time",
    longDescription:
      "Arcade is an ambitious project that allows dynamic switching of graphics libraries and games during runtime. This project demonstrates advanced modular architecture with support for multiple graphics libraries and games.",
    technologies: [
      "C++",
      "Dynamic library",
      "CMAKE",
      "SFML",
      "Ncurses",
      "Allegro",
      "SDL2",
      "QT5",
      "Minesweeper",
      "Snake",
      "Pacman",
      "Nibbler",
      "Linux",
    ],
    githubUrl: "https://github.com/nduboi/Arcade",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    features: [
      "Dynamic graphics library switching",
      "Multiple game support",
      "Modular architecture with plugins",
      "Adaptive user interface",
      "Persistent scoring system",
    ],
    challenges: [
      "Dynamic library management",
      "Flexible plugin architecture",
      "Cross-platform compatibility",
      "Different graphics format handling",
    ],
    learnings: [
      "Advanced object-oriented programming",
      "Dynamic library management",
      "Plugin architecture",
      "Multiple graphics APIs integration",
    ],
    status: "Finished",
  },
  {
    id: 3,
    title: "42sh",
    description: "A shell with C for Linux",
    longDescription:
      "42sh is a complete implementation of a Unix shell in C. This project reproduces the main functionalities of bash, including command execution, pipe management, redirections, and environment variables.",
    technologies: ["C", "Shell Scripting", "Linux"],
    githubUrl: "https://github.com/nduboi/42sh",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    features: [
      "System command execution",
      "Pipe and redirection management",
      "Environment variables",
      "Command history",
      "Basic auto-completion",
    ],
    challenges: [
      "Complex command parsing",
      "Child process management",
      "Pipe implementation",
      "System signal handling",
    ],
    learnings: [
      "System programming in C",
      "Unix process management",
      "Parsing and lexical analysis",
      "Unix shell architecture",
    ],
    status: "To Improve",
    improvements: [
      "Add alias support",
      "Improve auto-completion",
      "Implement persistent history",
      "Add syntax highlighting",
      "Optimize parsing performance",
    ],
  },
  {
    id: 4,
    title: "Truth or Dare",
    description: "A full true or dare game for online parties",
    longDescription:
      "Truth or Dare is an interactive web application designed to liven up parties with friends. The application offers customizable challenges, a point system, and a modern, responsive interface with real-time multiplayer support.",
    technologies: [
      "NodeJS",
      "HTML",
      "TailwindCSS",
      "SQL",
      "SocketIO",
      "Next.js",
      "API",
      "React",
      "TypeScript",
      "Docker",
    ],
    githubUrl: "https://github.com/nduboi/Truth-or-Dare",
    liveUrl: "https://av.nduboi.fr",
    images: ["/placeholder.svg?height=400&width=200", "/placeholder.svg?height=400&width=300"],
    features: [
      "Modern and responsive user interface",
      "Customizable challenges by category",
      "Point system and leaderboards",
      "Real-time multiplayer mode",
      "Extensible challenge database",
      "Authentication system",
    ],
    challenges: [
      "Real-time multiplayer synchronization",
      "Intuitive user interface",
      "User session management",
      "Mobile and responsive optimization",
      "Docker deployment",
    ],
    learnings: [
      "Modern full-stack web development",
      "REST API architecture",
      "WebSockets and real-time communication",
      "Deployment and containerization",
      "Modern user interface design",
    ],
    status: "In Progress",
  },
  {
    id: 5,
    title: "Multichat",
    description: "A project that manipulates socket and other protocols like RTMP",
    longDescription:
      "Multichat is an advanced communication application that implements multiple network protocols. The project explores real-time communications, socket management, and integration of protocols like RTMP for streaming.",
    technologies: ["NodeJS", "SocketIO", "Networking", "RTMP"],
    githubUrl: "https://github.com/nduboi/Multichat",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    features: [
      "Real-time multi-user communication",
      "Multi-protocol support (WebSocket, RTMP)",
      "TCP/UDP socket management",
      "RTMP streaming interface",
      "Multi-threaded architecture",
      "Chat room system",
    ],
    challenges: [
      "Network protocol implementation",
      "Concurrency and threading management",
      "Network performance optimization",
      "Communication security",
      "RTMP protocol integration",
    ],
    learnings: [
      "Advanced network programming",
      "Real-time communication protocols",
      "Distributed architecture",
      "Network performance optimization",
      "Streaming and multimedia protocols",
    ],
    status: "To Improve",
    improvements: [
      "Add communication encryption",
      "Implement robust authentication system",
      "Optimize bandwidth management",
      "Add support for new protocols",
      "Improve user interface",
      "Add message persistence",
    ],
  },
  {
    id: 6,
    title: "Nduboi.fr",
    description: "A personal portfolio, using modern techno.",
    longDescription:
      "My personal portfolio developed with modern web technologies. This site showcases my projects, skills, and experiences in an interactive and responsive way, with modern design and smooth animations.",
    technologies: ["React", "TypeScript", "TailwindCSS", "NextJS"],
    githubUrl: "https://github.com/nduboi/nduboi.fr",
    liveUrl: "https://nduboi.fr",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    features: [
      "Modern and responsive design",
      "Smooth animations with Framer Motion",
      "Automatic dark/light mode",
      "Interactive projects section",
      "Functional contact form",
      "SEO optimization",
    ],
    challenges: [
      "Responsive design on all devices",
      "Performance optimization",
      "Smooth and natural animations",
      "Web accessibility",
      "Deployment and hosting",
    ],
    learnings: [
      "Next.js framework and modern React",
      "Advanced styling with TailwindCSS",
      "Animations with Framer Motion",
      "Web optimization and SEO",
      "Modern UX/UI design",
    ],
    status: "In Progress",
  },
]
