import React from "react";
import Navbar from "../Components/Menu/Navbar";
import Sidebar from "../Components/Menu/Sidebar";
import SecondNav from "../Components/Header/SecondNav";
import SecondSidebar from "../Components/Header/SecondSidebar";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
        <Sidebar />
        <Navbar />
        <SecondNav />
        <SecondSidebar />
    </div>
  );
};

export default Home;