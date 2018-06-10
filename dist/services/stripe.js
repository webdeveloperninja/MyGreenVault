const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);
const planId = 'green-vault-basic';
module.exports.createSubscription = (token, email) => {
    return createCustomer(email, token).then((customer) => createStripeSubscription(customer.id));
};
function createCustomer(email, token) {
    return new Promise((resolve, reject) => {
        stripe.customers.create({
            description: email,
            source: token
        }, (err, customer) => {
            if (err) {
                reject(err);
            }
            resolve(customer);
        });
    });
}
function createStripeSubscription(customer) {
    return new Promise((resolve, reject) => {
        stripe.subscriptions.create({
            customer: customer,
            items: [
                {
                    plan: planId
                }
            ]
        }, function (err, subscription) {
            if (err) {
                reject(err);
            }
            resolve(subscription);
        });
    });
}
//# sourceMappingURL=stripe.js.map