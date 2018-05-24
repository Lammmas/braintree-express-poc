var express = require('express');
var router = express.Router();
var braintree = require('braintree');

router.post('/', function(req, res, next) {
  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'pkz3mj2rrtx56jh2',
    publicKey: '9trwdw23zrzxmyh3',
    privateKey: 'cd41a695eb75290727171a88d37299f0'
  });

  // Use the payment method nonce here
  var nonceFromTheClient = req.body.paymentMethodNonce;
  var userData = req.body.userData ? req.body.userData : {};
  const randAmount = Math.round(Math.random() * 10000) / 100;
  // Create a new transaction for $10
  var newTransaction = gateway.transaction.sale({
    merchantAccountId: 'gbptestco',
    amount: randAmount.toString(),
    paymentMethodNonce: nonceFromTheClient,
    billing: userData.billingAddress,
    lineItems: [
      {
        description: 'This is an amazing description',
        kind: 'debit',
        name: 'Item Name',
        quantity: 1,
        totalAmount: randAmount,
        unitAmount: randAmount
      }
    ],
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, function(error, result) {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

module.exports = router;