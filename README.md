Works as a wrapper for meteors ReactiveVar, but template instance specific.

Can only be used in template helpers, event handlers, callbacks (created, rendered, destroyed), or autorun.


Installation
============

    $ meteor add frozeman:template-var

Usage
=====

The `TemplateVar` provides reactive variables for template instance specific reactivity.

To set and get properties inside template `helpers`, `callbacks` or `events` do as follow:

    // set a property
    TemplateVar.set('myProperty', 'myValue');

    // to get it inside a helper, or callback
    TemplateVar.get('myProperty');

In case you want to use the TemplateVar inside a callback where it can't get the template instance automatically
you can pass the template instance as the first object, as seen below:

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

When get is called it creates a `ReactiveVar` for that `propertyName` tied to the current template instance which it got using `Template.instance()`.


### TemplateVar.set([template], propertyName, value)

When the value is changed it will call every depending reactive function where `TemplateVar.get()` with the same `propertyName` was called.
