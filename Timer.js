(function(name, global, definition){
	if (typeof module !== "undefined" && module.exports) { 
		module.exports = definition();
	} else if (typeof define === "function" && define.amd) {
		define(definition);
	} else { 
		global[name] = definition();
	}
})("Timer", this, function(){
	"use strict";

	global.requestAnimationFrame = global.requestAnimationFrame || (function(){
		return  global.webkitRequestAnimationFrame ||
				global.mozRequestAnimationFrame    ||
				function( callback ){ global.setTimeout(callback, 1000 / 60); };
	})();

	global.cancelAnimationFrame = global.cancelAnimationFrame || (function(){
		return  global.webkitCancelAnimationFrame ||
				global.mozCancelAnimationFrame    ||
				function( timer ){ global.clearTimeout(timer); };
	})();

	global.performance = global.performance || {};
	performance.now = (function() {
		return 	performance.now       ||
				performance.mozNow    ||
				performance.msNow     ||
				performance.oNow      ||
				performance.webkitNow ||
				function() { return new Date().getTime(); };
	})();

	function Timer(callback, duration, vars) {

		var vars = vars || {},
		scope = vars.scope || arguments.callee.caller || this,
		count = vars.count || 1,
		params = vars.params || [],
		loop = vars.loop || false,
		paused = true,
		duration = (duration * 1000),
		iterations = 0,
		rAF,
		startTime;

		function step() {
			currentTime = performance.now();
			var elapsed = currentTime - startTime;
			if(durationIsComplete(elapsed) && !paused) onComplete();
		}

		function onComplete() {
			callback.apply(scope, params);
			startTime = performance.now();
			iterations++;
		}

		function durationIsComplete(elapsed) {
			var tolerance = 2,
				timeRemaining = duration - elapsed;
			if(timeRemaining < tolerance && timeRemaining > -tolerance) {
				return true;
			} else if(timeRemaining < -tolerance) {
				return true;
			}
			return false;
		}

		function loopCheck() {
			if(loop && !paused) {
				step();
				rAF = requestAnimationFrame(loopCheck);
			} else if(!loop) {
				if(iterations < count) {
					step();
					rAF = requestAnimationFrame(loopCheck);
				} else {
					destroy();
				}
			}
		}

		function destroy() {
			paused = true;
			cancelAnimationFrame(rAF);
			callback = undefined;
			duration = undefined;
		}

		function start() {
			paused = false;
			startTime = performance.now();
			rAF = requestAnimationFrame(loopCheck);
		}

		return {
			start: start,
			resume: start,
			pause: function pause() { paused = true },
			destroy: destroy
		}
	}

	return Timer;

});