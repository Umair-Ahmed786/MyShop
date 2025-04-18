import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  let location = useLocation();




  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Memon Store</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          {/* <span className="navbar-toggler-icon"></span> */}
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li> */}

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/items" ? "active" : ""}`} to="/items">Items</Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/sales" ? "active" : ""}`} to="/sales">Sales</Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/monthlysales" ? "active" : ""}`} to="/monthlysales">Monthly_Sales</Link>
            </li>

            {/* <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li> */}
          </ul>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
