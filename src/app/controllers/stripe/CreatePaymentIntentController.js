import Stripe from "stripe";
import * as yup from "yup";
import 'dotenv/config';

const STRIPE_SECRET_KEY = globalThis?.process?.env?.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  throw new Error("❌ STRIPE_SECRET_KEY não definida no arquivo .env");
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {

});

const calculateOrderAmount = (items) => {
  const total = items.reduce((acc, current) => acc + current.price * current.quantity, 0);
  return Math.round(total); 
};

class CreatePaymentIntentController {
  async store(req, res) {
    const schema = yup.object().shape({
      products: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.number().required(),
            price: yup.number().required(),
            quantity: yup.number().required(),
          })
        )
        .required(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { products } = req.body;
    const amount = calculateOrderAmount(products);

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "brl",
        automatic_payment_methods: { enabled: true },
      });

      return res.json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("❌ Erro Stripe:", error.message);
      return res.status(500).json({ error: "Erro ao criar pagamento no Stripe" });
    }
  }
}

export default new CreatePaymentIntentController();
