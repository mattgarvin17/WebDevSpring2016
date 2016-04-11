module.exports = function(mongoose) {

    // use mongoose to declare a group schema
    var GiftSchema = mongoose.Schema({
        _id: String,
        // userID of owner
        user: String,
        price: String,
        itemName: String,
        itemDescription: String,
        itemLink: String

    }, {collection: 'pollyanna.gift'});

    return GiftSchema;

};

