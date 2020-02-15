import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../store/actions/authAction";

const Payments = props => (
  <StripeCheckout
    name="Emaily"
    description="$5 for 5 email credits"
    token={token => props.handleToken(token)}
    amount={500}
    stripeKey={process.env.REACT_APP_STRIPE_KEY}
  >
    <button className="btn">Add Credits</button>
  </StripeCheckout>
);

export default connect(null, actions)(Payments);
