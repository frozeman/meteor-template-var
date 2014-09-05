// "use strict";


// // TemplateSession - _getKeyName(id, propertyName)

// Tinytest.add('TemplateSession package - _getKeyName() should generate and return a key name > eg: default_testPropertyName if the id paramter is not set.', function(test) {

//     // Run the function
//     var generatedKeyName = TemplateSession._getKeyName('testPropertyName');

//     // Then run the test
//     test.equal(generatedKeyName, 'default_testPropertyName');

// });

// Tinytest.add('TemplateSession package - _getKeyName() should generate and return a key name > eg: myId12345_testPropertyName if the id paramter is set to myId12345.', function(test) {

//     // Run the function
//     var generatedKeyName = TemplateSession._getKeyName('myId12345', 'testPropertyName');

//     // Then run the test
//     test.equal(generatedKeyName, 'myId12345_testPropertyName');

// });

// Tinytest.add('TemplateSession package - _getKeyName() should generate and return a key name > eg: myId12345_testPropertyName if the id paramter is an object.', function(test) {

//     // Dummy ID object
//     var id = {
//         data: {
//             _id: 'myId12345'
//         }
//     }

//     // Run the function
//     var generatedKeyName = TemplateSession._getKeyName(id, 'testPropertyName');

//     // Then run the test
//     test.equal(generatedKeyName, 'myId12345_testPropertyName');

// });


// // TemplateSession -> get(id, propertyName, options)

// Tinytest.add('TemplateSession package - get() should create a Deps.Dependency.depend() for that key in the store with options added.', function(test) {

//     // Dummy data
//     var options = {
//         reactive: true
//     };

//     // We need to run the set() function first
//     TemplateSession.set('test', 'testPropertyName', 'testValue', options);

//     // Run the function
//     var keyValue = TemplateSession.get('test', 'testPropertyName', options);

//     // Then run the tests

//     // Checking that the TemplateSession keys with index of "test_testPropertyName" is a Deps.Dependency
//     test.instanceOf(TemplateSession.deps['test_testPropertyName'], Deps.Dependency);

//     // Now checking that the correct value is returned
//     test.equal(keyValue, 'testValue');

//     // @TODO: Check that depend() was called on the dependency which will need a second copy of this test

// });


// // TemplateSession -> set(id, propertyName,value, options)

// Tinytest.add('TemplateSession package - set() When set is called every depending reactive function where `TemplateSession.get()` with the same key is called will rerun.', function(test) {

//     var options = {
//         reactive: true
//     }

//     // Call the function
//     TemplateSession.set('test', 'testPropertyName', 'testValue', options);

//     // The run our tests

//     // Checking that the TemplateSession.deps[test_testPropertyName] has been set as a Deps.Dependency
//     test.instanceOf(TemplateSession.deps['test_testPropertyName'], Deps.Dependency);

//     // Check that TemplateSession.keys['test_testPropertyName'] has been set to 'testValue'
//     test.equal(TemplateSession.keys['test_testPropertyName'], 'testValue');

//     // @TODO: Check that changed() has been called on the Deps.Dependency at the key name if the options parameter has been set

// });


// // TemplateSession -> unset(id, propertyName, options)

// Tinytest.add('TemplateSession package - unset() should clear a set property.', function(test) {

//     // First call the set() function
//     TemplateSession.set('test', 'testPropertyName', 'testValue');

//     // Then check the values are present
//     test.instanceOf(TemplateSession.deps['test_testPropertyName'], Deps.Dependency);
//     test.equal(TemplateSession.keys['test_testPropertyName'], 'testValue');

//     // Now call the unset() function with the same keys as above
//     TemplateSession.unset('test', 'testPropertyName');

//     // Then check they have been deleted (they equate to false)
//     test.isFalse(TemplateSession.deps['test_testPropertyName']);
//     test.isFalse(TemplateSession.keys['test_testPropertyName']);

// });


// // TemplateSession ->unsetAll(propertyName, options)

// Tinytest.add('TemplateSession package - unsetAll() should clear all instances of a set property.', function(test) {

//     // First, call the set() function
//     TemplateSession.set('test', 'testPropertyName', 'testValue');

//     // Then check the values are present
//     test.instanceOf(TemplateSession.deps['test_testPropertyName'], Deps.Dependency);
//     test.equal(TemplateSession.keys['test_testPropertyName'], 'testValue');

//     // Now call the unsetAll() function
//     TemplateSession.unsetAll('test_testPropertyName');

//     // Then check they have been deleted (they equate to false)
//     test.isFalse(TemplateSession.deps['test_testPropertyName']);
//     test.isFalse(TemplateSession.keys['test_testPropertyName']);

// });




