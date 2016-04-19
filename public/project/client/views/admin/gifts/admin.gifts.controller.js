"use strict";

(function()
{
    angular
        .module("PollyannaApp")
        .controller("AdminGiftsController", AdminGiftsController);

    function AdminGiftsController(GiftService, $rootScope)
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
            GiftService
                .updateGift(gift._id, gift)
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