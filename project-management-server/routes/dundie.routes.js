const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

const Dundie = require('../models/Dundie.model');

router.get("/dundies", async (req, res) => {
	try {
		let dundiesAwards = await Dundie.find(); 

		res.json(dundiesAwards);

	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Failed Operation",
		})
	}
})

router.get("/dundies/:dundieId", async (req, res) => {
	const {dundieId} = req.params;
	try {
		let dundieAward = await Dundie.findById(dundieId); 

		res.json(dundieAward);

	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Failed Operation",
		})
	}
})

router.post("/payment", async (req, res) => {
	let { amount, id, dundie } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "EUR",
			description: dundie.name,
			payment_method: id,
			confirm: true
		}); 

		await Dundie.findByIdAndUpdate(dundie._id, 
		 {currency: payment.currency, paid: payment.created}
		)

		// check the payment object
        console.log(payment);
		
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

module.exports = router;
