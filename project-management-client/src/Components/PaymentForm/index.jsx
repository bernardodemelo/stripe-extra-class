import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useEffect } from 'react';


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

function PaymentForm(props) {
    // write State
    const [success, setSuccess] = useState(false);
    const [dundie, setDundie] = useState(null);
    // Initialize Stripe
    const stripe = useStripe()
    //Initialize Stripe Elements
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            // payment Method Id
            const {id} = paymentMethod
            console.log(dundie);
            const response = await axios.post("http://localhost:5005/payment", {
                // defines the price in cents (500 = 5EUR)
                amount: 500,
                id,
                dundie
            })

            if(response.data.success) {
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

useEffect(()=> {             
    setDundie(props.prize);
  }, [props] );
 

    return (
        <div>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
        :
       <div>
           <h2>You just bought an incredible Dundie. Congrats!</h2>
       </div> 
        }
            
        </div>
    )
}

export default PaymentForm;