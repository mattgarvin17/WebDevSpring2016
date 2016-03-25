(function()
{
    angular
        .module("PollyannaApp")
        .controller("GiftsController", GiftsController);

    function GiftsController($scope)
    {
        $scope.giftSuggestions = [
            {email:"bobboberson@gmail.com", itemName:"T-shirt", itemDescription:"Like a shirt but with shorter sleeves", price:"$30"},
            {email:"bobboberson@gmail.com", itemName:"iTunes Giftcard", itemDescription:"Giftcard for iTunes", price:"$20"},
            {email:"bobboberson@gmail.com", itemName:"Sunglasses", itemDescription:"Polarized lenses", price:"$50"}
        ];

        $scope.addGiftSuggestion = addGiftSuggestion;
        $scope.removeGiftSuggestion = removeGiftSuggestion;
        $scope.selectGiftSuggestion = selectGiftSuggestion;
        $scope.updateGiftSuggestion = updateGiftSuggestion;

        function updateGiftSuggestion(giftSuggestion)
        {
            $scope.giftSuggestions[$scope.selectedGiftSuggestionIndex] = {
                email: giftSuggestion.email,
                itemName: giftSuggestion.itemName,
                itemDescription: giftSuggestion.itemDescription,
                price: giftSuggestion.price
            };
        }

        function selectGiftSuggestion(index)
        {
            $scope.selectedGiftSuggestionIndex = index;
            $scope.giftSuggestion = {
                email: $scope.giftSuggestions[index].email,
                itemName: $scope.giftSuggestions[index].itemName,
                itemDescription: $scope.giftSuggestions[index].itemDescription,
                price: $scope.giftSuggestions[index].price
            };
        }

        function removeGiftSuggestion(giftSuggestion)
        {
            var index = $scope.giftSuggestions.indexOf(giftSuggestion);
            $scope.giftSuggestions.splice(index, 1);
        }

        function addGiftSuggestion(giftSuggestion)
        {
            var newGiftSuggestion = {
                email: giftSuggestion.email,
                itemName: giftSuggestion.itemName,
                itemDescription: giftSuggestion.itemDescription,
                price: giftSuggestion.price
            };
            $scope.giftSuggestions.push(newGiftSuggestion);
        }
    }
})();