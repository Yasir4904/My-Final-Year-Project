import React from "react"
import "./Footer.css"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container grid'>
          <div className='box'>
            <h2>ABOUT US</h2>
           
            <div className='icon flex_space'>
              <i className='fab fa-facebook-f'></i>
              <i className='fab fa-twitter'></i>
              <i className='fab fa-linkedin'></i>
              <i className='fab fa-instagram'></i>
              <i className='fab fa-pinterest'></i>
              <i className='fab fa-youtube'></i>
            </div>
          </div>

          

          <div className='box post'>
            <h2>RECENT POSTS</h2>
            <ul>
              <li>
                <p></p>
                <label className='fa fa-calendar-alt'></label>
                <span>01 May 2023</span>
              </li>
              <li>
                <p></p>
                <label className='fa fa-calendar-alt'></label>
                <span>01 May 2023</span>
              </li>
              <li>
                <p></p>
                <label className='fa fa-calendar-alt'></label>
                <span>01 May 2023</span>
              </li>
            </ul>
          </div>

          <div className='box'>
        
            

            
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>© 2023 All Rights Reserved.</p>
      </div>
    </>
  )
}

export default Footer
