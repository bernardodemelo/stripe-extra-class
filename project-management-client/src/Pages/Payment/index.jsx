import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "../../Components/PaymentForm";
import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

// Public Key to be published 
const PUBLIC_KEY = "TO FILL WITH YOUR PUBLISHABLE KEY"

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const API_URL = "http://localhost:5005";

function Payment() {
	const [dundie, setDundie] = useState(null);
	
	const { dundieId } = useParams();
	
	const getDundie = () => {        
    axios
      .get(`${API_URL}/dundies/${dundieId}`)
      .then((response) => {
        const oneDundie = response.data;
        setDundie(oneDundie);
      })
      .catch((error) => console.log(error));
  };

  useEffect(()=> {             
    getDundie();
  }, [] );
	return (
    // Elements Stripe loaded with Test Mode
		<Elements stripe={stripeTestPromise}>
			<PaymentForm prize={dundie} />
		</Elements>
	)
}

export default Payment