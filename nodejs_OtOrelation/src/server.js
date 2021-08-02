const mongoose = require("mongoose");

const Customer = require("./models/Customer").Customer;

const Identifier = require("./models/Identifier");

mongoose.
    connect("mongodb://localhost/openstack", {
        useNewUrlParser:    true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Successfully connect to mongoDB"))
    .catch(err => console.error("connect error", err));

const createCustomer = function(name,age,gender){
    const customer = new Customer({
        name,age,gender
    });

    return customer.save();
}

const createIdentifier = function(cardCode, customer){
    const identifier = new Identifier({cardCode,customer});
    return identifier.save();
};

// createCustomer("FOMAdo",39,"M")
//     .then(customer => {
//         console.log("> Create new Customer\n", customer);

//         // const customerId = customer._id.toString();
//         return createIdentifier(
//             customer._id.toString().substring(0,10).toUpperCase(),
//             customer);

//     })
//     .then(identifier => {console.log("> Create new identifier\n", identifier)})
//     .catch(err => {console.log(err)});

    const showAllIdentifier = async function() {
        const identifiers = await Identifier.find();
      
        console.log("> All Identifiers\n", identifiers);
      };
showAllIdentifier;



