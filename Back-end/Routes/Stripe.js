import express from 'express';
const Paymentrouter = express.Router()
import { Paymentimplementaion,sessionStatus,storeData } from '../Controllers/PaymentControllers.js';

Paymentrouter.post('/create-checkout-session',Paymentimplementaion) 
Paymentrouter.post('/session-status',sessionStatus)
Paymentrouter.post('/Storedata',storeData)

export default  Paymentrouter
