import Landing from "./landing"
import About from "./about"
import Hero from "./hero"
import one from '../../assets/images/placeholder-images/one.png'
import two from '../../assets/images/placeholder-images/two.png'
import three from '../../assets/images/placeholder-images/three.png'
import four from '../../assets/images/placeholder-images/four.png'
import photo1 from '../../assets/images/placeholder-images/photography1.png'
import photo2 from '../../assets/images/placeholder-images/photography2.png'

export default function HomePage() {

    const clubGallery = [
        two,
        one,
        two,
        three,
        four,
        two
    ]
    const topPhotos = [
        {
            image: photo1,
            title: "Beautiful Hills.",
            location: "Hills",
            date: "2024-01-01",
            photographer: "ABCD",
            link: "Link",
        },
        {
            image: photo2,
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

    const specialNotices = ["Recruitment for 2028 batch has began."]

    const onJoin = () => {
        // redirect to the most recent recruitment blog post
    }

    return <div>
        <Landing onJoin={onJoin} specialNotices={specialNotices} />
        <div className="max-w-[1200px] px-5 py-5 mx-auto flex flex-col">
            <About clubGallery={clubGallery} stats={stats} />
            <Hero photos={topPhotos} />
        </div>
    </div >
}