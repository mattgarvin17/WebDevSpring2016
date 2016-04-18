"use strict";

(function()
{
    angular
        .module("PollyannaApp")
        .controller("GiftsController", GiftsController);

    function GiftsController(GiftService, $rootScope)
    {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;

        vm.createGift = createGift;
        vm.removeGift = removeGift;
        vm.selectGift = selectGift;
        vm.updateGift = updateGift;

        function init() {
            GiftService
                .findGiftsByUserId(vm.currentUser._id)
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
            GiftService
                .updateGift(gift._id, gift)
                .then(handleSuccess, handleError);
        }

        function createGift(gift)
        {
            gift.userID = vm.currentUser._id;
            GiftService
                .createGift(gift)
                .then(init, handleError);
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