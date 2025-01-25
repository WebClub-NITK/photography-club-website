import Landing from "./landing"
import About from "./about"
import Hero from "./hero"
import one from '../../assets/images/placeholder-images/one.png'
import two from '../../assets/images/placeholder-images/two.png'
import three from '../../assets/images/placeholder-images/three.png'
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
        <div className="w-full overflow-x-hidden">
            <Landing onJoin={onJoin} specialNotices={specialNotices} />
            <div className="max-w-container mx-auto flex flex-col
                py-5 md:py-7
                px-container-px md:px-container-px-md">
                <About clubGallery={clubGallery} stats={stats} learnMore={learnMore} />
                <Hero photos={topPhotos} />
            </div>
        </div>
    )
}

const clubGallery = [
    {
        photo: two,
        caption: 'NITK Wildlife Photography Event at Bhadra Wildlife Sanctuary.',
        itemsInPhoto: ['John Doe', 'Jane Doe'], // optional
        date: '2024-01-23', // optional
    },
    {
        photo: one,
        caption: 'Taken at Kaua\'i',
        itemsInPhoto: ['John Doe', 'Jane Doe'], // optional
        date: '2024-01-01', // optional
    },
    {
        photo: three,
        caption: 'Taken at Mangalore',
        itemsInPhoto: ['John Doe', 'Jane Doe'], // optional
        date: '2024-01-01', // optional
    },
    {
        photo: one,
        caption: 'Taken at Red Rock',
        itemsInPhoto: ['John Doe', 'Jane Doe'], // optional
        date: '2024-01-01', // optional
    },
    {
        photo: two,
        caption: 'Club Trip to Goa. Batch of 2027',
        itemsInPhoto: ['John Doe', 'Jane Doe'], // optional
        date: '2024-01-01', // optional
    },
    {
        photo: three,
        caption: 'Taken at Mangalore',
        itemsInPhoto: ['John Doe', 'Jane Doe'], // optional
        date: '2024-01-01', // optional
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
        image: photo1,
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