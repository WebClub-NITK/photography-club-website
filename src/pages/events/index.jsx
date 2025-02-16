import { Outlet, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import Dropdown from '../../components/filtersort/dropdown';
import EventsThumb from '../../components/events/eventsThumb';
import ModularTabs from '../../components/modularTabs';

function Events() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('upcoming');
    const [eventsToShow, setEventsToShow] = useState(events);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);

        if (tabId === "all") {
            setEventsToShow(events);
        } else if (tabId === "upcoming") {
            const upcomingEvents = events.filter(event => new Date(event.dateTime) >= new Date());
            setEventsToShow(upcomingEvents);
        } else if (tabId === "past") {
            const pastEvents = events.filter(event => new Date(event.dateTime) < new Date());
            setEventsToShow(pastEvents);
        }
    }

    useEffect(() => {
        handleTabClick(activeTab);
    }, []);

    if (id) {
        return <Outlet />
    }




    return (
        <div className="max-w-container mx-auto px-container-px md:px-container-px-md py-8">

            {/* top most section  */}
            <div className="mt-3 flex flex-col justify-center items-center gap-y-4 px-4 sm:px-6 lg:px-8">
                <span className="text-center font-bold text-3xl border-[1.2px] border-black rounded-full px-8 py-3 w-auto sm:text-4xl lg:text-5xl">
                    Club Events
                </span>
                <span className="text-md opacity-60 sm:text-lg lg:text-xl lg:max-w-2xl text-center">
                    Check out all the events we have planned for you;<br />
                    And the ones we&apos;ve hosted before.
                </span>
                {/* tabs part  */}
                <div className='mt-5'>
                    <ModularTabs tabs={navItems} activeTab={activeTab} onTabClick={handleTabClick} />
                </div>
            </div>


            {/*Content part  */}
            <div className='mt-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {eventsToShow.map((event, index) => (
                        <EventsThumb event={event} key={index} thinVariant={false} variant="grid" />
                    ))}
                </div>


            </div>


        </div>
    )
}

const events = [
    {
        id: "incident-24",
        title: "Incident '24",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        location: "Main Building, NITK",
        dateTime: "2026-01-01 10:00 AM",
        image: "https://img.freepik.com/free-photo/3d-modern-background-with-hot-pink-flowing-lines_1048-12263.jpg",
        thumbnailColor: "#E195AB"
    },
    {
        id: "engineer-24",
        title: "Engineer '24",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        location: "Main Building, NITK",
        dateTime: "2027-01-01 10:00 AM",
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

const navItems = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'all', label: 'All' },
    { id: 'past', label: 'Past' },
]



export default Events