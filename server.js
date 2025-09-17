import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors())




const razorpay = new Razorpay({
  key_id: "rzp_live_IkKLQEcs0DcLzW",
  key_secret: "AvxAPL8Sw7sUDRgahTWhC1MZ",
});

app.post("/api/create-order", async (req, res) => {
  try {
const data = req.body;
console.log(data);

    if(!data.amount) return res.status(400).json({message: "amount is required"})
    const options = {
      amount: data.amount* 100, // amount in paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order creation failed" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
