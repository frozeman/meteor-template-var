Works as a wrapper for meteors ReactiveVar, but template instance specific.

Can only be used in template helpers, event handlers, callbacks (created, rendered, destroyed), or autorun.


Installation
============

    $ meteor add frozeman:template-var

Usage
=====

The `TemplateVar` provides reactive variables for template instance specific reactivity.

To set and get properties inside **template helpers**, **callback** or **events** do as follow:

    // set a property
    TemplateVar.set('myProperty', 'myValue');

    // to get it inside a helper, or callback
    TemplateVar.get('myProperty');

In case you want to use the TemplateVar inside a callback where you also have access to the template instance, you can pass the template instance as the first object, as seen below:

	'click .do-something': function(e, template){

		Posts.insert({
			...
		}, function(error){
			if(!error)
				TemplateVar.set(template, 'myVariable', 'myValueToSet');
			else
				alert(error);
		});


	}


API Docs
========

### TemplateVar.get([template], propertyName)

When get is called it creates a `Deps.Dependency.depend()` for that key in the store.


### TemplateVar.set([template], propertyName, value)

When set is called every depending reactive function where `TemplateVar.get()` with the same key is called will rerun.
