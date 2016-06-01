(function(){
    'use strict';

    var module = angular.module('<%= identifier %>Integration');

    module.factory('customBackend', ['$q', '$http', function ($q, $http) {
        var methods = {};

        methods.createTransaction = function (walletId, amount) {
            //TODO: use your own backend url for transaction creation
            return $http.post(
                'https://localhost:4000/create-transaction',
                {
                    'wallet_id': walletId,
                    'amount': amount
                }
            ).then(
                function (response){
                    // always return transaction key
                    return response.data.transaction_key;
                }, function (response) {
                    return response;
                }
            );
        };

        return methods;
    }]);
})();
