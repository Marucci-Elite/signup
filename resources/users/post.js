var Cim = require('authnet').cim;
var config = {
  "authId": "3ea3GYy9TwUS",
  "authKey": "7tyy8JL5s4g3E9W7"
};


var client = Cim({ id: config.authId, key: config.authKey });
var self = this;
var profile = {
  refId: +new Date(),
  email: this.email

};

var errorTest = this.error;


var _error = error;

// Call function 1
client.createCustomerProfile(profile, function (err, res){

   var payment = {
       refid: profile.refId,
       customerProfileId: res.customerProfileId,
       customerType:'individual',
       billTo: {
           firstName: self.firstName,
           lastName: self.lastName,
           address: self.address,
           city: self.city,
           state: self.state,
           zip: Number(self.zip)
       },
       payment:{
       creditCard: {
        cardNumber: self.ccNumber, //370000000000002,
           cardCode: self.cvv,
           expirationDate: self.expYear + '-' + self.expMonth
       }
       }
   };
   // Call function 2
   client.createPaymentProfile(payment, function (err, res){

   var authAndCapture = {
       refid: profile.refId,
       customerProfileId: payment.customerProfileId,
       customerPaymentProfileId: res.customerPaymentProfileId,
       transactionType: 'authCapture',
       amount: self.amount

       };
       // Call function 3
   client.createAuthAndCaptureTransaction(authAndCapture, function (err, res){

       });

   });

});