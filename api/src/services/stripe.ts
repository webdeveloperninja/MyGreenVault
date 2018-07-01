const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);

const planId = 'green-vault-basic';

module.exports.createSubscription = (token: any, email: any) => {
  return createCustomer(email, token).then((customer: any) => createStripeSubscription(customer.id));
};

function createCustomer(email: any, token: any) {
  return new Promise((resolve, reject) => {
    stripe.customers.create(
      {
        description: email,
        source: token
      },
      (err: any, customer: any) => {
        if (err) {
          reject(err);
        }
        resolve(customer);
      }
    );
  });
}

function createStripeSubscription(customer: any) {
  return new Promise((resolve, reject) => {
    stripe.subscriptions.create(
      {
        customer: customer,
        items: [
          {
            plan: planId
          }
        ]
      },
      function(err: any, subscription: any) {
        if (err) {
          reject(err);
        }
        resolve(subscription);
      }
    );
  });
}
