(function(){
    'use strict';

    angular.module('<%= identifier %>Integration').controller('AmountSelectController', AmountSelectController);

    AmountSelectController.$inject = ['$location', '$routeParams', 'UniqueIdentifier', 'customBackend', 'keyboardConfigProvider'];

    function AmountSelectController ($location, $routeParams, UniqueIdentifier, customBackend, keyboardConfigProvider) {
        var vm = this;

        vm.keyboardConfig = keyboardConfigProvider.getNumericKeyboardConfig();
        vm.walletId = $routeParams.walletId;
        vm.amount = $routeParams.amount;
        vm.errors = [];

        vm.transfer = function () {
            vm.errors = [];
            customBackend
                .createTransaction(vm.walletId, vm.amount)
                .then(function (transactionKey) {
                     // redirect to transaction page
                     $location.path('/transaction/' + UniqueIdentifier + '/' + transactionKey + '/' + vm.walletId);
                }, function (response) {
                    console.log('error');
                    console.log(response);

                    //TODO: return error code and localize
                    vm.errors.push(error);
                }
            );
        };
    }
})();
