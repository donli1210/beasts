// Beasts Question No. 4

// Creating libraries out of order

// https://github.com/gordonmzhu/beasts/issues/3

(function () {
  var libraryStorage = {}

  // Check all items in dependencyArray.
  // Return : true (all available)
  //          false (Not all available)

  function dependencyAvailable (dependencyArray) {
    /*
    dependencyArray.forEach(function(dependency) {

      if (libraryStorage[dependency] === undefined) {
        // This return is not working. Can not return false from function dependencyAvailable
        // Only return from forEach function. Can not use forEach here.
        return false;
      }

    });
    */

    for (var i = 0; i < dependencyArray.length; i++) {
      if (libraryStorage[dependencyArray[i]] === undefined) {
        return false
      }
    }

    return true
  }

  function librarySystem (libraryName, dependencyArray, callback) {
    // Save the library
    if (arguments.length > 1) {
      // There are dependencies
      if (dependencyArray.length > 0) {
        // all dependencies are available.
        if (dependencyAvailable(dependencyArray)) {
          var dependencyObjArray = dependencyArray.map(function (dependency) {
            return libraryStorage[dependency]
          })

          libraryStorage[libraryName] = callback.apply(null, dependencyObjArray)
        } else {
          // Not all dependencies are available
          libraryStorage[libraryName] = {
            dependencyArray: dependencyArray,
            callback: callback,
            counter: 0
          }
        }
      } else {
        // No dependency
        libraryStorage[libraryName] = callback()
      }
    } else {
       // Get the library

       // If there are dependencies are not available when saving to libraryStorage
      if (libraryStorage[libraryName].dependencyArray && libraryStorage[libraryName].counter === 0) {

        libraryStorage[libraryName].counter = 1

        var getDependencyObjArray = libraryStorage[libraryName].dependencyArray.map(function (dependency) {
          return libraryStorage[dependency]
        })

        return libraryStorage[libraryName].callback.apply(null, getDependencyObjArray)
      } else {
        return libraryStorage[libraryName]
      }
    }
  }

  window.librarySystem = librarySystem
})()
