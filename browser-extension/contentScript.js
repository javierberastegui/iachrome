(() => {
  // Extrae el texto visible excluyendo scripts, estilos y etiquetas no textuales
  function getCleanVisibleText() {
    // Intentamos clonar el body para manipularlo sin alterar la página real
    const bodyClone = document.body.cloneNode(true);
    
    // Remover elementos no deseados de la copia
    const selectorsToRemove = [
      'script', 'style', 'noscript', 'iframe', 'svg', 
      'header', 'footer', 'nav', 'noscript', 'link', 'meta'
    ];
    selectorsToRemove.forEach(selector => {
      const elements = bodyClone.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });

    // Retorna el innerText limpio
    return bodyClone.innerText || bodyClone.textContent || "";
  }

  // Extraer headings
  const headings = {
    h1: Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim()).filter(Boolean),
    h2: Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim()).filter(Boolean),
    h3: Array.from(document.querySelectorAll('h3')).map(h => h.innerText.trim()).filter(Boolean)
  };

  // Extraer links (limitado a los primeros 100 para evitar desbordar memoria)
  const rawLinks = Array.from(document.querySelectorAll('a[href]'));
  const links = rawLinks.slice(0, 100).map(a => {
    let href = a.getAttribute('href') || '';
    // Intentar resolver rutas relativas a absolutas
    try {
      href = new URL(href, window.location.href).href;
    } catch (e) {
      // Ignorar urls inválidas
    }
    return {
      text: a.innerText.trim() || '[Sin Texto]',
      href: href
    };
  }).filter(link => link.href.startsWith('http'));

  // Extraer selección de texto actual
  let selection = '';
  if (window.getSelection) {
    selection = window.getSelection().toString().trim();
  }

  return {
    url: window.location.href,
    title: document.title,
    selection: selection,
    text: getCleanVisibleText().trim(),
    headings: headings,
    links: links
  };
})();
