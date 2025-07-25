"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "fr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Dictionnaires de traductions
const translations = {
  fr: {
    // Navigation
    "nav.about": "À propos",
    "nav.projects": "Projets",
    "nav.contact": "Contact",
    "nav.back": "Retour",

    // Hero Section
    "hero.title": "Salut, je suis",
    "hero.description1": "Je suis actuellement étudiant à Epitech, spécialisé en développement informatique.",
    "hero.description2":
      "En dehors de mes études, j'aime la natation, la course à pied, la plongée sous-marine et explorer l'univers spatial.",

    // Projects Section
    "projects.title": "Mes Projets",
    "projects.viewAll": "Voir tous mes projets",
    "projects.myProjects": "Mes Projets",
    "projects.overview": "Aperçu du projet",
    "projects.features": "Fonctionnalités",
    "projects.challenges": "Défis",
    "projects.learnings": "Apprentissages",
    "projects.toImprove": "À Améliorer",
    "projects.viewSite": "Voir le site",

    // Project Descriptions
    "project.myrpg.description": "Un jeu RPG complet développé avec CSFML pour Linux",
    "project.arcade.description":
      "Une application où vous pouvez changer les bibliothèques d'affichage et les jeux en cours d'exécution",
    "project.42sh.description": "Un shell développé en C pour Linux",
    "project.truthordare.description": "Un jeu d'action ou vérité complet pour les soirées en ligne",
    "project.multichat.description": "Un projet manipulant les sockets et protocoles comme RTMP",
    "project.nduboi.description": "Un portfolio personnel utilisant des technologies modernes",

    // Contact Section
    "contact.title": "Compétences & Contact",
    "contact.skills": "Technologies & Outils",
    "contact.stayConnected": "Restons connectés",
    "contact.email": "Email",
    "contact.collaboration": "💼 Collaboration",
    "contact.collaborationText": "Intéressé par une collaboration ou un projet ? N'hésitez pas à me contacter !",
    "contact.github": "Mes projets et contributions",
    "contact.instagram": "Projets et inspirations créatives",
    "contact.twitter": "Actualités et veille technologique",
    "contact.youtube": "Tutoriels et démonstrations de projets",

    // Footer
    "footer.student": "Étudiant Epitech - Promo 2028",
    "footer.rights": "Tous droits réservés.",

    // Project Status
    "status.finished": "Fini",
    "status.inProgress": "En Cours",
    "status.toImprove": "À Améliorer",

    // Theme
    "theme.switchToLight": "Passer en mode clair",
    "theme.switchToDark": "Passer en mode sombre",

    // MyRPG Project
    "project.myrpg.longDescription":
      "MyRPG est un jeu de rôle complet développé en C avec la bibliothèque CSFML. Ce projet représente plusieurs mois de développement et inclut un système de combat, d'inventaire, de quêtes et une interface graphique entièrement personnalisée.",
    "project.myrpg.feature1": "Système de combat au tour par tour",
    "project.myrpg.feature2": "Gestion d'inventaire avancée",
    "project.myrpg.feature3": "Système de quêtes dynamique",
    "project.myrpg.feature4": "Interface graphique intuitive",
    "project.myrpg.feature5": "Sauvegarde et chargement de partie",
    "project.myrpg.challenge1": "Optimisation des performances graphiques",
    "project.myrpg.challenge2": "Gestion de la mémoire en C",
    "project.myrpg.challenge3": "Architecture modulaire du code",
    "project.myrpg.challenge4": "Système de collision précis",
    "project.myrpg.learning1": "Programmation graphique avec CSFML",
    "project.myrpg.learning2": "Gestion avancée de la mémoire",
    "project.myrpg.learning3": "Architecture de jeux vidéo",
    "project.myrpg.learning4": "Optimisation des performances",

    // Arcade Project
    "project.arcade.longDescription":
      "Arcade est un projet ambitieux qui permet de changer dynamiquement les bibliothèques graphiques et les jeux en cours d'exécution. Ce projet démontre une architecture modulaire avancée avec support de multiples bibliothèques graphiques et jeux.",
    "project.arcade.feature1": "Changement dynamique de bibliothèques graphiques",
    "project.arcade.feature2": "Support de multiples jeux",
    "project.arcade.feature3": "Architecture modulaire avec plugins",
    "project.arcade.feature4": "Interface utilisateur adaptative",
    "project.arcade.feature5": "Système de scores persistant",
    "project.arcade.challenge1": "Gestion des bibliothèques dynamiques",
    "project.arcade.challenge2": "Architecture plugin flexible",
    "project.arcade.challenge3": "Compatibilité multi-plateforme",
    "project.arcade.challenge4": "Gestion des différents formats graphiques",
    "project.arcade.learning1": "Programmation orientée objet avancée",
    "project.arcade.learning2": "Gestion des bibliothèques dynamiques",
    "project.arcade.learning3": "Architecture de plugins",
    "project.arcade.learning4": "Intégration de multiples APIs graphiques",

    // 42sh Project
    "project.42sh.longDescription":
      "42sh est une implémentation complète d'un shell Unix en C. Ce projet reproduit les fonctionnalités principales de bash, incluant l'exécution de commandes, la gestion des pipes, des redirections et des variables d'environnement.",
    "project.42sh.feature1": "Exécution de commandes système",
    "project.42sh.feature2": "Gestion des pipes et redirections",
    "project.42sh.feature3": "Variables d'environnement",
    "project.42sh.feature4": "Historique des commandes",
    "project.42sh.feature5": "Auto-complétion basique",
    "project.42sh.challenge1": "Parsing complexe des commandes",
    "project.42sh.challenge2": "Gestion des processus fils",
    "project.42sh.challenge3": "Implémentation des pipes",
    "project.42sh.challenge4": "Gestion des signaux système",
    "project.42sh.learning1": "Programmation système en C",
    "project.42sh.learning2": "Gestion des processus Unix",
    "project.42sh.learning3": "Parsing et analyse lexicale",
    "project.42sh.learning4": "Architecture de shell Unix",
    "project.42sh.improvement1": "Ajouter le support des alias",
    "project.42sh.improvement2": "Améliorer l'auto-complétion",
    "project.42sh.improvement3": "Implémenter l'historique persistant",
    "project.42sh.improvement4": "Ajouter la coloration syntaxique",
    "project.42sh.improvement5": "Optimiser les performances de parsing",

    // Truth or Dare Project
    "project.truthordare.longDescription":
      "Truth or Dare est une application web interactive conçue pour animer les soirées entre amis. L'application propose des défis personnalisables, un système de points et une interface moderne et responsive avec support multijoueur en temps réel.",
    "project.truthordare.feature1": "Interface utilisateur moderne et responsive",
    "project.truthordare.feature2": "Défis personnalisables par catégorie",
    "project.truthordare.feature3": "Système de points et classements",
    "project.truthordare.feature4": "Mode multijoueur en temps réel",
    "project.truthordare.feature5": "Base de données de défis extensible",
    "project.truthordare.feature6": "Système d'authentification",
    "project.truthordare.challenge1": "Synchronisation multijoueur en temps réel",
    "project.truthordare.challenge2": "Interface utilisateur intuitive",
    "project.truthordare.challenge3": "Gestion des sessions utilisateurs",
    "project.truthordare.challenge4": "Optimisation mobile et responsive",
    "project.truthordare.challenge5": "Déploiement avec Docker",
    "project.truthordare.learning1": "Développement web full-stack moderne",
    "project.truthordare.learning2": "Architecture API REST",
    "project.truthordare.learning3": "WebSockets et communication temps réel",
    "project.truthordare.learning4": "Déploiement et containerisation",
    "project.truthordare.learning5": "Design d'interface utilisateur moderne",

    // Multichat Project
    "project.multichat.longDescription":
      "Multichat est une application de communication avancée qui implémente plusieurs protocoles de réseau. Le projet explore les communications en temps réel, la gestion des sockets et l'intégration de protocoles comme RTMP pour le streaming.",
    "project.multichat.feature1": "Communication temps réel multi-utilisateurs",
    "project.multichat.feature2": "Multi-protocol support (WebSocket, RTMP)",
    "project.multichat.feature3": "Gestion des sockets TCP/UDP",
    "project.multichat.feature4": "Interface de streaming RTMP",
    "project.multichat.feature5": "Architecture multi-threadée",
    "project.multichat.feature6": "Système de salles de chat",
    "project.multichat.challenge1": "Implémentation des protocoles réseau",
    "project.multichat.challenge2": "Gestion de la concurrence et threading",
    "project.multichat.challenge3": "Optimisation des performances réseau",
    "project.multichat.challenge4": "Sécurité des communications",
    "project.multichat.challenge5": "Intégration du protocole RTMP",
    "project.multichat.learning1": "Programmation réseau avancée",
    "project.multichat.learning2": "Protocoles de communication temps réel",
    "project.multichat.learning3": "Architecture distribuée",
    "project.multichat.learning4": "Optimisation des performances réseau",
    "project.multichat.learning5": "Streaming et protocoles multimédia",
    "project.multichat.improvement1": "Ajouter le chiffrement des communications",
    "project.multichat.improvement2": "Implémenter un système d'authentification robuste",
    "project.multichat.improvement3": "Optimiser la gestion de la bande passante",
    "project.multichat.improvement4": "Ajouter le support de nouveaux protocoles",
    "project.multichat.improvement5": "Améliorer l'interface utilisateur",
    "project.multichat.improvement6": "Ajouter la persistance des messages",

    // Nduboi.fr Project
    "project.nduboi.longDescription":
      "Mon portfolio personnel développé avec les technologies web modernes. Ce site présente mes projets, compétences et expériences de manière interactive et responsive, avec un design moderne et des animations fluides.",
    "project.nduboi.feature1": "Design moderne et responsive",
    "project.nduboi.feature2": "Animations fluides avec Framer Motion",
    "project.nduboi.feature3": "Mode sombre/clair automatique",
    "project.nduboi.feature4": "Section projets interactive",
    "project.nduboi.feature5": "Formulaire de contact fonctionnel",
    "project.nduboi.feature6": "Optimisation SEO",
    "project.nduboi.challenge1": "Design responsive sur tous les appareils",
    "project.nduboi.challenge2": "Optimisation des performances",
    "project.nduboi.challenge3": "Animations fluides et naturelles",
    "project.nduboi.challenge4": "Accessibilité web",
    "project.nduboi.challenge5": "Déploiement et hébergement",
    "project.nduboi.learning1": "Framework Next.js et React moderne",
    "project.nduboi.learning2": "Styling avancé avec TailwindCSS",
    "project.nduboi.learning3": "Animations avec Framer Motion",
    "project.nduboi.learning4": "Optimisation web et SEO",
    "project.nduboi.learning5": "Design UX/UI moderne",
  },
  en: {
    // Navigation
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.back": "Back",

    // Hero Section
    "hero.title": "Hi, I'm",
    "hero.description1": "I'm currently a student at Epitech, specializing in computer development.",
    "hero.description2": "Outside my studies, I enjoy swimming, running, scuba diving, and exploring the space world.",

    // Projects Section
    "projects.title": "My Projects",
    "projects.viewAll": "See all my projects",
    "projects.myProjects": "My Projects",
    "projects.overview": "Project Overview",
    "projects.features": "Features",
    "projects.challenges": "Challenges",
    "projects.learnings": "Learnings",
    "projects.toImprove": "To Improve",
    "projects.viewSite": "View Site",

    // Project Descriptions
    "project.myrpg.description": "A complete RPG game with CSFML for Linux",
    "project.arcade.description": "An application where you can change display-lib and game on run-time",
    "project.42sh.description": "A shell with C for Linux",
    "project.truthordare.description": "A full true or dare game for online parties",
    "project.multichat.description": "A project that manipulates socket and other protocols like RTMP",
    "project.nduboi.description": "A personal portfolio, using modern techno.",

    // Contact Section
    "contact.title": "Skills & Contact",
    "contact.skills": "Technologies & Tools",
    "contact.stayConnected": "Let's stay connected",
    "contact.email": "Email",
    "contact.collaboration": "💼 Collaboration",
    "contact.collaborationText": "Interested in a collaboration or project? Feel free to contact me!",
    "contact.github": "My projects and contributions",
    "contact.instagram": "Creative projects and inspirations",
    "contact.twitter": "Tech news and industry insights",
    "contact.youtube": "Tutorials and project demonstrations",

    // Footer
    "footer.student": "Epitech Student - Class of 2028",
    "footer.rights": "All rights reserved.",

    // Project Status
    "status.finished": "Finished",
    "status.inProgress": "In Progress",
    "status.toImprove": "To Improve",

    // Theme
    "theme.switchToLight": "Switch to Light Mode",
    "theme.switchToDark": "Switch to Dark Mode",

    // MyRPG Project
    "project.myrpg.longDescription":
      "MyRPG is a complete role-playing game developed in C with the CSFML library. This project represents several months of development and includes a combat system, inventory management, quest system, and a fully customized graphical interface.",
    "project.myrpg.feature1": "Turn-based combat system",
    "project.myrpg.feature2": "Advanced inventory management",
    "project.myrpg.feature3": "Dynamic quest system",
    "project.myrpg.feature4": "Intuitive graphical interface",
    "project.myrpg.feature5": "Game save and load functionality",
    "project.myrpg.challenge1": "Graphics performance optimization",
    "project.myrpg.challenge2": "Memory management in C",
    "project.myrpg.challenge3": "Modular code architecture",
    "project.myrpg.challenge4": "Precise collision system",
    "project.myrpg.learning1": "Graphics programming with CSFML",
    "project.myrpg.learning2": "Advanced memory management",
    "project.myrpg.learning3": "Video game architecture",
    "project.myrpg.learning4": "Performance optimization",

    // Arcade Project
    "project.arcade.longDescription":
      "Arcade is an ambitious project that allows dynamic switching of graphics libraries and games during runtime. This project demonstrates advanced modular architecture with support for multiple graphics libraries and games.",
    "project.arcade.feature1": "Dynamic graphics library switching",
    "project.arcade.feature2": "Multiple game support",
    "project.arcade.feature3": "Modular architecture with plugins",
    "project.arcade.feature4": "Adaptive user interface",
    "project.arcade.feature5": "Persistent scoring system",
    "project.arcade.challenge1": "Dynamic library management",
    "project.arcade.challenge2": "Flexible plugin architecture",
    "project.arcade.challenge3": "Cross-platform compatibility",
    "project.arcade.challenge4": "Different graphics format handling",
    "project.arcade.learning1": "Advanced object-oriented programming",
    "project.arcade.learning2": "Dynamic library management",
    "project.arcade.learning3": "Plugin architecture",
    "project.arcade.learning4": "Multiple graphics APIs integration",

    // 42sh Project
    "project.42sh.longDescription":
      "42sh is a complete implementation of a Unix shell in C. This project reproduces the main functionalities of bash, including command execution, pipe management, redirections, and environment variables.",
    "project.42sh.feature1": "System command execution",
    "project.42sh.feature2": "Pipe and redirection management",
    "project.42sh.feature3": "Environment variables",
    "project.42sh.feature4": "Command history",
    "project.42sh.feature5": "Basic auto-completion",
    "project.42sh.challenge1": "Complex command parsing",
    "project.42sh.challenge2": "Child process management",
    "project.42sh.challenge3": "Pipe implementation",
    "project.42sh.challenge4": "System signal handling",
    "project.42sh.learning1": "System programming in C",
    "project.42sh.learning2": "Unix process management",
    "project.42sh.learning3": "Parsing and lexical analysis",
    "project.42sh.learning4": "Unix shell architecture",
    "project.42sh.improvement1": "Add alias support",
    "project.42sh.improvement2": "Improve auto-completion",
    "project.42sh.improvement3": "Implement persistent history",
    "project.42sh.improvement4": "Add syntax highlighting",
    "project.42sh.improvement5": "Optimize parsing performance",

    // Truth or Dare Project
    "project.truthordare.longDescription":
      "Truth or Dare is an interactive web application designed to liven up parties with friends. The application offers customizable challenges, a point system, and a modern, responsive interface with real-time multiplayer support.",
    "project.truthordare.feature1": "Modern and responsive user interface",
    "project.truthordare.feature2": "Customizable challenges by category",
    "project.truthordare.feature3": "Point system and leaderboards",
    "project.truthordare.feature4": "Real-time multiplayer mode",
    "project.truthordare.feature5": "Extensible challenge database",
    "project.truthordare.feature6": "Authentication system",
    "project.truthordare.challenge1": "Real-time multiplayer synchronization",
    "project.truthordare.challenge2": "Intuitive user interface",
    "project.truthordare.challenge3": "User session management",
    "project.truthordare.challenge4": "Mobile and responsive optimization",
    "project.truthordare.challenge5": "Docker deployment",
    "project.truthordare.learning1": "Modern full-stack web development",
    "project.truthordare.learning2": "REST API architecture",
    "project.truthordare.learning3": "WebSockets and real-time communication",
    "project.truthordare.learning4": "Deployment and containerization",
    "project.truthordare.learning5": "Modern user interface design",

    // Multichat Project
    "project.multichat.longDescription":
      "Multichat is an advanced communication application that implements multiple network protocols. The project explores real-time communications, socket management, and integration of protocols like RTMP for streaming.",
    "project.multichat.feature1": "Real-time multi-user communication",
    "project.multichat.feature2": "Multi-protocol support (WebSocket, RTMP)",
    "project.multichat.feature3": "TCP/UDP socket management",
    "project.multichat.feature4": "RTMP streaming interface",
    "project.multichat.feature5": "Multi-threaded architecture",
    "project.multichat.feature6": "Chat room system",
    "project.multichat.challenge1": "Network protocol implementation",
    "project.multichat.challenge2": "Concurrency and threading management",
    "project.multichat.challenge3": "Network performance optimization",
    "project.multichat.challenge4": "Communication security",
    "project.multichat.challenge5": "RTMP protocol integration",
    "project.multichat.learning1": "Advanced network programming",
    "project.multichat.learning2": "Real-time communication protocols",
    "project.multichat.learning3": "Distributed architecture",
    "project.multichat.learning4": "Network performance optimization",
    "project.multichat.learning5": "Streaming and multimedia protocols",
    "project.multichat.improvement1": "Add communication encryption",
    "project.multichat.improvement2": "Implement robust authentication system",
    "project.multichat.improvement3": "Optimize bandwidth management",
    "project.multichat.improvement4": "Add support for new protocols",
    "project.multichat.improvement5": "Improve user interface",
    "project.multichat.improvement6": "Add message persistence",

    // Nduboi.fr Project
    "project.nduboi.longDescription":
      "My personal portfolio developed with modern web technologies. This site showcases my projects, skills, and experiences in an interactive and responsive way, with modern design and smooth animations.",
    "project.nduboi.feature1": "Modern and responsive design",
    "project.nduboi.feature2": "Smooth animations with Framer Motion",
    "project.nduboi.feature3": "Automatic dark/light mode",
    "project.nduboi.feature4": "Interactive projects section",
    "project.nduboi.feature5": "Functional contact form",
    "project.nduboi.feature6": "SEO optimization",
    "project.nduboi.challenge1": "Responsive design on all devices",
    "project.nduboi.challenge2": "Performance optimization",
    "project.nduboi.challenge3": "Smooth and natural animations",
    "project.nduboi.challenge4": "Web accessibility",
    "project.nduboi.challenge5": "Deployment and hosting",
    "project.nduboi.learning1": "Next.js framework and modern React",
    "project.nduboi.learning2": "Advanced styling with TailwindCSS",
    "project.nduboi.learning3": "Animations with Framer Motion",
    "project.nduboi.learning4": "Web optimization and SEO",
    "project.nduboi.learning5": "Modern UX/UI design",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Récupérer la langue sauvegardée ou utiliser la langue du navigateur
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    } else {
      // Détecter la langue du navigateur
      const browserLanguage = navigator.language.toLowerCase()
      if (browserLanguage.startsWith("fr")) {
        setLanguage("fr")
      } else {
        setLanguage("en")
      }
    }
  }, [])

  useEffect(() => {
    // Sauvegarder la langue choisie
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
