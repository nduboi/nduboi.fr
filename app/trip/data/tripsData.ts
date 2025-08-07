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
      /*{
        type: "video",
        src: "https://youtu.be/mEzrT54HUJE",
        thumbnail: "/screenshot/myRPG.1.svg?height=400&width=600",
        alt: "MyRPG Trailer",
      }*/
    ],
    dateStart: "2023-06-30",
    dateEnd: "2023-07-01",
    location: "Epitech Paris, France",
    mapUrl: "https://www.google.com/maps/place/Ecole+informatique+Paris+-+Epitech/@48.8153422,2.3628985,20z/data=!4m6!3m5!1s0x47e6717ff972ae09:0x692326b123aa4d9b!8m2!3d48.8153585!4d2.3630638!16s%2Fm%2F0j3g76j?entry=ttu&g_ep=EgoyMDI1MDgwMy4wIKXMDSoASAFQAw%3D%3D",
  }
]