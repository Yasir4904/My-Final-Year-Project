import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Common/Navbar/Navbar";
import Home from "./Components/pages/Home";
import HotelList from "./Components/HomeSection/HotelList";
import Destinations from "./Components/Destinations/Home";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import SinglePage from "./SinglePage/SinglePage";
import Blog from "./Components/Blog/Blog";
import BlogSingle from "./Components/Blog/blog-single-page/BlogSingle";
import Contact from "./Components/Contact/Contact";
import Footer from "./Common/footer/Footer";
import Login from "./Components/login/Login";
import Register from "./Components/login/Register";
import MyBookings from "./Components/HomeSection/MyBookings";
import Reviews from "./Components/HomeSection/Reviews"; 

// 3 state variables are defined 
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);// stores user login status
  const [bookings, setBookings] = useState([]);// store users bookings
  const [userName, setUserName] = useState(""); // added state for userName
  const history = useHistory();

  //  here user data and bookings are retrieved from  the local storage, and updates the copmonent states accordingly
  useEffect(() => {
    // checks for user key and bookings and updates to show whether user is logged in or not
    const user = localStorage.getItem("user");
    const bookings = localStorage.getItem("bookings");
  
    if (user) {
      setIsLoggedIn(true);
      setUserName(user);
      if (bookings) {
        setBookings(JSON.parse(bookings));
      }
    } else {
      setIsLoggedIn(false); // update isLoggedIn state
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("user", userName);
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [isLoggedIn, userName, bookings]);
  
  // Handles the login by taking user as input which will contain infirmation about the user  
  const handleLogin = (user) => {
    // check if there are existing bookings in localStorage
    const existingBookings = localStorage.getItem("bookings");
    if (existingBookings) {
      setBookings(JSON.parse(existingBookings));
    }
    // set to true to ensure they are logged in
    setIsLoggedIn(true);
    setUserName(user);
    localStorage.setItem("user", user);
    localStorage.setItem("isLoggedIn", "true");
  };

  // Function Handles the log out, the three states are reset to the original value which essentially logs them out. The localstorage.removeitem method is used to remove existing bookings, user and isLoggedin Keys. 
  const handleLogout = () => {
  console.log("Logging out..");
  setIsLoggedIn(false);
  setUserName("");
  setBookings([]);
  localStorage.removeItem("bookings");
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
  history.push("/login");
};

  
//handle booking function, it checks if the user is logged in. If the users logged in it adds bookings to the array of existing bookings
   const handleBooking = (booking) => {
  let updatedBookings = bookings;

  // If the user is not logged in, add the booking to local storage instead of the bookings array
  if (!isLoggedIn) {
    console.log("User is not logged in!!");
    const existingBookings = localStorage.getItem("bookings");
    const newBookings = existingBookings ? [...JSON.parse(existingBookings), booking] : [booking];
    localStorage.setItem("bookings", JSON.stringify(newBookings));
  } else {
    updatedBookings = [...bookings, booking];
    setBookings(updatedBookings);
  }
  
  // Update the bookings array in local storage
  localStorage.setItem("bookings", JSON.stringify(updatedBookings));
};

  return (

    //Route for the site, This is the flow for the website and how different sections interact with each other
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Switch>
          <Route path="/" exact>
            <Home isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/hotels">
            <HotelList bookings={bookings} setBookings={setBookings} />
          </Route>
          <Route path="/destinations" exact>
            <Destinations />
          </Route>
          <Route path="/singlepage/:id">
            <SinglePage />
          </Route>
          <Route path="/blog" exact>
            <Blog />
          </Route>
          <Route path="/blogsingle/:id">
            <BlogSingle />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/login">
            {isLoggedIn ? (
              <Redirect to="/MyBookings" />
            ) : (
              <Login setLoggedIn={setIsLoggedIn} setUserName={setUserName} />
            )}
          </Route>
          <Route path="/register">
             <Register />
          </Route>
            <Route path="/reviews">
             <Reviews />
            </Route>

          <Route path="/MyBookings">
            {isLoggedIn ? (
            <MyBookings bookings={bookings} setBookings={setBookings} />
              ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
