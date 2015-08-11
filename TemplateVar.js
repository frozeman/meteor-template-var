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

        // try if a template instance was given
        if(_.isObject(givenTemplate) && (givenTemplate.hasOwnProperty('_templateInstance') || givenTemplate.hasOwnProperty('view'))) {

            // if it couldn't get the template, check if a template instance was given.
            if(givenTemplate.hasOwnProperty('_templateInstance'))
                template = givenTemplate;
            else if(givenTemplate.hasOwnProperty('view'))
                template = givenTemplate.view;

        // otherwise try to get one yourself
        } else {
            try {

                if(givenTemplate === 'waiting') {
                    return;
                }

                template = Template.instance().view;
                value = key;
                key = givenTemplate;

            } catch(e) {
                throw new Meteor.Error('TemplateVar: works only from withing template helpers, callbacks or events. Additonally you can pass a template instance as the first parameter.');
            }
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
        

        // build the keyname
        return {
            key: key,
            value: value,
            template: template
        };
    },

    /**
    Gets the template instance form an DOM selector of an element within.

    @method _getTemplateInstance
    @param {String} selector            an element withing the template to get
    @return {Object} The template instace
    **/
    _getTemplateInstanceBySelector: function(selector){

        var element = $(selector)[0];

        // set interval until elemtn appears and re-call funciton????
        if(selector && element && Blaze.getView(element)) {
            var view = Blaze.getView(element);

            // move on view up if its a #with, #if or #unless
            while(view.name.indexOf('Template.') === -1 && view.parentView) {
                view = view.parentView;
            }

            if(!view || !view.templateInstance)
                return;

            // view is not yet rendered, wait for it and recall this function
            if(!view.isRendered) {
                var wait = new ReactiveVar(false);
                // make reactive
                wait.get();
                Blaze.getView($(selector)[0]).onViewReady(function(){
                    if(wait)
                        wait.set(true);
                    wait = null;
                });

                return 'waiting';
            }

            return view.templateInstance();

        } else {
            console.warn('TemplateVar: Couldn\'t find an element within a template matching the selector "'+ selector +'"');
            return null;
        }
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
    },


    /**
    When get is called we use the ReactiveVar.get from the template instance.

    @method get
    @param {Object} selector         a selector of an element within another template
    @param {String} propertyName     The name of the property you want to get. Should consist of the `'myPropertyName'`
    @return {Mixed} The stored value.
    **/
    getFrom: function (selector, propertyName) {
        var template = TemplateVar._getTemplateInstanceBySelector(selector);
        if(!template)
            return;
        var values = TemplateVar._getTemplateInstance(template, propertyName);

        if(values)
            return values.template._templateVar[values.key].get();
    },


    /**
    When set is called every depending reactive function where `TemplateVar.get()` with the same key is called will rerun.

    @method set
    @param {Object} selector         a selector of an element within another template
    @param {String} propertyName     The name of the property you want to get. Should consist of the `'templateName->myPropertyName'`
    @param {String|Object} value     If the value is a string with `rerun`, then it will be rerun all dependent functions where get `TemplateInstance.get()` was called.
    @return undefined
    **/
    setTo: function (selector, propertyName, value) {
        var template = TemplateVar._getTemplateInstanceBySelector(selector);
        if(!template)
            return;
        var values = TemplateVar._getTemplateInstance(template, propertyName, value);

        if(values)
            values.template._templateVar[values.key].set(values.value);
    }
};

// Register Global helpers
/**
Global TemplateVar helper

@method (TemplateVar)
**/
Template.registerHelper('TemplateVar', function(name){
    return {
        get: TemplateVar.get.bind(this, Template.instance()),
        set: TemplateVar.set.bind(this, Template.instance()),
        getFrom: TemplateVar.getFrom.bind(this),
        setTo: TemplateVar.setTo.bind(this)
    };
});
