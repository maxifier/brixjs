// Copyright (c) 1999-2014 Maxifier Ltd. All Rights Reserved.

/*jshint globalstrict:true */
"use strict";

var Brix = require('brix');
var Marionette = require('marionette');
var _ = require('underscore');

Brix.SimpleView = Marionette.ItemView.extend({
    initialize: function (options) {
        this.template = options.template;
        this.listenTo(this.model, 'change', this.render);
    }
});

Brix.SimpleView.extend = extend;

var SimpleActivity = Brix.Activity.extend({

    model: null, //by constructor
    template: null, //by constructor

    initialize: function (options) {
        this.model = options.model;
        this.template = options.template;
        this.view = options.view;
    },

    start: function (region, place) {
        this.region = region;
        if (this.view) {
            if (_.isFunction(this.view)) {
                var ViewClass = this.view;
                this.view = new ViewClass({
                    model: this.model
                });
            }
        } else {
            this.view = new Brix.SimpleView({
                model: this.model,
                template: this.template
            });
        }
        this.region.show(this.view);
    }

});

//>>excludeStart('excludeDebug', pragmas.excludeDebug)
SimpleActivity.prototype.name = "SimpleActivity";
//>>excludeEnd('excludeDebug')

module.exports = SimpleActivity;

