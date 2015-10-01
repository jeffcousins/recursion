// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(input) {
  function recursion(obj) {
    var allKeys = Object.keys(obj);
    if (allKeys[0] === undefined) {
      return '{}';
    }

    var result = [];
    for (var i = 0; i < allKeys.length; i++) {
      var key = allKeys[i];
      var val = obj[key];
      var strKey = '"' + key + '":';
      var strVal = '';
      if (typeof val === 'string') {
        strVal = '"' + val + '"';
      } else if (typeof val === 'boolean' ||
                 typeof val === 'number'  ||
                        val === null        ) {
        strVal += val;
      } else if (val === undefined || typeof val === 'function') {
        continue;
      } else if (typeof val === 'object') {
        if (Array.isArray(val)) {
          strVal += arrays(val);
        } else {
          strVal += recursion(val);
        }
      }
      result.push(strKey + strVal);
    }

    return '{' + result.join(',') + '}';
  }

  function arrays(arr) {
    var currentArray = [];

    for (var i = 0; i < arr.length; i++) {
      if (typeof arr[i] === 'string') {
        currentArray.push('"' + arr[i] + '"');
      } else if (arr[i] === undefined) {
        currentArray.push(null);
      } else if (typeof arr[i] === 'object') {
        if (Array.isArray(arr[i])) {
          currentArray.push(arrays(arr[i]));
        } else {
          currentArray.push(recursion(arr[i]));
        }
      } else {
        currentArray.push(arr[i]);
      }
    }

    return '[' + currentArray.join(',') + ']';
  }

  if (typeof input === 'string') {
    return '"' + input + '"';
  } else if (typeof input === 'boolean' ||
             typeof input === 'number'  ||
                    input === null        ) {
    return '' + input;
  } else if (input === undefined || typeof input === 'function') {
    return undefined;
  } else if ( typeof input === 'object') {
    if (Array.isArray(input)) {
      return arrays(input);
    } else {
    return recursion(input);
    }
  }
};