"use strict";

(function()
{
    angular
        .module("PollyannaApp")
        .controller("AdminGiftsController", adminGiftsController);

    function adminGiftsController(GiftService, $rootScope)
    {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;

        vm.createGift = createGift;
        vm.removeGift = removeGift;
        vm.selectGift = selectGift;
        vm.updateGift = updateGift;

        function init() {
            GiftService
                .findAllGifts()
                .then(handleSuccess, handleError);
        }
        init();

        function removeGift(gift)
        {
            GiftService
                .deleteGift(gift._id)
                .then(handleSuccess, handleError);
        }

        function updateGift(gift)
        {
            var newGift = {};
            newGift.itemName = gift.itemName;
            newGift.price = gift.price;
            newGift.itemDescription = gift.itemDescription;
            newGift.itemLink = gift.itemLink;
            GiftService
                .updateGift(gift._id, newGift)
                .then(handleSuccess, handleError);
            vm.gift = null;
        }

        function createGift(gift)
        {
            GiftService
                .createGift(gift)
                .then(handleSuccess, handleError);
            vm.gift = null;
        }

        function selectGift(gift)
        {
            vm.gift = angular.copy(gift);
        }

        function handleSuccess(response) {
            vm.gifts = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }
    }
})();