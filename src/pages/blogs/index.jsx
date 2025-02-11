import { Outlet, useParams } from 'react-router';
import { useState } from 'react';
import Dropdown from '../../components/filtersort/dropdown';
import BlogsThumb from '../../components/blogs/blogsThumb';


function Blogs() {
    const { id } = useParams();
    const [filter, setFilter] = useState(0);
    const [sort, setSort] = useState(0);

    if (id) {
        return <Outlet />
    }


    return (
        <div className="max-w-container mx-auto px-container-px md:px-container-px-md py-8">

            {/* top most section  */}
            <div className="mt-3 flex flex-col justify-center items-center gap-y-4 px-4 sm:px-6 lg:px-8">
                <span className="text-center font-bold text-3xl border-[1.2px] border-black rounded-full px-8 py-3 w-auto sm:text-4xl lg:text-5xl">
                    Blogs
                </span>
                <span className="text-md opacity-60 sm:text-lg lg:text-xl lg:max-w-2xl text-center">
                    Blogs written by our members on photography, life, technical and non-technical topics.
                </span>
                {/* options part  */}
                <div className='mt-5 flex flex-col md:flex-row gap-2 md:gap-4 items-end'>
                    <div className='flex gap-2 items-center'>
                        <label>Tag</label>
                        <Dropdown options={
                            blogTags.map((tag, index) => ({ label: tag, value: index }))
                        } value={filter} onChange={(e) => setFilter(e.target.value)} />
                    </div>

                    <div className='flex gap-2 items-center'>
                        <label>Sort By</label>
                        <Dropdown options={
                            sortOptions.map((option, index) => ({ label: option, value: index }))
                        } value={sort} onChange={(e) => setSort(e.target.value)} />
                    </div>
                </div>
            </div>



            {/*Content part  */}
            <div className='mt-5'>
                <div className='flex flex-col gap-4 md:grid md:grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3
                        md:gap-x-4 md:gap-y-8'>
                    {blogs.map((blog, index) => (
                        <BlogsThumb blog={blog} key={index} variant="grid" />
                    ))}

                </div>


            </div>


        </div>
    )
}


const blogTags = [
    "All",
    "Camera",
    "Wildlife",
    "Video",
    "Astrophotography",
    "NITK",
    "Life Ex"
]

const sortOptions = [
    "Latest",
    "Oldest",
    "Top"
]



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




export default Blogs