var express = require('express');
var router = express.Router();
var braintree = require('braintree');

router.get('/', function(req, res, next) {
	var gateway = braintree.connect({
		environment: braintree.Environment.Sandbox,
		merchantId: 'pkz3mj2rrtx56jh2',
		publicKey: '9trwdw23zrzxmyh3',
		privateKey: 'cd41a695eb75290727171a88d37299f0'
	});

	gateway.clientToken.generate({}, function (err, response) {
		res.send(response.clientToken);
	});
});

module.exports = router;