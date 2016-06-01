Terminal integration example
============================

This is example code for Paysera terminal integration based on [angular js](https://angularjs.org/), [angular ui](https://angular-ui.github.io/bootstrap/) and [twitter bootstrap](http://getbootstrap.com/).

Environment
-----------

We're using NodeJS and Gulp to build application, so make sure your machine has NodeJS and NPM. To install Gulp locally run following:

* clone code `git clone https://github.com/paysera/js-lib-terminal-integration-example.git`
* `cd js-lib-terminal-integration-example`
* run `npm install`

Building and development
------------------------

* Build your app with `npm run build` command. Build output is in `/dist/integration.js` file.

During development execute `./node_modules/gulp/bin/gulp.js watch` command so all changes will be compiled to output file in real time.
Do not forget to change "identifier" variable value to something else than "acme" in gulpfile.js.
This value is used to namespace integration module so it won't clash with other integrations.

Server
------

Compiled module must be available via *https*, so we're using lightweight NodeJS server:
In order to run server execute: `npm run dev`

Your build file should be available in [https://localhost:3000/dist/integration.js](https://localhost:3000/dist/integration.js)

Integrate your app with terminal frontend
-----------------------------------------

To integrate changes with terminal server application:

* Navigate to [https://terminal.paysera.com/lt/sandbox/add-funds/](https://terminal.paysera.com/lt/sandbox/add-funds/)
* Open browser console and run following: `angular.element(document.querySelector('html')).injector().get('$ocLazyLoad').load('https://localhost:3000/dist/integration.js');`
* Check browser console for message indicating successful integration

Lazy loader will add your code to latest version of terminal frontend and you can start debugging with simulated backend.

Dummy data
----------

Terminal frontend sandbox environment has mock backend with predefined success and failure scenarios.
To "find" dummy account by different identifiers enter following:
* by phone: *3706*, any other value will result in "Account not found" message.
* by email: *test@evp.lt*.
* by account number: *EVP1* or *LT1*.
* by company code: *000*.

On cash in step add funds to terminal by executing `window.terminalFrontend.dispatch('terminal.moneyAmountChanged', [100, 'EUR']);` in browser console.