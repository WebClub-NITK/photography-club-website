import React, { useState } from 'react';
import PostsData from '../../utils/post.json';
import ProfilesData from '../../utils/profile.json';

const Reels = () => {
  const [userId, setUserId] = useState("1");
  const [posts, setPosts] = useState(PostsData);
  const [profiles, setProfiles] = useState(ProfilesData);
  const [readmorePosts, setReadmorePosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(
    PostsData.map((post) => ({
      id: post.id,
      currentIndex: 0,
      length: post.img.length,
    }))
  );

  const likePost = (postId) => {
    const updatedProfiles = profiles.map((profile) => {
      if (profile.id === userId) {
        return {
          ...profile,
          likedPosts: [...profile.likedPosts, postId],
        };
      }
      return profile;
    });

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });

    setProfiles(updatedProfiles);
    setPosts(updatedPosts);
  };

  const dislikePost = (postId) => {
    const updatedProfiles = profiles.map((profile) => {
      if (profile.id === userId) {
        return {
          ...profile,
          likedPosts: profile.likedPosts.filter((id) => id !== postId),
        };
      }
      return profile;
    });

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes - 1 };
      }
      return post;
    });

    setProfiles(updatedProfiles);
    setPosts(updatedPosts);
  };

  const AddReadmorePosts = (postId) => {
    setReadmorePosts((prevReadmorePosts) => {
      if (!prevReadmorePosts.includes(postId)) {
        return [...prevReadmorePosts, postId];
      }
      return prevReadmorePosts;
    });
  };

  const RemoveReadmorePosts = (postId) => {
    setReadmorePosts((prevReadmorePosts) =>
      prevReadmorePosts.filter((id) => id !== postId)
    );
  };

  const prevButton = (currObject) => {
    const postId = currObject.id;
    const updatedCurrentIndex = currentIndex.map((currIndex) => {
      if (currIndex.id === postId && currIndex.currentIndex > 0) {
        return {
          ...currIndex,
          currentIndex: currIndex.currentIndex - 1,
        };
      }
      return currIndex;
    });
    setCurrentIndex(updatedCurrentIndex);
  };

  const nextButton = (currObject) => {
    const postId = currObject.id;
    const updatedCurrentIndex = currentIndex.map((currIndex) => {
      if (
        currIndex.id === postId &&
        currIndex.currentIndex < currIndex.length - 1
      ) {
        return {
          ...currIndex,
          currentIndex: currIndex.currentIndex + 1,
        };
      }
      return currIndex;
    });
    setCurrentIndex(updatedCurrentIndex);
  };

  return (
    <>
      {posts.map((post) => {
        const isLiked = profiles
          .find((profile) => profile.id === userId)
          .likedPosts.includes(post.id);

        const currObject = currentIndex.find((curr) => curr.id === post.id);

        return (
          <div className="flex justify-center" key={post.id}>
            <div className="relative w-96 p-2 mb-8 border-b-2">
              {/* Title and Date */}
              <div className="flex justify-between">
                <span className="flex-wrap mb-2">{post.title}</span>
                <span>{post.date}</span>
              </div>

              {/* Image */}
              <div className="relative">
                {post.img.length === 1 ? (
                  <img
                    src={post.img[0]}
                    className="h-96 w-96 pb-2 rounded-xl"
                    alt="post"
                  />
                ) : (
                  <>
                    {/* Prev Button */}
                    {currObject.currentIndex > 0 && (
                      <button
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
                      onClick={() => prevButton(currObject)}
                    >
                      ❮
                    </button>
                    
                    )}
                    {/* Image */}
                    <img
                      src={post.img[currObject.currentIndex]}
                      className="h-96 w-96 pb-2 rounded-xl"
                      alt="post"
                    />
                    {/* Next Button */}
                    {currObject.currentIndex < currObject.length - 1 && (
                      <button
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
                        onClick={() => nextButton(currObject)}
                      >
                        ❯
                      </button>
                    )}

                    {/*Navigation bar*/}
                    <div className='absolute bottom-2 left-[50%] translate-x-[-50%] flex justify-center'>
                    {
                      Array(currObject.length).fill(0).map((val,index)=>{
                        if(index === currObject.currentIndex)
                        return (<div className="rounded-full bg-white h-2 w-2 m-2"></div>)
                        else
                        return (<div className="rounded-full bg-gray-500 h-2 w-2 m-2"></div>)
                      })
                    }
                    </div>
                  </>
                )}
              </div>

              {/* Actions and Like Count */}
              <div>
                <div className="flex items-center">
                  {isLiked ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => dislikePost(post.id)}
                    >
                      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => likePost(post.id)}
                    >
                    <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
                    </svg>
                  )}
                  <span className="ml-2">{post.likes !== 0 && post.likes}</span>
                </div>
                <div className="text-left mt-2">
                  {!readmorePosts.includes(post.id) ? (
                    <>
                      <span>
                        {post.caption.split(" ").slice(0, 20).join(" ")}
                      </span>
                      {post.caption.split(" ").length > 20 ? (
                        <button
                          className="text-blue-500 ml-2"
                          onClick={() => AddReadmorePosts(post.id)}
                        >
                          read more
                        </button>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <>
                      <span>{post.caption}</span>
                      <button
                        className="text-blue-500 ml-2"
                        onClick={() => RemoveReadmorePosts(post.id)}
                      >
                        read less
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Reels;
