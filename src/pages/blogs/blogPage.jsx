import { useParams } from 'react-router';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { FaRegUser } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import BlogsThumb from '../../components/blogs/blogsThumb';
import ViewAllCard from '../../components/util/ViewAllCard';
import ScrollView from '../../components/util/ScrollView';


function BlogPage() {
    const { id } = useParams();
    const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
    const blogsContainerRef = useRef(null);
    const navigate = useNavigate();

    const handleAllBlogsClick = () => {
        navigate(`/blogs`);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    const calculateReadingTime = (content) => {
        if (!content || typeof content !== 'string') {
            return '0 minute read';
        }

        const wordsPerMinute = 200;
        const wordCount = content.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);

        return `${readingTime} minute read`;
    }

    return (
        <div className="flex flex-col min-h-screen">

            {/* Blog Banner */}
            {blog.image && (
                <div className="relative w-full">
                    {/* Main Image - will determine height based on aspect ratio */}
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full object-cover z-[3] relative"
                    />
                    {/* Blurred Background Image - matches main image height */}
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover blur-sm"
                        />
                    </div>
                </div>
            )}

            {/* Blog Content */}
            <div className='md:w-[80%] lg:w-[60%] max-w-full md:max-w-container px-container-px py-5 pt-0 mx-auto md:py-7 md:px-container-px-md'>
                <div className='flex flex-col gap-2 justify-center py-6 pt-5 md:pt-0'>
                    <h1 className='text-[32px] font-black md:text-center pb-3'>
                        {blog.title}
                    </h1>
                    <div className='flex flex-col md:items-center justify-center gap-2 md:gap-5'>
                        <span className='flex items-center gap-1 font-bold text-sm text-gray-500'>
                            <FaRegUser />
                            {blog.author_id}
                        </span>
                        <div className='flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-5'>
                            <span className='flex items-center gap-1 text-sm text-gray-500'>
                                <FaClock />
                                {calculateReadingTime(blog.content)}
                            </span>
                            <span className='flex items-center gap-1 font-bold text-sm text-gray-500'>
                                <MdEvent />
                                {formatDate(blog.date)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <MarkdownPreview
                        wrapperElement={{
                            "data-color-mode": "light"
                        }}
                        source={blog.content}
                    />
                </div>
                {/* Blogs */}
                <div className="flex flex-col gap-4 pt-20 md:pt-40">
                    <div className="flex flex-row items-center justify-between">
                        <p
                            className="cursor-pointer flex flex-row items-center justify-start gap-2
                            hover:gap-3 transition-all duration-300 ease-in-out text-primary"
                            onClick={() => handleAllBlogsClick()}
                        >
                            <p className="text-tertiary text-[16px] font-bold uppercase">
                                More Blogs
                            </p>
                            <FaAngleRight className="text-tertiary text-[16px] font-bold uppercase" />
                        </p>
                        <ScrollView
                            currentIndex={currentBlogIndex}
                            setCurrentIndex={setCurrentBlogIndex}
                            totalImages={blogs.length}

                            scrollType="view"
                            containerRef={blogsContainerRef}
                            imageWidth={380}
                            imageGap={14}

                            speed={1}
                            showSlideNumbers={false}
                        />
                    </div>
                    <div
                        style={{ scrollbarWidth: "none" }}
                        className="overflow-x-auto overflow-y-hidden px-1"
                        ref={blogsContainerRef}
                    >
                        <div className="flex flex-row items-center gap-[14px] pt-2 pb-3">
                            {blogs.map((blog, index) => (
                                <BlogsThumb blog={blog} key={index} variant="scroll" />
                            ))}
                            <ViewAllCard text="All Blogs" link="/blogs" />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

const blog = {
    author_id: 'author-id',
    image: "https://placehold.co/380x150",
    title: "Why you not having a DSLR is not the reason you can't take good photos.",
    date: "2025-01-03",
    content: `
## Introduction

Many beginner photographers believe that **not owning a DSLR** is what holds them back from capturing great photos. But the truth is, **photography is about skill, not just gear.** In this post, we’ll explore why your camera isn’t the problem and what actually makes a great photo.

## The Real Factors Behind Great Photos

### 1. Composition Matters More Than Equipment

A well-composed shot on a smartphone can look **better** than a poorly composed one on a high-end DSLR. Consider these composition techniques:

- **Rule of Thirds**: Place your subject along imaginary grid lines for balance.
- **Leading Lines**: Use natural lines to draw attention to your subject.
- **Framing**: Use objects in the scene to frame your subject for depth.

### 2. Lighting is Everything

Bad lighting can ruin a photo, no matter the camera. Learn to use:

- **Golden Hour**: The soft light just after sunrise and before sunset.
- **Shadows & Highlights**: Play with contrast for dramatic effects.
- **Artificial Light**: Even a simple desk lamp can create great results.

### 3. Editing Enhances, Not Replaces

Even professional photographers edit their shots. You can use free tools like:

\`\`\`js
const freeEditingTools = [
  "Snapseed",
  "Lightroom Mobile",
  "VSCO"
];
console.log("Try these tools to enhance your photos:", freeEditingTools);
\`\`\`

## Myth: "DSLRs Take Better Photos By Default"

Here’s a fun test: Compare an iPhone shot vs. a DSLR shot taken in **bad lighting** with **poor composition**. The result? The phone shot may look better!

## Test Image Embedding

![Example of a well-lit, well-composed smartphone photo](https://placehold.co/600x300 "Smartphone photography test image")

## Conclusion

Instead of waiting until you can afford a DSLR, focus on **composition, lighting, and editing**. These **skills** make a difference—not just the camera.

So, the next time you think you need better gear to take better photos, remind yourself: 

> "A great photographer can take a stunning photo with any camera."
`
}

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


export default BlogPage