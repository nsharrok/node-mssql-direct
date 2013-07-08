(function() {
  var Base, extend, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  extend = require('extend');

  _ = require('lodash')._;

  module.exports = Base = (function() {

    Base.prototype._defaults = function() {
      return {};
    };

    function Base(options) {
      this._handleError = __bind(this._handleError, this);
      this._defaults = __bind(this._defaults, this);      this.config = extend(true, {}, this._defaults(), options);
      if (this.initialize) {
        this.initialize();
      }
      return;
    }

    /*
    	## _handleError
    	
    	`basic._handleError( cb, err [, data] )`
    	
    	Baisc error handler. It creates a true error object and returns it to the callback, logs it or throws the error hard
    	
    	@param { Function|String } cb Callback function or NAme to send it to the logger as error 
    	@param { String|Error|Object } err Error type, Obejct or real error object
    	
    	@api private
    */


    Base.prototype._handleError = function(cb, err, data) {
      var _err;
      if (data == null) {
        data = {};
      }
      if (_.isString(err)) {
        _err = new Error();
        _err.name = err;
        _err.message = data || "unkown";
        _err.customError = true;
      } else {
        _err = err;
      }
      if (_.isFunction(cb)) {
        cb(_err);
      } else if (_.isString(cb)) {
        console.error("error", cb, _err);
      } else {
        throw _err;
      }
    };

    return Base;

  })();

}).call(this);