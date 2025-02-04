import { useParams } from 'react-router';

function BlogPage() {
    const { id } = useParams();

    return (
        <div className="max-w-container mx-auto px-container-px md:px-container-px-md py-8">
            <h1>Blog Page #{id}</h1>
        </div>
    )
}

export default BlogPage