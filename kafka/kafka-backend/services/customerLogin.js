const Customers = require('../Models/Customer');
const bcrypt = require('bcrypt');

function handle_request(msg, callback){
    var res={};
    console.log("Inside customerLogin kafka backend");
    console.log(msg);
    var email = msg.email;
    Customers.findOne({ Email: msg.email }, async function (err, result) {
      if (err) {
        console.log('Mongo Error:', err);
        res.status = 205;
        res.message = 'mongo error';
        callback(null, res);
      }
      console.log(result);
      if (result) {
        const isSame = await bcrypt.compare(msg.password, result.Password);
        console.log(isSame);
        if (isSame === true) {
          console.log("login successfull!");
        //   res.cookie("cookie", "customer-admin", {
        //     maxAge: 3600000,
        //     httpOnly: false,
        //     path: "/",
        //   });
          resjson = {
            idCustomers: result._id.toString(),
            password: result.Password,
          };
          res.status = 200;
          res.data=resjson;
          callback(null, res);
        }
        else {
          console.log('Error:', err);
          res.status = 205;
          res.message = 'unable to login error1';
          callback(null, res);
      }
    }
      else {
        console.log('Error2:', err);
        res.status = 205;
        res.message = 'unable to login error2';
        callback(null, res);
      }
    });
    console.log("after callback");
};

exports.handle_request = handle_request;
