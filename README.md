Timer.js
========

## About

Timer.js uses requestAnimationFrame and performance.now()   

## Examples

### Create instance

```
// run someCallback every 0.5 seconds
var timer = new Timer(someCallback, 0.5);
timer.start();  // init the timer
```

### Limit number of executions of the callback

```
var timer = new Timer(someCallback, 1, {count:10}); // executes someCallback 10 times (once/second)
timer.start;
```

## Reference
