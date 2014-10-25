Timer.js
========

## About

Timer.js uses requestAnimationFrame and performance.now()

## Examples

### Create instance

```
// run someCallback once in 0.5 seconds from start()
var timer = new Timer(someCallback, 0.5); // behaves like setTimeout
timer.start();  // init the timer
```

### Limit number of executions of the callback

```
// executes someCallback every 1 second until timer is destroyed
var timer = new Timer(someCallback, 1, {loop:true});  // behaves like setInterval
timer.start()...

...timer.destroy();
```


### Limit number of executions of the callback

```
// executes someCallback 10 times (once/second)
var timer = new Timer(someCallback, 1, {count:10});
timer.start();
```

# Reference

#####pause
 - Pauses timer instance
 

#####start
 - Starts timer instance


#####resume
 - Resumes timer from pause (same as start)


#####destroy
 - destroys timer instance
 - happens automagically when a count is specified
