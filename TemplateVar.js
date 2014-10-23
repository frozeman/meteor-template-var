/**
Template helpers

@module package frozeman:template-var
**/


/**
The `TemplateVar` provides reactive variables for template instances.

Note! The reactive variables, are not preserved over hot code reloads, like the Meteor `Session` object does.


To set and get properties inside template helpers, hooks and events do as follow:

    // set a property
    TemplateVar.set('myProperty', 'myValue');

    // to get it inside a helper, or callback
    TemplateVar.get('myProperty');


@class TemplateVar
@constructor
**/
TemplateVar = {

    /**
    Gets the current template instance and returns also the correct keys and values.

    @method _getTemplateInstance
    @param {Object} givenTemplate            the current template
    @param {String} key                 the given key
    @param {Mixed} value                the value to set
    @return {String} The generated key name.
    **/
    _getTemplateInstance: function(givenTemplate, key, value){
        var template = null;

        try {
            template = Template.instance().view;
            value = key;
            key = givenTemplate;

        } catch(e) {
            // if it couldn't get the template, check if a template instance was given.
            if(givenTemplate.hasOwnProperty('view'))
                template = givenTemplate.view;
            else
                throw new Error('TemplateVar works only from withing template helpers, hooks or events');
        }
        // move on view up if its a #with, #if or #unless
        while(template.name.indexOf('Template.') === -1 && template.parentView) {
            template = template.parentView;
        }

        // make sure the template session object exists
        if(template && !template._templateVar)
            template._templateVar = {};

        // create Reactive var, if not existing
        if(template && !template._templateVar[key])
            template._templateVar[key] = new ReactiveVar(value);
console.log({
            key: key,
            value: value,
            template: template
        });

        // build the keyname
        return {
            key: key,
            value: value,
            template: template
        };
    },


    // PUBLIC

    /**
    When get is called we use the ReactiveVar.get from the template instance.

    @method get
    @param {Object} template            the current template
    @param {String} propertyName     The name of the property you want to get. Should consist of the `'myPropertyName'`
    @return {Mixed} The stored value.
    **/
    get: function (template, propertyName) {
        var values = TemplateVar._getTemplateInstance(template, propertyName);

        return values.template._templateVar[values.key].get();
    },


    /**
    When set is called every depending reactive function where `TemplateVar.get()` with the same key is called will rerun.

    @method set
    @param {Object} template            the current template
    @param {String} propertyName     The name of the property you want to get. Should consist of the `'templateName->myPropertyName'`
    @param {String|Object} value     If the value is a string with `rerun`, then it will be rerun all dependent functions where get `TemplateInstance.get()` was called.
    @return undefined
    **/
    set: function (template, propertyName, value) {
        var values = TemplateVar._getTemplateInstance(template, propertyName, value);

        values.template._templateVar[values.key].set(values.value);
    }

};
