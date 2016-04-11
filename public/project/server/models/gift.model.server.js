// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load gift schema
    var GiftSchema = require("./gift.schema.server.js")(mongoose);

    // create gift model from schema
    var GiftModel = mongoose.model('Gift', GiftSchema);

    var api = {
        createGift: createGift,
        findGiftById: findGiftById,
        findAllGiftsByUserId: findAllGiftsByUserId,
    };
    return api;


    function findAllGiftsByUserId (userId) {
        var deferred = q.defer();

        // find all gifts for given user ID
        GiftModel.find({
            user: {$in: userId}
        }, function (err, gifts) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(gifts);
            }
        });

        return deferred.promise;
    }

    // use gift model find by id
    function findGiftById(giftId) {
        var deferred = q.defer();
        GiftModel.findById(giftId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createGift(gift) {

        // use q to defer the response
        var deferred = q.defer();

        // insert new gift with mongoose gift model's create()
        GiftModel.create(gift, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

}
