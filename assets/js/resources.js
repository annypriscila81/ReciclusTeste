/* Resources.js
 *
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times. */

(() => {

  const loading = [];
  const resourceCache = {};
  const readyCallbacks = [];

  /* This is the publicly accessible image loading function. It accepts
    * an array of strings pointing to image files or a string for a single
    * image. It will then call our private image loading function accordingly. */
  load = (urls) => {

    if(urls instanceof Array) urls.forEach(url => _load(url));
    else _load(urls);
  }

  /* This is our private image loader function, it is
    * called by the public image loader function. */
  _load = (url) => {

    if(resourceCache[url]) {

      /* If this URL has been previously loaded it will exist within
        * our resourceCache array. Just return that image rather
        * re-loading the image. */
      return resourceCache[url];

    } else {

      /* This URL has not been previously loaded and is not present
        * within our cache; we'll need to load this image. */
      const image = new Image();
      image.onload = () => {

        /* Once our image has properly loaded, add it to our cache
          * so that we can simply return this image if the developer
          * attempts to load this file in the future. */
        resourceCache[url] = image;

        /* Once the image is actually loaded and properly cached,
          * call all of the onReady() callbacks we have defined. */
        if(isReady()) { readyCallbacks.forEach(func => func())}
      };

      /* Set the initial cache value to false, this will change when
        * the image's onload event handler is called. Finally, point
        * the image's src attribute to the passed in URL. */
      resourceCache[url] = false;
      image.src = url;
    }
  }

  /* This is used by developers to grab references to images they know
    * have been previously loaded. If an image is cached, this functions
    * the same as calling load() on that URL. */
  get = (url) => {
    return resourceCache[url];
  }

  /* This function determines if all of the images that have been requested
    * for loading have in fact been properly loaded. */
  isReady = () => {

    let ready = true;

    for(let key in resourceCache) {
      if(resourceCache.hasOwnProperty(key) && !resourceCache[key]) ready = false;
    }

    return ready;
  }

  /* This function will add a function to the callback stack that is called
    * when all requested images are properly loaded. */
  onReady = (func) => {
    readyCallbacks.push(func);
  }

  /* This object defines the publicly accessible functions available to
    * developers by creating a global Resources object. */
  window.Resources = {
    load,
    get,
    onReady,
    isReady
  };
})();
