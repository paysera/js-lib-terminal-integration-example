(function(){
    'use strict';

    angular.module('<%= identifier %>Integration').controller('FillController', FillController);

    FillController.$inject = ['UniqueIdentifier', '$routeParams', '$location'];

    function FillController (UniqueIdentifier, $routeParams, $location) {
        var vm = this;

        vm.yes = function () {
            // redirect to amount selection
            $location.path('/' + UniqueIdentifier + '/amount/' + $routeParams.walletId + '/' + $routeParams.amount);
        };
    }
})();
