(function () {
  var libraryStorage = {}


  function getDependency(libraryName){

    var getDependencyObjArray = [];

    libraryStorage[libraryName].runCounter = 1;

    // Stop condition for the resursive call.
    if(libraryStorage[libraryName].dependencyArray.length === 0){
      return libraryStorage[libraryName].callback();
    }else{
      getDependencyObjArray = libraryStorage[libraryName].dependencyArray.map(function (dependency) {
        return librarySystem(dependency);
      });
    }

    return libraryStorage[libraryName].callback.apply(null, getDependencyObjArray);

  }

  /**
  *
  * Library Object to store dependency array and callback function.
  * 
  * @param {dependencyArray} dependency array
  * @param {callback} callback function
  * 
  */

  function Library(dependencyArray, callback){

    this.dependencyArray = dependencyArray;
    this.callback = callback;
    this.runCounter = 0;

  }

  /**
  *
  * librarySystem return callback function based on passed in dependency array
  * 
  * @param {String} library Name
  * @param {array} dependency Array
  * @param {function} callback
  * @return {function} callback function 
  */

  function librarySystem (libraryName, dependencyArray, callback) {
    // Save the library
    if (arguments.length === 3) {

      libraryStorage[libraryName] = new Library(dependencyArray, callback);
    
    } else if(arguments.length===1) {
       // Get the library
       // If there are dependencies are not available when saving to libraryStorage
      if (libraryStorage[libraryName].dependencyArray && libraryStorage[libraryName].runCounter === 0) {

        return getDependency(libraryName);

      }

    } else{
       throw new TypeError('Invalid arguments. librarySystem must be invoked in either store or load mode.');
    }
  }

  window.librarySystem = librarySystem
})()
