var mongoose = require('mongoose');

module.exports = function(app, giftModel) {

    app.post("/api/pollyanna/gift", createGift);
    app.put("/api/pollyanna/gift/:id", updateGift);
    app.delete("/api/pollyanna/gift/:id", deleteGift);
    app.get("/api/pollyanna/gift", findAllGifts);
    app.get("/api/pollyanna/gift/:id", findGiftById);
    app.get("/api/pollyanna/gift/user/:id", findAllGiftsByUserId);



    function createGift(req, res) {
        var newGift = req.body;
        if(newGift.members && newGift.members.length > 1) {
            newGift.members = newGift.members.split(",");
        } else {
            newGift.members = [];
        }
        giftModel.createGift(newGift)
            .then(
                function (gift) {
                    return giftModel.findAllGifts();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (gifts) {
                    res.json(gifts);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



    function updateGift(req, res) {
        var newGift = req.body;

        giftModel.updateGift(req.params.id, newGift)
            .then(
                function(gift){
                    return giftModel.findAllGifts();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(gifts){
                    res.json(gifts);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function deleteGift(req, res) {
        giftModel
            .removeGift(req.params.id)
            .then(
                function(gift){
                    return giftModel.findAllGifts();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(gifts){
                    res.json(gifts);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllGifts(req, res) {
        giftModel.findAllGifts()
            .then(
                function(gifts){
                    res.json(gifts);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findGiftById(req, res) {
        giftModel.findGiftById(req.params.id)
            .then(
                function(gift){
                    res.json(gift);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findAllGiftsByUserId(req, res) {
        giftModel.findAllGiftsByUserId(req.params.id)
            .then(
                function(gifts){
                    res.json(gifts);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }
}
