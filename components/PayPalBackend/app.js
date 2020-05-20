//prettier-ignore

const express = require('express');
const bodyParser = require('body-parser');
const engines = require('consolidate');
const paypal = require('paypal-rest-sdk');

const app = express();

app.engine('ejs', engines.ejs);
app.set('views', './views');
app.set('view engine', 'ejs');
//prettier-ignore
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id':
    'AciBxNdo_8gDqR_suaQEI270tBoi1xqnokqtTX4um8V93gTVgoAAREExANt52BOreDjIXZ4zuEsrw_Lt',
  'client_secret':
    'EOiOrHfW518hqHhZ0mEBL71P8Bl08-KIw_e3SBk4gAeNoanZdQ_1XzLKDLEbxQVNU7yrP_GVIrQ4gsf-',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/paypal', (req, res) => {
  //prettier-ignore
  var create_payment_json = {
    "intent": 'sale',
    "payer": {
      "payment_method": 'paypal',
    },
    "redirect_urls": {
      "return_url": 'http://localhost:4000/success',
      "cancel_url": 'http://localhost:4000/cancel',
    },
    "transactions": [
      {
        "item_list": {
          "items": [
            {
              "name": 'item',
              "sku": 'item',
              "price": '25.00',
              "currency": 'USD',
              "quantity": 1,
            },
          ],
        },
        "amount": {
          "currency": 'USD',
          "total": '25.00',
        },
        "description": 'This is the payment description.',
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log('Create Payment Response');
      console.log(payment);
      res.redirect(payment.links[1].href);
    }
  });
});

app.get('/success', (req, res) => {
  var PayerID = req.query.PayerID;
  var paymentId = req.query.paymentId;
  //prettier-ignore
  var execute_payment_json = {
    "payer_id": PayerID,
    "transactions": [
      {
        "amount": {
          "currency": 'USD',
          "total": '25.00',
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (
    error,
    payment,
  ) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log('Get Payment Response');
      console.log(JSON.stringify(payment));
      res.render('success');
    }
  });
});

app.get('/cancel', (req, res) => {
  res.render('cancel');
});

app.listen(4000, () => {
  console.log('Server is running!');
});
