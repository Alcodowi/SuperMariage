// Noelia & Jean-Baptiste — interactions du site

(function () {
  "use strict";

  // Bouton flottant "Répondre" : apparaît après le scroll
  const fab = document.getElementById("fab");
  if (fab) {
    const onScroll = function () {
      if (window.scrollY > 300) {
        fab.classList.add("visible");
      } else {
        fab.classList.remove("visible");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
