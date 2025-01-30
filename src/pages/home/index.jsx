import Landing from "./landing"
import About from "./about"
import Hero from "./hero"
import photo1 from '../../assets/images/placeholder-images/photography1.png'
import photo2 from '../../assets/images/placeholder-images/photography2.png'

export default function HomePage() {

    const specialNotices = ["Recruitment for 2028 batch has began."]
    const onJoin = (e) => {
        e.preventDefault();
        console.log("Join button clicked");
        // redirect to the most recent recruitment blog post
    }

    const learnMore = (e) => {
        e.preventDefault();
        console.log("Learn more button clicked");
        // redirect to the learn more page
    }

    return (
        <div>
            <Landing onJoin={onJoin} specialNotices={specialNotices} />
            {/* Refer to tailwind.config.js for container, container-px and container-px-md variables */}
            <div className="max-w-container px-container-px py-5 mx-auto flex flex-col md:py-7 md:px-container-px-md">
                <About clubGallery={clubGallery} stats={stats} learnMore={learnMore} />
                <Hero photos={topPhotos} />
            </div>
        </div >
    )
}

const clubGallery = [
    {
        image: "https://placehold.co/600x700",
        caption: "Image 1",
        date: "2024-01-01",
        itemsInPhoto: ["Person 1", "Person 2", "Person 3"]
    },
    {
        image: "https://placehold.co/600x500",
        caption: "Image 2",
        date: "2024-01-01",
        itemsInPhoto: ["Person 1", "Person 2", "Person 3"]
    },
    {
        image: "https://placehold.co/500x800",
        caption: "Image 3",
        date: "2024-01-01",
        itemsInPhoto: ["Person 1", "Person 2", "Person 3"]
    },
    {
        image: "https://placehold.co/1280x800",
        caption: "Image 4",
        date: "2024-01-01",
        itemsInPhoto: ["Person 1", "Person 2", "Person 3"]
    },
    {
        image: "https://placehold.co/600x600",
        caption: "Image 5",
        date: "2024-01-01",
        itemsInPhoto: ["Person 1", "Person 2", "Person 3"]
    },
    {
        image: "https://placehold.co/720x1280",
        caption: "Image 6",
        date: "2024-01-01",
        itemsInPhoto: ["Person 1", "Person 2", "Person 3"]
    },
    {
        image: "https://placehold.co/600x400",
        caption: "Image 7",
        date: "2024-01-01",
        itemsInPhoto: ["Person 1", "Person 2", "Person 3"]
    },
    {
        image: "https://placehold.co/400x400",
        caption: "Image 8",
        date: "2024-01-01",
        itemsInPhoto: ["Person 1", "Person 2", "Person 3"]
    },
    {
        image: "https://placehold.co/900x600",
        caption: "Image 9",
        date: "2024-01-01",
        itemsInPhoto: ["Person 1", "Person 2", "Person 3"]
    },

]

const topPhotos = [
    {
        id: 1,
        image: photo1,
        title: "Beautiful Hills.",
        location: "Hills",
        date: "2024-01-01",
        photographer: "ABCD",
        link: "Link",
    },
    {
        id: 2,
        image: photo2,
        title: "Mountain View",
        location: "Mountain",
        date: "2024-01-01",
        photographer: "EFGH",
        link: "Link",
    },
    {
        id: 3,
        image: "https://placehold.co/1920x1080",
        title: "Beautiful Hills.",
        location: "Hills",
        date: "2024-01-01",
        photographer: "EFGH",
        link: "Link",
    },
    {
        id: 4,
        image: "https://placehold.co/1920x900",
        title: "Mountain View",
        location: "Mountain",
        date: "2024-01-01",
        photographer: "EFGH",
        link: "Link",
    },
    {
        id: 5,
        image: "https://placehold.co/1920x1200",
        title: "Mountain View",
        location: "Mountain",
        date: "2024-01-01",
        photographer: "EFGH",
        link: "Link",
    },
]

const stats = [
    {
        title: "Sony World Photography Winners.",
        value: 12
    },
    {
        title: "Taylor Wessing Potrait Prizes",
        value: 3
    },
    {
        title: "Events hosted in the last year.",
        value: 10
    },
    {
        title: "Club Members",
        value: 74
    },
]