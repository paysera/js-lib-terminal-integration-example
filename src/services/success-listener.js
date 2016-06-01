(function(){
    'use strict';

    var module = angular.module('<%= identifier %>Integration');

    // service name: uniqueIdentifier + _successListener
    module.factory('<%= identifier %>_successListener', ['$location', 'UniqueIdentifier', function ($location, UniqueIdentifier) {
        var methods = {};

        methods.execute = function (transactionKey, status) {
            $location.path('/' + UniqueIdentifier + '/success/' + transactionKey + '/' + status);
        };

        return methods;
    }]);
})();
