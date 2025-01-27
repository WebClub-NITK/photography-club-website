import { createContext } from "react";
import { useState } from "react";

export const TabContext = createContext(null);

export const TabContextProvider = (props) => {
  // the items that are to be shown on the menu bar
  const navItems = [
    { name: "View all", href: "#" },
    { name: "Management", href: "#" },
    { name: "Design", href: "#" },
    { name: "Photographers", href: "#" },
    { name: "Operations", href: "#" },
  ];

  const teamMembers = [
    {
      id: "1",
      name: "Alice Thompson",
      role: "Portrait Photographer",
      bio: "Capturing the essence of human emotions through artistic portrait photography.",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
      mail: "alice.thompson@gmail.com",
      instagram: "alice_photo",
      photos: [
        {
          id: "1",
          title: "City Lights",
          url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
          description: "Night photography capturing the vibrancy of city lights."
        },
        {
          id: "2",
          title: "Golden Hour",
          url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
          description: "Portraits taken during the golden hour, showcasing natural beauty."
        }
      ]
    },
    {
      id: "2",
      name: "James Parker",
      role: "Photographer",
      bio: "Exploring the world through the lens, telling stories of life’s beautiful moments.",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
      mail: "james.parker@example.com",
      instagram: "james_in_focus",
      photos: [
        {
          id: "1",
          title: "Urban Jungle",
          url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
          description: "A portrait series set in the urban environment."
        },
        {
          id: "2",
          title: "Natural Beauty",
          url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
          description: "Portraits captured using only natural light."
        }
      ]
    },
    {
      id: "3",
      name: "Emily Roberts",
      role: "Portrait Photographer",
      bio: "Crafting timeless images that evoke emotions and tell stories.",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
      mail: "emily.roberts@gmail.com",
      instagram: "emily.portraits",
      photos: [
        {
          id: "1",
          title: "Candid Moments",
          url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
          description: "Capturing raw, genuine moments that tell a story."
        },
        {
          id: "2",
          title: "Golden Glow",
          url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
          description: "Using golden hour light to bring warmth and glow to portraits."
        }
      ]
    },
    {
      id: "4",
      name: "Michael Lewis",
      role: "Photographer",
      bio: "Exploring the world through photography and capturing the beauty of ordinary moments.",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
      mail: "michael.lewis@example.com",
      instagram: "michael_captures",
      photos: [
        {
          id: "1",
          title: "Street Life",
          url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
          description: "A look at the hustle and bustle of city life."
        },
        {
          id: "2",
          title: "Serene Sunsets",
          url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
          description: "Portraits captured against the backdrop of stunning sunsets."
        }
      ]
    },
    {
      id: "5",
      name: "Sophia Williams",
      role: "Portrait Photographer",
      bio: "Transforming moments into memories with artistic portraiture and creative direction.",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
      mail: "sophia.williams@gmail.com",
      instagram: "sophia_art_photography",
      photos: [
        {
          id: "1",
          title: "Emotional Connection",
          url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
          description: "Portraits that showcase deep emotional connections."
        },
        {
          id: "2",
          title: "Soft Silhouettes",
          url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
          description: "Creating artistic silhouettes that evoke mystery and elegance."
        }
      ]
    },
    {
      id: "6",
      name: "David Carter",
      role: "Photographer",
      bio: "Turning everyday moments into extraordinary art through photography.",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
      mail: "david.carter@example.com",
      instagram: "david_focus",
      photos: [
        {
          id: "1",
          title: "Chasing Shadows",
          url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
          description: "Using shadows creatively to enhance the storytelling in portraits."
        },
        {
          id: "2",
          title: "Timeless Elegance",
          url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
          description: "A series of portraits with a classic, timeless feel."
        }
      ]
    }
  ];
  
  // state to control the selected tab
  const [activeItem, setActiveItem] = useState("View all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <TabContext.Provider
      value={{
        navItems,
        activeItem,
        setActiveItem,
        teamMembers,
        searchQuery,
        setSearchQuery,
      }}
    >
      {props.children}
    </TabContext.Provider>
  );
};
