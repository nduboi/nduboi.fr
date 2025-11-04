export interface MediaItem {
  type: "image" | "video"
  src: string
  thumbnail?: string
  alt?: string
}

export interface Trip {
  id: number
  title: string
  descriptionKey: string
  labels: string[]
  media: MediaItem[]
  date?: string
  dateStart?: string
  dateEnd?: string
  location: string
  mapUrl?: string
}

export const tripsData: Trip[] = [
  {
    id: 1,
    title: "Robocar TEK 1",
    descriptionKey: "trip.robocar.description",
    labels: ["Paris", "Epitech", "Robocar", "AI", "Jetson Nano"],
    media: [
    {
        type: "image",
        src: "/screenshot/tripRobocarParis1.svg",
        alt: "Eiffel Tower",
      },
      {
        type: "video",
        src: "/videos/tripRobocarParis2.mp4",
        thumbnail: "/screenshot/tripRobocarParis2-1.png",
        alt: "Course Robocar TEK 2 - Paris - 1",
      },
      {
        type: "video",
        src: "/videos/tripRobocarParis3.mp4",
        thumbnail: "/screenshot/tripRobocarParis3-1.png",
        alt: "Course Robocar TEK 2 - Paris - 2",
      },
      {
        type: "video",
        src: "/videos/tripRobocarParis4.mp4",
        thumbnail: "/screenshot/tripRobocarParis4-1.png",
        alt: "Course Robocar TEK 2 - Paris - 3",
      },
      {
        type: "video",
        src: "/videos/tripRobocarParis5.mp4",
        thumbnail: "/screenshot/tripRobocarParis5-1.png",
        alt: "Course Robocar TEK 2 - Paris - 4",
      }
    ],
    dateStart: "2023-06-30",
    dateEnd: "2023-07-01",
    location: "Epitech Paris, France",
    mapUrl: "https://www.google.com/maps/place/Ecole+informatique+Paris+-+Epitech/@48.8153422,2.3628985,20z/data=!4m6!3m5!1s0x47e6717ff972ae09:0x692326b123aa4d9b!8m2!3d48.8153585!4d2.3630638!16s%2Fm%2F0j3g76j?entry=ttu&g_ep=EgoyMDI1MDgwMy4wIKXMDSoASAFQAw%3D%3D",
  }
]
