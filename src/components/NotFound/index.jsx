import NavbarComp from "../Navbar/Navbar";
import "./index.css";

const NotFound = () => (
  <>
    <NavbarComp />
    <div className="not-found-route-main-container">
      <div className="not-found-page-container">
        <img
          className="not-found-page-img"
          alt="not found"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        />
        <h1 className="not-found-page-heading">Page Not Found</h1>
        <p
          style={{
            color: "#64748b",
            marginTop: "0px",
            textAlign: "center",
          }}
        >
          we are sorry, the page you requested could not be found.
        </p>
      </div>
    </div>
  </>
);
export default NotFound;
