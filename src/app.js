(function(){
    'use strict';

    // register empty module
    angular.module('<%= templateModule %>', []);

    var app = angular.module('<%= identifier %>Integration', ['<%= templateModule %>', 'addFundsApp']);

    // unique identifier is used for service name creation
    // if it's changed service name in src/services/success-listener.js should be change accordingly
    app.constant('UniqueIdentifier', '<%= identifier %>');

    app.config(['$routeProvider', 'UniqueIdentifier', function ($routeProvider, UniqueIdentifier) {
        $routeProvider
            .when('/' + UniqueIdentifier + '/fill', {
                templateUrl: UniqueIdentifier + '/fill.html'
            })
            .when('/' + UniqueIdentifier +  '/success/:transactionKey/:status', {
                templateUrl: UniqueIdentifier + '/success.html'
            })
            .when('/' + UniqueIdentifier +  '/amount/:walletId/:amount', {
                templateUrl: UniqueIdentifier + '/amount.html',
                resolve: {
                    helpMessage: function () {
                        return 'help.<%= identifier %>.fill';
                    }
                }
            })
        ;
    }]);

    app.run([
        '$log', 'translator', 'UniqueIdentifier', 'successActions',
        function ($log, translator, UniqueIdentifier, successActions) {
            // register "choice" template, which will be displayed after successful Paysera account fill
            successActions.addTemplateUrl(UniqueIdentifier + '/fill.html');

            // add custom translations, use prefix, add other languages
            translator.add('help.<%= identifier %>.fill', 'Papildymo pagalba');
            translator.add('integration.fill.call_to_action', 'Ar norėtumėte papildyti <strong><< company >></strong> sąskaitą?', 'messages', 'lt');
            translator.add('integration.fill.proceed', 'Taip', 'messages', 'lt');

            translator.add('integration.amount.description', 'Įveskite sumą, kurią norėtumėte pervesti į "<< company >>" sąskaitą', 'messages', 'lt');
            translator.add('integration.amount.form.label', 'Papildymo suma', 'messages', 'lt');
            translator.add('integration.amount.next', 'Toliau', 'messages', 'lt');

            translator.add('integration.success', '<strong><< company >></strong> sąskaita papildyta!', 'messages', 'lt');
            translator.add('integration.success.back', 'Į pradžią', 'messages', 'lt');

            $log.info('Remote module successfully registered!');
        }
    ]);
})();
