var mongoose      = require("mongoose");

module.exports = function() {

    // load gift schema
    var GiftSchema = require("./gift.schema.server.js")(mongoose);

    // create gift model from schema
    var GiftModel = mongoose.model('Gift', GiftSchema);

    var api = {
        createGift: createGift,
        updateGift: updateGift,
        deleteGift: deleteGift,
        findAllGifts: findAllGifts,
        findGiftById: findGiftById,
        findAllGiftsByUserId: findAllGiftsByUserId
    };
    return api;

    function createGift(gift) {
        return GiftModel.create(gift);
    }

    function updateGift(giftID, gift) {
        return GiftModel.update({_id: giftID}, {$set: gift});
    }

    function deleteGift(giftID) {
        return GiftModel.remove({_id: giftID});
    }

    function findAllGifts() {
        return GiftModel.find();
    }

    function findGiftById(giftID) {
        return GiftModel.findById(giftID);
    }

    function findAllGiftsByUserId(userID) {
        return GiftModel.find({userID: userID});
    }

}
