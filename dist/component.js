"use strict";

define("shared/components/cluster-driver/driver-example/component", ["exports", "shared/mixins/cluster-driver"], function (exports, _clusterDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var LAYOUT = 'PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CgogIHt7IS0tIFRoaXMgY29tcG9uZW50IHNob3dzIGVycm9ycyBwcm9kdWNlZCBieSB2YWxpZGF0ZSgpIGluIHRoZSBjb21wb25lbnQgLS19fQogIHt7dG9wLWVycm9ycyBlcnJvcnM9ZXJyb3JzfX0KCiAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgdGhlIENyZWF0ZSBhbmQgQ2FuY2VsIGJ1dHRvbnMgLS19fQogIHt7c2F2ZS1jYW5jZWwgc2F2ZT0ic2F2ZSIgY2FuY2VsPSJjYW5jZWwifX0KPC9zZWN0aW9uPg==';
  var computed = Ember.computed;
  var observer = Ember.observer;
  var get = Ember.get;
  var set = Ember.set;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  var all = Ember.RSVP.all;
  exports.default = Ember.Component.extend(_clusterDriver.default, {
    driverName: 'example',
    configField: 'exampleEngineConfig',
    app: service(),
    router: service(),
    init: function init() {
      var decodedLayout = window.atob(LAYOUT);
      var template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'shared/components/cluster-driver/driver-example/template'
      });
      set(this, 'layout', template);

      this._super.apply(this, arguments);

      var config = get(this, 'config');
      var configField = get(this, 'configField');

      if (!config) {
        config = this.get('globalStore').createRecord({
          type: configField
        });
        set(this, 'cluster.exampleEngineConfig', config);
      }
    },
    config: alias('cluster.exampleEngineConfig'),
    actions: {
      save: function save() {
        this.send('driverSave');
      },
      cancel: function cancel() {
        get(this, 'router').transitionTo('global-admin.clusters.index');
      }
    },
    validate: function validate() {
      this._super();

      var errors = get(this, 'errors') || [];

      if (!get(this, 'cluster.name')) {
        errors.push('Name is required');
      }

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    }
  });
});
"use strict";

define("ui/components/cluster-driver/driver-example/component", ["exports", "shared/components/cluster-driver/driver-example/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});
define.alias('shared/components/cluster-driver/driver-example/component', 'global-admin/components/cluster-driver/driver-example/component');
