module.exports = function(app, giftModel) {
    app.post("/api/pollyanna/newGift", newGift);
    app.get("/api/pollyanna/user/:userId/gifts", allGifts);
    app.get("/api/pollyanna/gift/:giftId", getGift);

    function newGift(req, res) {
        var gift = req.body;

        gift = giftModel.createGift(gift)
            // handle model promise
            .then(
                // return group if promise resolved
                function (doc) {
                    gift = doc;
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function allGifts(req, res) {
        var userId = req.params.userId;
        var gifts = null;

        giftModel.findAllGiftsByUserId(userId)
            .then(
                function (doc) {
                    gifts = doc;
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getGift(req, res) {
        var giftId = req.params.giftId;
        var gift = null;

        giftModel.findGiftById(giftId)
            .then(
                function (doc) {
                    gift = doc;
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

}
