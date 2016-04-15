"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($scope, $rootScope, FormsService) {

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.form;

        function addForm(form) {
            function callback(object) {
                return object;
            }
            FormsService.createFormForUser($rootScope.user, form, callback);
        }

        function updateForm(formId, form) {
            function callback(object) {
                return object;
            }
            FormsService.updateFormById(formId, form, callback);
        }

        function deleteForm(formId) {
            function callback(object) {
                return object;
            }
            FormsService.deleteFormById(formId, callback);
        }

        function selectForm(formIndex) {
            function callback(object) {
                return object;
            }
            $scope.form = FormsService.findAllFormsForUser($rootScope.user._id, callback)[formIndex];
        }

    }
})();