(function(){
    angular
        .module("PollyannaApp")
        .factory("GiftService", giftService);

    function giftService($http, $rootScope) {
        var api = {
            newGift: newGift,
            getGift: getGift,
            getAllGiftsByUserId: getAllGiftsByUserId

        };
        return api;

        function newGift(gift) {
            return $http.post("/api/pollyanna/newGift", gift);
        }

        function getGift(giftId) {
            return $http.get("/api/pollyanna/gift/"+giftId)
        }

        function getAllGiftsByUserId() {
            return $http.get("/api/pollyanna/user/"+$rootScope.currentUser._id+"/gifts")
        }

    }
})();
