import React, { useState } from "react"
import "../../App.css"
import Hero from "../HomeSection/Hero"
import MostPopular from "../HomeSection/popular/MostPopular"
import DestinationHome from "../HomeSection/Destina/DestinationHome"
import Works from "../HomeSection/Works/Works"
import Gallery from "../HomeSection/gallery/Gallery"
import HotelList from '../HomeSection/HotelList';
import Form from '../HomeSection/Form';


const Home = () => {
  const [hotels, setHotels] = useState([]);

  return (
    <>
      <Hero/>
      <Form slides={[]}/>
      <HotelList hotels={hotels} setHotels={setHotels} />
      <MostPopular />
      <DestinationHome />
      <Works />
      <Gallery />
    </>
  )
}

export default Home
