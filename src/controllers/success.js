(function(){
    'use strict';

    angular.module('<%= identifier %>Integration').controller('<%= identifier %>SuccessController', Controller);

    Controller.$inject = ['$routeParams'];

    function Controller ($routeParams) {
        var vm = this;

        console.log([$routeParams.transactionKey, $routeParams.status]);

        //TODO: fetch transaction by key, extract needed info from transaction inquiries
        //TODO: display additional info by status code - was transaction successful, was user found by inquired info?
    }
})();
