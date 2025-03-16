import Landing from "./landing"
import About from "./about"
import Hero from "./hero"
import ClubUpdates from "./clubUpdates"
import photo1 from '../../assets/images/placeholder-images/photography1.png'
import photo2 from '../../assets/images/placeholder-images/photography2.png'

export default function HomePage() {

    const specialNotices = ["Recruitment for 2028 batch has begun."]
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
                <hr className="my-10 border-1 border-gray-300" />
                <ClubUpdates events={events} blogs={blogs} />
                <hr className="my-10 border-1 border-gray-300" />
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

// Latest few events
// Everything is necessary except image
const events = [
    {
        id: "incident-24",
        title: "Incident '24",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        location: "Main Building, NITK",
        dateTime: "2024-01-01 10:00 AM",
        image: "https://img.freepik.com/free-photo/3d-modern-background-with-hot-pink-flowing-lines_1048-12263.jpg",
        thumbnailColor: "#E195AB"
    },
    {
        id: "engineer-24",
        title: "Engineer '24",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        location: "Main Building, NITK",
        dateTime: "2024-01-01 10:00 AM",
        image: "https://placehold.co/200x260", //optional
        thumbnailColor: "#DE3163"
    },
    {
        id: "photography-24",
        title: "Photography '24",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        location: "Main Building, NITK",
        dateTime: "2024-01-01 10:00 AM",
        image: "https://placehold.co/200x260",
        thumbnailColor: "#FFB4A2"
    },
    {
        id: "event-4",
        title: "Event 4 - No Image",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        location: "Main Building, NITK",
        dateTime: "2024-01-01 10:00 AM",
        image: null,
        thumbnailColor: "#FFB4A2"
    }
]


// Top few blogs
// Everything is necessary except image
const blogs = [
    {
        id: "blog-1",
        title: "Title 1",
        description: "Short Description or first few lines of the blog",
        image: "https://placehold.co/380x150",
    },
    {
        id: "blog-2",
        title: "Title 2",
        description: "Short Description or first few lines of the blog",
        image: "https://placehold.co/380x150",
    },
    {
        id: "blog-3",
        title: "Title 3",
        description: "Short Description or first few lines of the blog",
        image: "https://placehold.co/380x150",
    },
    {
        id: "blog-4",
        title: "Title 4",
        description: "Short Description or first few lines of the blog",
        image: "https://placehold.co/380x150",
    },
    {
        id: "blog-5",
        title: "Title 5 - No Image",
        description: "Short Description or first few lines of the blog",
        image: null,
    }
]
