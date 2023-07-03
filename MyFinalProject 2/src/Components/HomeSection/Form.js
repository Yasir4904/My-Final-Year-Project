import axios from "axios"
import React, { useState } from "react"
import Data from "./Data"
import HotelList from "./HotelList"

// defines multiple states for the home component 
const Home = ({ slides }) => {
  const [current, setCurrent] = useState(0)
  const length = slides.length
  const [hotels, setHotels] = useState([]);
  const [searchData, setSearchData] = useState({
    city: "",
    checkIn: "",
    checkOut: "",   
    adults: "",
    children: "",
    rooms: "",
  });
  // 4 states are defined using usestate hook
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // sorts order for the hotel depending on price in ascending order
  const [sortOrder, setSortOrder] = useState("priceAsc");
// updates search data depending on the users input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  // this function handles the search for hotels which it gets using a get request to this link `http://localhost:5001/hotels?city=${searchData.city}&checkIn=${searchData.checkIn}&checkOut=${searchData.checkOut}&adults=${searchData.adults}&children=${searchData.children}&rooms=${searchData.rooms}`);
 // the api displays all the hotels in London
  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.get(`http://localhost:5001/hotels?city=${searchData.city}&checkIn=${searchData.checkIn}&checkOut=${searchData.checkOut}&adults=${searchData.adults}&children=${searchData.children}&rooms=${searchData.rooms}`);
      console.log(response.data);
      //if (response.status === 200) {
      // retrieves the data to the hotel state using set hotels
        setHotels(response.data.message.result.data);
        setShowResults(true); // Set showResults to true
      //}
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching the hotels. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  // function which is used for my filter to sort hotels based on the selected order
  const sortHotels = (sortOrder) => {
    switch (sortOrder) {
      case "priceAsc":
        setHotels((prevHotels) =>
          prevHotels.sort((a, b) => a.price - b.price)
        );
        break;
      case "priceDesc":
        setHotels((prevHotels) =>
          prevHotels.sort((a, b) => b.price - a.price)
        );
        break;
      case "ratingAsc":
        setHotels((prevHotels) =>
          prevHotels.sort((a, b) => a.rating - b.rating)
        );
        break;
      case "ratingDesc":
        setHotels((prevHotels) =>
          prevHotels.sort((a, b) => b.rating - a.rating)
        );
        break;
      case "longitudeAsc":
        setHotels((prevHotels) =>
          prevHotels.sort((a, b) => a.geoCode.longitude - b.geoCode.longitude)
        );
        break;
      case "longitudeDesc":
        setHotels((prevHotels) =>
          prevHotels.sort((a, b) => b.geoCode.longitude - a.geoCode.longitude)
        );
        break;
      case "latitudeAsc":
        setHotels((prevHotels) =>
          prevHotels.sort((a, b) => a.geoCode.latitude - b.geoCode.latitude)
        );
        break;
      case "latitudeDesc":
        setHotels((prevHotels) =>
          prevHotels.sort((a, b) => b.geoCode.latitude - a.geoCode.latitude)
        );
        break;
      default:
        break;
    }
  };
  
// this function handles the change in orders based of the sorting order the user chose. it updates the sort order.
  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortOrder(value);
    sortHotels(value); // this is called with the updated order
  };
 
  

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  return (
    //Below is a search results page
    //loading for loading hotels and and error if they cant be retrieved
    <>
    
      <p>{searchData.city}</p>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {showResults && <HotelList hotels={hotels} />}

      {Data.map((slide, index) => {
        return (
          <div className={index === current ? "slide active" : "slide"} key={index}>
            {index === current && <img src={slide.image} alt='Home Image' />}
          </div>
        )
      })}
      <section className='slide-form'>
        <div className='container'>
          <h2>Have a Look for Your Dream Hotel</h2>
          <form onSubmit={handleSearch}>
            <input type='text' placeholder='Search City' name='city' value={searchData.city} onChange={handleInputChange} />
            <div className='flex_space'>
              <input type='date' placeholder='Check In' name='checkIn' value={searchData.checkIn} onChange={handleInputChange} />
              <input type='date' placeholder='Check Out' name='checkOut' value={searchData.checkOut} onChange={handleInputChange} />
            </div>
            <div className='flex_space'>
              <input type='number' placeholder='Adult(s)(18+)' name='adults' value={searchData.adults} onChange={handleInputChange} />
              <input type='number' placeholder='Children(0- 17)' name='children' value={searchData.children} onChange={handleInputChange} />
            </div>
            <input type='number' placeholder='Rooms' />

            <div className='flex_space'>
              <select name='sort' onChange={handleSortChange}>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="ratingAsc">Rating: Low to High</option>
              <option value="ratingDesc">Rating: High to Low</option>
              <option value="longitudeAsc">Longitude: Low to High</option>
              <option value="longitudeDesc">Longitude: High to Low</option>
              <option value="latitudeAsc">Latitude: Low to High</option>
              <option value="latitudeDesc">Latitude: High to Low</option>
              </select>
              <input type='Submit' value='Search' className='submit' />
            </div>

          </form>
        </div>
      </section>
    </>
  )
}

export default Home
