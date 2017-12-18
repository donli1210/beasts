/*
* @param {object} parent object
* @param {object} child object
* @return {Boolean} true  : if first parameter is the prototype of second parameter. 
*                   false : if first parameter is not the prototype of second parameter. 
*/
function isPrototypeOf(protoObj, obj) {
  if (typeof obj === 'undefined' || obj === null || typeof obj !== 'object') {
    throw new TypeError('Second parameter can not be empty.');
  }
  if (typeof protoObj === 'undefined' || protoObj === null || typeof protoObj !== 'object') {
    throw new TypeError('First parameter can not be empty');
  }

  // Loop obj all prototype hierarchy
  if(Object.getPrototypeOf(obj)) {
    if (protoObj === Object.getPrototypeOf(obj)) {
      return true;
    } else {

      // Recursive
      return isPrototypeOf(protoObj, Object.getPrototypeOf(obj));
    }
  } else {

    // Recursive stop condition.
    return false;
  }
}