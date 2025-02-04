import { useParams } from 'react-router';

function EventPage() {
    const { id } = useParams();

    return (
        <div className="max-w-container mx-auto px-container-px md:px-container-px-md py-8">
            <h1>Event #{id}</h1>
        </div>
    )
}

export default EventPage