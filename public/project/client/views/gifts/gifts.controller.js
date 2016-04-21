"use strict";

(function()
{
    angular
        .module("PollyannaApp")
        .controller("GiftsController", giftsController);

    function giftsController(GiftService, $rootScope)
    {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.createGift = createGift;
        vm.removeGift = removeGift;
        vm.selectGift = selectGift;
        vm.updateGift = updateGift;

        function init() {
            $rootScope.errorMessage = null;
            GiftService
                .findGiftsByUserId(vm.currentUser._id)
                .then(handleSuccess, handleError);
        }
        init();

        function removeGift(gift)
        {
            GiftService
                .deleteGift(gift._id)
                .then(init, handleError);
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
                .then(init, handleError);
            vm.gift = null;

        }

        function createGift(gift)
        {
            gift.userID = vm.currentUser._id;
            if (!gift.itemName) {
                $rootScope.errorMessage = "Must provide at least an item name."
            }
            else {
                GiftService
                    .createGift(gift)
                    .then(init, handleError);
                vm.gift = null;
            }
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
