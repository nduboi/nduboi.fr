export interface MediaItem {
  type: "image" | "video"
  src: string
  thumbnail?: string
  alt?: string
}

export interface Project {
  id: number
  title: string
  descriptionKey: string
  longDescriptionKey: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  media: MediaItem[]
  featuresKey: string[]
  challengesKey: string[]
  learningsKey: string[]
  status: "finished" | "inProgress" | "toImprove"
  improvementsKey?: string[]
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "MyRPG",
    descriptionKey: "project.myrpg.description",
    longDescriptionKey: "project.myrpg.longDescription",
    technologies: ["C", "CSFML", "Makefile", "Gaming", "Linux"],
    githubUrl: "https://github.com/nduboi/MyRPG",
    media: [
      {
        type: "video",
        src: "https://youtu.be/mEzrT54HUJE",
        thumbnail: "/screenshot/myRPG.1.svg?height=400&width=600",
        alt: "MyRPG Trailer",
      },
      {
        type: "image",
        src: "/screenshot/myRPG.2.svg?height=400&width=600",
        alt: "MyRPG Main Menu",
      },
      {
        type: "image",
        src: "/screenshot/myRPG.3.svg?height=400&width=600",
        alt: "MyRPG combat system",
      },
      {
        type: "image",
        src: "/screenshot/myRPG.4.svg?height=400&width=600",
        alt: "MyRPG inventory",
      },
    ],
    featuresKey: [
      "project.myrpg.feature1",
      "project.myrpg.feature2",
      "project.myrpg.feature3",
      "project.myrpg.feature4",
      "project.myrpg.feature5",
    ],
    challengesKey: [
      "project.myrpg.challenge1",
      "project.myrpg.challenge2",
      "project.myrpg.challenge3",
      "project.myrpg.challenge4",
    ],
    learningsKey: [
      "project.myrpg.learning1",
      "project.myrpg.learning2",
      "project.myrpg.learning3",
      "project.myrpg.learning4",
    ],
    status: "finished",
  },
  {
    id: 2,
    title: "Arcade",
    descriptionKey: "project.arcade.description",
    longDescriptionKey: "project.arcade.longDescription",
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
    media: [
      {
        type: "image",
        src: "/screenshot/arcade.1.svg?height=400&width=600",
        alt: "Arcade main interface",
      },
      {
        type: "image",
        src: "/screenshot/arcade.2.svg?height=400&width=600",
        alt: "Arcade game selection",
      },
            {
        type: "image",
        src: "/screenshot/arcade.3.svg?height=400&width=600",
        alt: "Arcade main interface",
      },
      {
        type: "image",
        src: "/screenshot/arcade.4.svg?height=400&width=600",
        alt: "Arcade game selection",
      },
            {
        type: "image",
        src: "/screenshot/arcade.5.svg?height=400&width=600",
        alt: "Arcade main interface",
      },
    ],
    featuresKey: [
      "project.arcade.feature1",
      "project.arcade.feature2",
      "project.arcade.feature3",
      "project.arcade.feature4",
      "project.arcade.feature5",
    ],
    challengesKey: [
      "project.arcade.challenge1",
      "project.arcade.challenge2",
      "project.arcade.challenge3",
      "project.arcade.challenge4",
    ],
    learningsKey: [
      "project.arcade.learning1",
      "project.arcade.learning2",
      "project.arcade.learning3",
      "project.arcade.learning4",
    ],
    status: "finished",
  },
  {
    id: 3,
    title: "Gnu Krell Monitors",
    descriptionKey: "project.gnu_krell_monitors.description",
    longDescriptionKey: "project.gnu_krell_monitors.longDescription",
    technologies: ["C++", "SFML", "Ncurses", "OS Manager", "Linux"],
    githubUrl: "https://github.com/nduboi/Gnu-Krell-Monitors",
    media: [
      {
        type: "image",
        src: "/screenshot/gnu_krell_monitors.1.svg?height=400&width=600",
        alt: "Gnu Krell Monitors interface SFML",
      },
      {
        type: "image",
        src: "/screenshot/gnu_krell_monitors.2.svg?height=400&width=600",
        alt: "Gnu Krell Monitors command Ncurses",
      },
    ],
    featuresKey: [
      "project.gnu_krell_monitors.feature1",
      "project.gnu_krell_monitors.feature2",
      "project.gnu_krell_monitors.feature3",
      "project.gnu_krell_monitors.feature4",
      "project.gnu_krell_monitors.feature5",
    ],
    challengesKey: [
      "project.gnu_krell_monitors.challenge1",
      "project.gnu_krell_monitors.challenge2",
      "project.gnu_krell_monitors.challenge3",
      "project.gnu_krell_monitors.challenge4",
    ],
    learningsKey: [
      "project.gnu_krell_monitors.learning1",
      "project.gnu_krell_monitors.learning2",
      "project.gnu_krell_monitors.learning3",
      "project.gnu_krell_monitors.learning4",
    ],
    status: "finished",
  },
  {
    id: 4,
    title: "42sh",
    descriptionKey: "project.42sh.description",
    longDescriptionKey: "project.42sh.longDescription",
    technologies: ["C", "Shell Scripting", "Linux"],
    githubUrl: "https://github.com/nduboi/42sh",
    media: [
      {
        type: "image",
        src: "/screenshot/42sh.1.svg?height=400&width=600",
        alt: "42sh terminal interface",
      },
      {
        type: "image",
        src: "/screenshot/42sh.2.svg?height=400&width=600",
        alt: "42sh command execution",
      },
    ],
    featuresKey: [
      "project.42sh.feature1",
      "project.42sh.feature2",
      "project.42sh.feature3",
      "project.42sh.feature4",
      "project.42sh.feature5",
    ],
    challengesKey: [
      "project.42sh.challenge1",
      "project.42sh.challenge2",
      "project.42sh.challenge3",
      "project.42sh.challenge4",
    ],
    learningsKey: [
      "project.42sh.learning1",
      "project.42sh.learning2",
      "project.42sh.learning3",
      "project.42sh.learning4",
    ],
    status: "toImprove",
    improvementsKey: [
      "project.42sh.improvement1",
      "project.42sh.improvement2",
      "project.42sh.improvement3",
      "project.42sh.improvement4",
      "project.42sh.improvement5",
    ],
  },
  {
    id: 5,
    title: "Weserver CPP",
    descriptionKey: "project.weservercpp.description",
    longDescriptionKey: "project.weservercpp.longDescription",
    technologies: ["C++", "Boost", "Networking"],
    githubUrl: "https://github.com/nduboi/WebserverCPP",
    media: [
      {
        type: "image",
        src: "/screenshot/webserver.1.svg?height=400&width=600",
        alt: "Webserver CPP img 1",
      },
    ],
    featuresKey: [
      "project.weservercpp.feature1",
      "project.weservercpp.feature2",
      "project.weservercpp.feature3",
    ],
    challengesKey: [
      "project.weservercpp.challenge1",
      "project.weservercpp.challenge2",
      "project.weservercpp.challenge3",
      "project.weservercpp.challenge4",
      "project.weservercpp.challenge5",
    ],
    learningsKey: [
      "project.weservercpp.learning1",
      "project.weservercpp.learning2",
      "project.weservercpp.learning3",
    ],
    status: "inProgress",
  },
  {
    id: 6,
    title: "Truth or Dare",
    descriptionKey: "project.truthordare.description",
    longDescriptionKey: "project.truthordare.longDescription",
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
    media: [
      {
        type: "image",
        src: "/screenshot/truthordare.1.svg?height=400&width=200",
        alt: "Truth or Dare menu",
      },
      {
        type: "image",
        src: "/screenshot/truthordare.2.svg?height=400&width=200",
        alt: "Truth or Dare add a player",
      },
      {
        type: "image",
        src: "/screenshot/truthordare.3.svg?height=400&width=200",
        alt: "Truth or Dare truth or dare",
      },
      {
        type: "image",
        src: "/screenshot/truthordare.4.svg?height=400&width=200",
        alt: "Truth or Dare question",
      },
    ],
    featuresKey: [
      "project.truthordare.feature1",
      "project.truthordare.feature2",
      "project.truthordare.feature3",
      "project.truthordare.feature4",
      "project.truthordare.feature5",
      "project.truthordare.feature6",
    ],
    challengesKey: [
      "project.truthordare.challenge1",
      "project.truthordare.challenge2",
      "project.truthordare.challenge3",
      "project.truthordare.challenge4",
      "project.truthordare.challenge5",
    ],
    learningsKey: [
      "project.truthordare.learning1",
      "project.truthordare.learning2",
      "project.truthordare.learning3",
      "project.truthordare.learning4",
      "project.truthordare.learning5",
    ],
    status: "inProgress",
  },
  {
    id: 7,
    title: "Multichat",
    descriptionKey: "project.multichat.description",
    longDescriptionKey: "project.multichat.longDescription",
    technologies: ["NodeJS", "SocketIO", "Networking", "RTMP"],
    githubUrl: "https://github.com/nduboi/Multichat",
    media: [
      {
        type: "image",
        src: "/screenshot/multichat.1.svg?height=400&width=600",
        alt: "Multichat interface",
      },
      {
        type: "image",
        src: "/screenshot/multichat.2.svg?height=400&width=600",
        alt: "Multichat real-time communication init",
      },
      {
        type: "image",
        src: "/screenshot/multichat.3.svg?height=400&width=600",
        alt: "Multichat RTMP streaming",
      },
      {
        type: "image",
        src: "/screenshot/multichat.4.svg?height=400&width=600",
        alt: "Multichat RTMP streaming",
      },
    ],
    featuresKey: [
      "project.multichat.feature1",
      "project.multichat.feature2",
      "project.multichat.feature3",
      "project.multichat.feature4",
      "project.multichat.feature5",
      "project.multichat.feature6",
    ],
    challengesKey: [
      "project.multichat.challenge1",
      "project.multichat.challenge2",
      "project.multichat.challenge3",
      "project.multichat.challenge4",
      "project.multichat.challenge5",
    ],
    learningsKey: [
      "project.multichat.learning1",
      "project.multichat.learning2",
      "project.multichat.learning3",
      "project.multichat.learning4",
      "project.multichat.learning5",
    ],
    status: "toImprove",
    improvementsKey: [
      "project.multichat.improvement1",
      "project.multichat.improvement2",
      "project.multichat.improvement3",
      "project.multichat.improvement4",
      "project.multichat.improvement5",
      "project.multichat.improvement6",
    ],
  },
  {
    id: 8,
    title: "Nduboi.fr",
    descriptionKey: "project.nduboi.description",
    longDescriptionKey: "project.nduboi.longDescription",
    technologies: ["React", "TypeScript", "TailwindCSS", "NextJS"],
    githubUrl: "https://github.com/nduboi/nduboi.fr",
    liveUrl: "https://nduboi.fr",
    media: [
      {
        type: "image",
        src: "/screenshot/nduboi.fr.1.svg?height=400&width=600",
        alt: "Nduboi.fr img 1",
      },
      {
        type: "image",
        src: "/screenshot/nduboi.fr.2.svg?height=400&width=600",
        thumbnail: "/placeholder.svg?height=400&width=600",
        alt: "Nduboi.fr img 2",
      },
    ],
    featuresKey: [
      "project.nduboi.feature1",
      "project.nduboi.feature2",
      "project.nduboi.feature3",
      "project.nduboi.feature4",
      "project.nduboi.feature5",
      "project.nduboi.feature6",
    ],
    challengesKey: [
      "project.nduboi.challenge1",
      "project.nduboi.challenge2",
      "project.nduboi.challenge3",
      "project.nduboi.challenge4",
      "project.nduboi.challenge5",
    ],
    learningsKey: [
      "project.nduboi.learning1",
      "project.nduboi.learning2",
      "project.nduboi.learning3",
      "project.nduboi.learning4",
      "project.nduboi.learning5",
    ],
    status: "inProgress",
  },
]