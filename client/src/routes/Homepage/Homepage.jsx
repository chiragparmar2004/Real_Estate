import { useContext } from "react";
import SearchBar from "../../components/Searchbar/SearchBar";
import "./Homepage.scss";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Homepage = () => {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);
  const getImages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/images");
      console.log(response.data); // Log the data property of the response
    } catch (error) {
      console.error(error);
    }
  };

  getImages();

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default Homepage;
