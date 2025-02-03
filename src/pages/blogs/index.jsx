import React from 'react'
import { Outlet, useParams } from 'react-router';

function Blogs() {
    const { id } = useParams();

    if (id) {
        return <Outlet />
    }

    return (
        <div className="max-w-container mx-auto px-container-px md:px-container-px-md py-8">
            <h1>All Blogs</h1>
            {/* Your blogs list content */}
        </div>
    )
}

export default Blogs