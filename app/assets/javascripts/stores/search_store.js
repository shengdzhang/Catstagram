(function() {
  'use strict';
  var CHANGE_EVENT = "CHANGE_EVENT";

  var _results = [];

  function resetResults(results) {
    _results = results;
    SearchStore.changed();
  }

  window.SearchStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _results.slice();
    },
    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },
    changed: function () {
      this.emit(CHANGE_EVENT);
    },
    dispatcherId: AppDispatcher.register(function (action) {
      switch (action.actionType) {
        case SearchConstants.RECEIVED_USER_SEARCH_RESULTS:
          resetResults(action.results);
          break;
      }
    })
  });
}());
