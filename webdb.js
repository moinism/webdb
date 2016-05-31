(function (root, factory) {
  "use strict";
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.webdb = factory(root));
    });
  } else {
    root.webdb = factory(root);
  }
}(typeof window !== 'undefined' ? window : this, function (root, undefined) {

  "use strict";

  if(!('openDatabase' in window)) {
    throw Error('WebSQL is not supported in this browser/device.');
  }

  var
    globalOpts = {
      version: 0.1,
      dbSize: 65536,
      shortName: 'webdbjs',
      displayName: 'WebDB.js Default Database'
    },
    lastRes = null,
    globalResolve = null,
    globalReject  = null,
    callbacks = {
      success: function (tx, res) {
        lastRes = res;
        globalResolve(tx, res);
      },
      error: function (tx, err) {
        globalReject(tx, err);
        console.log(tx, err);
      }
    },
    _currentDB = null;

  var webdb = {

    connect: function (opts) {
      opts = opts || globalOpts;  // if not present, fallback to defualts
      _currentDB = openDatabase(
                                opts.shortName || globalOpts.shortName,
                                opts.version || globalOpts.version,
                                opts.displayName || globalOpts.displayName,
                                opts.dbSize || globalOpts.dbSize
                              );

      return this;
    },
    run: function (sql, params, succesCB, errorCB) {
      params = params || [];

      globalResolve = succesCB || function() {};
      globalReject  = errorCB  || function() {};

      _currentDB.transaction(function(tx) {
        tx.executeSql(sql, params, callbacks.success, callbacks.error);
      });

      return this;
    },
    each: function (cb) {
      var referrence = this;

      if(lastRes == null) {
        return setTimeout(function () {
          referrence.each(cb);
        }, 100);
      }

      var len = lastRes.rows.length;

      for (var i = 0; i < len; i++) {
        cb(lastRes.rows[i]);
      }

      return this;
    }

  };

  return webdb;

}));
