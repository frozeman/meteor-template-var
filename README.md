Works as a wrapper for meteors ReactiveVar, but template instance specific.

Can only be used in template helpers, event handlers, callbacks (created, rendered, destroyed), or autorun.


Installation
============

    $ meteor add frozeman:template-var

Usage
=====

The `TemplateVar` provides reactive variables for template instance specific reactivity.

To set and get properties inside template `onRendered`, `onCreated`, `onDestroyed`, `helpers` or `events` do as follow:

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

### From other templates

If you want to set the TemplateVar of another template, than you're currently in you can use the `TemplateVar.getFrom` and `TemplateVar.setTo` method:

    // set a property in another template
    TemplateVar.setTo('div.elementInTheOtherTemplate', 'myProperty', 'myValue');

    // to get it from another template
    TemplateVar.getFrom('div.elementInTheOtherTemplate', 'myProperty');


API Docs
========

### TemplateVar.get([template], propertyName)

Gets the value of an `ReactiveVar` for that `propertyName` tied to the current template instance which it got using `Template.instance()`.
If you pass an optional template instance it will use this one to get the ReactiveVar from instead.


### TemplateVar.set([template], propertyName, value)

When the value of the ReactiveVar bound to this template instance changes it will call every depending reactive function where `TemplateVar.get()` with the same `propertyName` was called.
Optionally you can pass a template instance yourself to use this one to set the ReactiveVar to.

### TemplateVar.getFrom(selector, propertyName)

Same as `TemplateVar.get`, but will get the template instance through an DOM selector of an element of the targeted template instance.

### TemplateVar.setTo(selector, propertyName, value)

Same as `TemplateVar.set`, but will get the template instance through an DOM selector of an element of the targeted template instance.


