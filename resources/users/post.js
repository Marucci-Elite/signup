var Cim = require('authnet').cim;
var config = {
  "authId": "3ea3GYy9TwUS",
  "authKey": "7tyy8JL5s4g3E9W7"
};

var client = Cim({ id: config.authId, key: config.authKey });
var self = this;
var profile = {
  refId: +new Date(),
  email: this.email //+ +new Date(), // rand email
    //dateOfBirth:  this.dateOfBirth,
//  ccNumber: Number(this.ccNumber),
//  expMonth: this.expMonth,
//  expYear: this.expYear,
//  cvv: Number(this.cvv),
//  payment: creditCardSimpleType,
// description: {JSON.stringify(this);},
//  amount: Number(parseInt(this.membership) + parseInt(this.merch)),

};

// Call function 1
client.createCustomerProfile(profile, function (err, res){
//  var res = { refId: 1361526470368,
//  messages:
//   { resultCode: 'Ok',
//     message: { code: 'I00001', text: 'Successful.' } },
//  customerProfileId: 12621026,
//  customerPaymentProfileIdList: {},
//  customerShippingAddressIdList: {},
//  validationDirectResponseList: {},
//  error: 'Successful.',
//  code: 'I00001' }
    console.log('\n\n','======================== createCustomerProfile=======================');
    console.log(err, res);
    console.log('=============================================== ','\n\n');
    console.log(res.messages);
    // set data
    console.log(typeof res.customerProfileId);
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
            expirationDate: self.expYear +'-'+ ((self.expMonth < 10) ? ( '0'+ self.expMonth ) : self.expMonth)
        }
        }
    };
    console.log(payment);
    // Call function 2
    client.createPaymentProfile(payment, function (err, res){
    console.log('\n\n','======================== createPaymentProfile=======================');
    console.log(err, res);
    console.log('=============================================== ','\n\n');

    var authAndCapture = {
        refid: profile.refId,
        customerProfileId: payment.customerProfileId,
        customerPaymentProfileId: res.customerPaymentProfileId,
        transactionType: 'authCapture',
        amount: self.membership
    };

    // Call function 3
    client.createAuthAndCaptureTransaction(authAndCapture, function (err, res){
            console.log('\n\n','======================== createAuthAndCaptureTransaction=======================');
    console.log(err, res);
    console.log('=============================================== ','\n\n');
        });
    });

});