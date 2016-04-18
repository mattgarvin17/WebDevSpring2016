(function(){
    angular
        .module("PollyannaApp")
        .factory("GiftService", giftService);

    function giftService($http, $rootScope) {
        var api = {
            createGift: createGift,
            updateGift: updateGift,
            deleteGift: deleteGift,
            findAllGifts: findAllGifts,
            findGiftById: findGiftById,
            findGiftsByUserId: findGiftsByUserId

        };
        return api;

        function createGift(gift) {
            return $http.post("/api/pollyanna/gift", gift);
        }

        function updateGift(giftID, gift) {
            return $http.put("/api/pollyanna/gift/"+giftID, gift);
        }

        function deleteGift(giftID) {
            return $http.delete("/api/pollyanna/gift/"+giftID);
        }

        function findAllGifts() {
            return $http.get("/api/pollyanna/gift");
        }

        function findGiftById(giftID) {
            return $http.get("/api/pollyanna/gift/"+giftID);
        }

        function findGiftsByUserId(userID) {
            return $http.get("/api/pollyanna/gift/user/"+userID);
        }
    }
})();