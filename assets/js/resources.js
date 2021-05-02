/* Resources.js
 *
 * Isto é apenas um utilitário para carregamento de imagens. 
 * 
 * Além de facilitar o carregamento de imagens, ele também inclui um sistema de 
 * cache simples à ser utilizado quando tentamos carregar a mesma imagem por 
 * diversas vezes seguidas. */

(() => {

  const loading = [];
  const resourceCache = {};
  const readyCallbacks = [];

  /* Esta é a função de carregamento e images, disponível publicamente.
   * 
   * Ela aceita uma array de strings com urls de imagens ou uma string para 
   * uma única url. Depois receber as URLs, ela vai invocar nossa função privada 
   * de carregamento de images, para cada URL passada.*/
  load = (urls) => {

    if(urls instanceof Array) urls.forEach(url => _load(url));
    else _load(urls);
  }

  /* Esta é o nossa função privada de carregamento de images.
   * É invocada por nossa função de carregamento de imagens disponível publicamente. */
  _load = (url) => {

    if(resourceCache[url]) {

      /* Se a URL já foi usada anteriormente, a imagem estará presente 
       * em nossa array resourceCache[]. Basta retornar esta imagem, invés de 
       * recarregá-la outra vez. */
      return resourceCache[url];

    } else {

      /* Se a URL não foi usada anteriormente, adicionamos a imagem ao cache 
       * para que possamos retorná-la novamente, caso haja necessidade. */
      const image = new Image();
      image.onload = () => {

        resourceCache[url] = image;

        /* Quando a imagem está propriamente carregada, invocamos todos 
         * os callbacks de onReady(). */
        if(isReady()) { readyCallbacks.forEach(func => func())}
      };

      /* Configura o valor inicial do cache para false.
       * 
       * Isto é alterado, quando o manipulador do evento onload da imagem
       * é invocado. 
       * 
       * Depois disso, o atributo src da imagem é finalmente definido. */
      resourceCache[url] = false;
      image.src = url;
    }
  }

  /* Esta função é usada para retornar imagens que sabemos já foram 
   * carregadas anteriormente. Se uma imagem estiver em cache, esta função 
   * opera do mesmo modo que load(). */
  get = (url) => {
    return resourceCache[url];
  }

  /* Esta função determina se todas as imagens requisitadas para carregamento
   * foram carregadas adequadamente. */
  isReady = () => {

    let ready = true;

    for(let key in resourceCache) {
      if(resourceCache.hasOwnProperty(key) && !resourceCache[key]) ready = false;
    }

    return ready;
  }

  /* Esta função adiciona callbacks à uma pilha, os quais serão invocados 
   * quando todas as imagens requisitadas estiverem adequadamente carregadas.  */
  onReady = (func) => {
    readyCallbacks.push(func);
  }

  /* Este objeto define todas as funções disponíveis publicamente, disponíveis 
   * ao criar um objeto global Resources. */
  window.Resources = {
    load,
    get,
    onReady,
    isReady
  };
})();
