"use strict";
(function()
{
    angular.factory("FormsService", []);

    function FormsService($scope)
    {
        $scope.forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ]

        $scope.createFormForUser = createFormForUser;
        $scope.findAllFormsForUser = findAllFormsForUser;
        $scope.deleteFormById = deleteFormById;
        $scope.updateFormById = updateFormById;

        function createFormForUser(userId, form, callback) {
            form._id = (new Date).getTime();
            form.userId = userId;
            $scope.forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            var formIndex;
            for (formIndex in $scope.forms) {
                if (userId == $scope.forms[formIndex]) {
                    userForms.push[$scope.forms[formIndex]];
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback) {
            var formIndex;
            for (formIndex in $scope.forms) {
                if (formId == $scope.forms[formIndex]._id) {
                    $scope.forms.splice(formIndex,1);
                }
            }
            callback($scope.forms)
        }

        function updateFormById(formId, newForm, callback) {
            var formIndex;
            for (formIndex in $scope.forms) {
                if (formId == $scope.forms[formIndex]._id) {
                    $scope.forms[formIndex] = newForm;
                    callback($scope.forms[formIndex]);
                }
            }
            callback(null)
        }

    }
})();
