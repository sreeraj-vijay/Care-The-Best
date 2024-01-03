import User from "../Models/UserModel.js";
import Report from "../Models/ReportModel.js";
import asyncHandler from "express-async-handler"
import Payment from "../Models/PaymentModel.js";
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
const stripe = Stripe(process.env.STRIPE_KEY);


const Paymentimplementaion = asyncHandler(async (req, res) => {

  const email = req.body.useremail;
  const animalid = req.body.animal_id;
  const animaldata = await Report.findOne({ _id: animalid });
  const userdata = await User.findOne({ email: email });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'INR',
            product_data: {
              name: animaldata.animal,
              description: animaldata.vaccination,
              district: animaldata.distirct,
              images: [animaldata.image.url],
            },
            unit_amount: 20000,
          },
          quantity: 1,
        },
      ],
      billing_address_collection: 'required',
      customer_email: email,
      client_reference_id: userdata._id, // Replace with a unique identifier for the customer
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/Users/Checkout-Success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while creating the checkout session.' });
  }
})
const sessionStatus = async (req, res) => {
  console.log(req.body)
  console.log(req.body.id)
  const session = await stripe.checkout.sessions.retrieve(req.body.id);
  // console.log("session",session);

  res.send({
    status: session.status,
    paymentId: session.id,
    customer_email: session.customer_details.email,
  });
};
const storeData = asyncHandler(async (req, res) => {
  try {
    console.log(req.body)
    const paymentDetailsString = req.body.paymentDetails;
    const paymentDetails = await JSON.parse(paymentDetailsString);
    const animldata = await Report.findOne({ _id: req.body.animalid })
    if (animldata) {
      const payment = await Payment.create({
        animaltype: animldata.animal,
        paymentStatus: paymentDetails.status,
        paymentId: paymentDetails.paymentId,
        customerEmail: paymentDetails.customer_email
      })
      if (payment) {
        const updateAnimaldetails = await Report.updateOne({ _id: req.body.animalid }, { $set: { adopted: true } })
        res.status(201).json(payment)
      } else {
        res.status(401).json("Payment not completed")
      }

    }
  } catch (error) {
    res.status(401).json("Payment Not completed")
  }

})
export {
  Paymentimplementaion,
  sessionStatus,
  storeData
}