import { Outlet, useParams } from 'react-router';

function Events() {
    const { id } = useParams();

    if (id) {
        return <Outlet />
    }

    return (
        <div className="max-w-container mx-auto px-container-px md:px-container-px-md py-8">
            <h1>All Events</h1>
        </div>
    )
}

export default Events