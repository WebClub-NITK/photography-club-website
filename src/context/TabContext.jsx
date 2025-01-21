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

  // the team members detail(may come from some CMS in future)
  const teamMembers = [
    {
      id: "1",
      name: "Emily Donnavan",
      role: "Product Lead",
      team: "Management",
      imageUrl: "/src/assets/images/placeholder.jpg?height=400&width=300",
    },
    {
      id: "2",
      name: "Jessica Dobrev",
      role: "Backend Lead",
      team: "Management",
      imageUrl: "/src/assets/images/placeholder.jpg?height=400&width=300",
    },
    {
      id: "3",
      name: "Drew Cano",
      role: "Head of UX",
      team: "Operations",
      imageUrl: "/src/assets/images/placeholder.jpg?height=400&width=300",
    },
    {
      id: "4",
      name: "Emily Donnavan",
      role: "Product Lead",
      team: "Photographers",
      imageUrl: "/src/assets/images/placeholder.jpg?height=400&width=300",
    },
    {
      id: "5",
      name: "Jessica Dobrev",
      role: "Backend Lead",
      team: "Design",
      imageUrl: "/src/assets/images/placeholder.jpg?height=400&width=300",
    },
    {
      id: "6",
      name: "Drew Cano",
      role: "Head of UX",
      team: "Design",
      imageUrl: "/src/assets/images/placeholder.jpg?height=400&width=300",
    },
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
