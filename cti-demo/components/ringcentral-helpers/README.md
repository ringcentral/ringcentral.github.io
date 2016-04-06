# Installation

SDK can be used in 2 environments:

1. [Browser](#1-set-things-up-in-browser)
2. [NodeJS](#1-set-things-up-in-nodejs)

## 1. Set things up in Browser

### 1.1. Get the code

Pick the option that works best for you:

- **Preferred way to install SDK is to use Bower**, all dependencies will be downloaded to `bower_components` directory:

    ```sh
    bower install ringcentral-helpers --save
    ```Bower
    
- Donwload everything manually *(not recommended)*:
    - [ZIP file with source code](https://github.com/ringcentral/ringcentral-js/archive/master.zip)
    - [ZIP file with source code](https://github.com/ringcentral/ringcentral-js-helpers/archive/master.zip)

## 1.2.a. Add scripts to HTML page

You can use bundle version (with PUBNUB and ES6 Promise included in main file).

Add this to your HTML:

```html
<script type="text/javascript" src="path-to-scripts/ringcentral-helpers/build/ringcentral-helpers.js"></script>
```

Use the object:

```js
var helpers = RingCentral.Helpers;
```

## 1.2.b. Set things up in Browser (if you use RequireJS in your project)

```js
// Add this to your RequireJS configuration file
require.config({
    paths: {
        'ringcentral-helpers': 'path-to-scripts/ringcentral-helpers/build/ringcentral-helpers',
    }
});

// Then you can use the SDK like any other AMD component
require(['ringcentral-helpers'], function(helpers) {
    // your code here
});
```

## 2. Set things up in NodeJS

1. Install the NPM package:

    ```sh
    npm install ringcentral-helpers --save
    ```

2. Require the SDK:

    ```js
    var helpers = require('ringcentral-helpers');
    ```
    
***

# Helpers

## Abstract

The SDK provides a variety of different helpers to make it easier to alter, save, load, and delete data objects and
otherwise interact with the features of the API. Helpers are plain JavaScript objects that contain functions and useful
properties (e.g. constants).

## Basic Functionality

All helpers are extensions to the base `Helper` object and have all of its functions, plus some overrides and extra
functionality. See the documentation for each particular helper for information on available options and methods.

Following is a deeper look at the `CallHelper` object.

### Create a URL

```js
helpers.call().createUrl(options, id);
```

Creates a URL that can be provided to the `Platform#apiCall()` method. Creation algorithm is based on options:

* `{personal: true}` - Call log of the currently logged in extension
* `{extensionId: '12345'}` - Call log of extension with the id `12345` (the logged in user must have admin permissions)

Following are some example calls, along with the URLs that they would return:

```js
helpers.call().createUrl(); // '/account/~/extension/~/call-log'
helpers.call().createUrl({personal: true}); // '/account/~/extension/~/call-log'
helpers.call().createUrl({extensionId: '12345'}); // '/account/~/extension/12345/call-log'
helpers.call().createUrl({extensionId: '12345'}, '67890'); // '/account/~/extension/12345/call-log/67890'
```

### Check if an object exists on the server

```js
helpers.call().isNew(object);
```

If the object exists on the server, then the `isNew` method will return false. The object is considered not new if it
has both ID and URI properties - this usually means that the object was returned from the server.

```js
helpers.call().isNew({}); // false
helpers.call().isNew({id: '67890'}); // false
helpers.call().isNew({uri: '/account/~/extension/12345/call-log/67890'}); // false
helpers.call().isNew({id: '67890', uri: '/account/~/extension/12345/call-log/67890'}); // true
```

### Filter an array of objects

```js
helpers.call().filter(options);
```

`CallHelper#filter(options)` returns a preconfigured function that can be used for the `fn` argument when calling the
`filter` method (`Array.prototype.filter(fn)`) on an array of calls. The behavior of the filter may vary depending on
the `options` argument.

```js
// calls in an array of Call Log calls
var callsFilteredByDirection = calls.filter(Call.filter({direction: 'Inbound'}));
var callsFilteredByType = calls.filter(Call.filter({type: 'Voice'}));
```

### Sort an array of objects

```js
helpers.call().comparator(options);
```

`CallHelper#comparator(options)` returns a preconfigured function that can be used for the `fn` argument when calling
the `sort` method (`Array.prototype.sort(fn)`) on an array of calls. The behavior of the filter may vary depending on
the `options` argument. By default, values are extracted simply as `item[options.sortBy]` as strings and sorted as
strings. Custom `options.extractFn` and `options.compareFn` functions may be specified.

```js
// calls in an array of Call Log calls
var callsSortedByStartTime = calls.sort(Call.comparator({sortBy: 'startTime'})); // or any other property
var callsSortedByDuration = calls.sort(Call.comparator({
    compareFn: rcsdk.getList().numberComparator // compare as numbers
})); // or any other property

// filter and sort can be combined
var inboundCallsSortedByStartTime = calls
    .filter(Call.filter({direction: 'Inbound'}))
    .sort(Call.comparator({sortBy: 'startTime'}));
```

### Special methods - Get pre-configured Subscription objects for endpoints

These methods will provide `Subscription` objects with pre-bound events.

```js
var subscription = helpers.presence().addEventsToSubscription({detailed: true}, '~');
```

```js
var subscription = helpers.message().addEventsToSubscription();
```

Once you have a `Subscription` object, all you need to do next is register it by calling its `register` method:

```js
subscription.register();
```

### Special methods - Convert ActiveCalls array of Presence into regular Calls

Assume that `presence` is an object returned by one of Presence endpoints.

```js
var calls = helpers.call().parsePresenceCalls(presence.activeCalls);
```

### Full Example

For this example, AngularJS will be used.

```js
var platform = sdk.platform(),
    Call = helpers.call();

$scope.calls = [];
$scope.nextPageExists = true;
$scope.queryParams = {page: 1, perPage: 'max'}; // page and perPage may be set from template

$scope.requestNextPage = function() { // can be called from template to request next page
    $scope.queryParams.page++;
    loadCalls();
};

function loadCalls() {

    platform.send(Call.loadRequest(null, {
        query: $scope.queryParams,
    })).then(function(response) {

        $scope.calls = response.data.records
            .filter(Call.filter({direction: 'Inbound'}))
            .sort(Call.comparator({sortBy: 'startTime'}));

        $scope.nextPageExists = Call.nextPageExists(response.data); // feed raw data from server to helper function

    }).catch(function(e) {
        alert('Error', e.message);
    });

}

loadCalls();
```

***

# Model Relations

## Abstract

The SDK allows easy establishment of relationships between objects, such as between a Message object and its associated
Contact objects, or a Presence object and its associated Extension object. How the relationship is resolved varies
across different types of objects. The resolving function is provided by helper objects of a certain type.

## Relationship

Models have relationships to other models.

In many cases, model relationships are merely through properties of a model that identify other models. The data for the
associated child models is not contained inside the data for the model and would need to be loaded with separate
requests to the server. This type of relationship is considered a weak relationship. To use an example, both the Message
and Call models have relationships to the Contact model. Associated models should be loaded separately and may be
assigned to appropriate properties dynamically on the client based upon some criteria through helpers.

In some cases, models may actually contain other models. In such cases, the data for the associated child models will be
contained inside the model's data in the form of a property. The server returns the data for the model and its contained
child models within the same API call. As examples of this, the Presence model contains an `extension` property and the
Account model contains an `operator` property, and these properties are both references to contained models of type
`IExtensionShort`.

## Examples

### Abstract CallerInfo types and Contacts

```js
var contacts = [{homePhone: '+(1)foo'}, ...], // homePhone may be formatted
    callerInfos = [{phoneNumber: '1foo'}, ...]; // phoneNumber is not formatted

helpers.contact().attachToCallerInfos(callerInfos, contacts);
```

Each `callerInfo` object will get the new properties:
 
1. `contact` &mdash; matching contact
2. `contactPhone` &mdash; entry from `contact` that matched `phoneNumber` 

### Messages / Calls and Contacts

For Messages and Calls, optimized helper functions may be used: 

```js
messages = helpers.message().attachContacts(contacts, messages);
calls = helpers.call().attachContacts(contacts, calls);
```

This will internally fetch a list of `callerInfos` and attach appropriate contacts to them.

### Presence and Extensions

`Presence` information may be attached to `extensions`, for example, when the application has loaded a list of
extensions and a list of their associated presence. Each `extension` will be given a new `presence` property, which will
link to the presence object for the extension.

```js
extensions = helpers.presence().attachToExtensions(extensions, presences);
```

