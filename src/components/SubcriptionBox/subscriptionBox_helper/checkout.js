import { loadStripe } from "@stripe/stripe-js";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY;

export async function checkout({lineItems}){

  console.log("stripeKey", stripeKey)

    let stripePromise = null
    const getStripe = ()=>{
        if(!stripePromise){
            stripePromise=loadStripe(stripeKey)
        }
        return stripePromise
    }

    const stripe = await getStripe()

    await stripe.redirectToCheckout({
        mode:"subscription",
        lineItems,
        successUrl: `${window.location.origin}/thank-you`,
        cancelUrl: window.location.origin
    })
}


