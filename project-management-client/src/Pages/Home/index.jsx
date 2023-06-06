import {Link} from 'react-router-dom';

import {useState, useEffect} from 'react'; 

import axios from 'axios';

const API_URL = "http://localhost:5005";

function Home() {
   const [dundies, setDundies] = useState([]);
 
    const getAllDundies = () => {
        axios
          .get(`${API_URL}/dundies`)
          .then((response) => setDundies(response.data))
          .catch((error) => console.log(error));
      };

      useEffect(() => {
        getAllDundies();
      }, [] );

	return (
    <div>
    {dundies.map((dundie) => {
        return dundie.paid? null: 
        (
        <div className="app-main-div" key={dundie._id}>
            <img width="500px" height="300px" src="https://cdn4.whatculture.com/images/2021/01/435d0dc8beaa360e-1200x675.jpg"></img>
            <h3>Dundie Award: {dundie.name} - {dundie.description} </h3>
            <h3>Buy it? That's 10$ Please</h3>
            <Link to={`/payment/${dundie._id}`}>
                <button className="buy-button">Buy</button>
            </Link>
        </div>
        );
      })} 
        
      </div>
	)
}

export default Home