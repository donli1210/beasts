(function () {
  var libraryStorage = {}

  // Check all items in dependencyArray.
  // Return : true (all available)
  //          false (Not all available)

  function dependencyAvailable (dependencyArray) {

    for (var i = 0; i < dependencyArray.length; i++) {
      if (libraryStorage[dependencyArray[i]] === undefined) {
        return false
      }
    }

    return true
  }

  function saveDependency(libraryName, dependencyArray, callback){

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
  }

  function getDependency(libraryName, dependencyArray, callback){

    libraryStorage[libraryName].counter = 1

    var getDependencyObjArray = libraryStorage[libraryName].dependencyArray.map(function (dependency) {
      return libraryStorage[dependency]
    })

    return libraryStorage[libraryName].callback.apply(null, getDependencyObjArray)

  }

  function librarySystem (libraryName, dependencyArray, callback) {
    // Save the library
    if (arguments.length > 1) {
      // There are dependencies
      if (dependencyArray.length > 0) {
        saveDependency(libraryName, dependencyArray,callback)
      } else {
        // No dependency
        libraryStorage[libraryName] = callback()
      }
    } else {
       // Get the library

       // If there are dependencies are not available when saving to libraryStorage
      if (libraryStorage[libraryName].dependencyArray && libraryStorage[libraryName].counter === 0) {
        return getDependency(libraryName, dependencyArray, callback);
      } else {
        return libraryStorage[libraryName]
      }
    }
  }

  window.librarySystem = librarySystem
})()
