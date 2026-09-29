// Noelia & Jean-Baptiste — interactions du site

(function () {
  "use strict";

  // ─────────── Bouton flottant ───────────

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

  // ─────────── Champs dynamiques pour les personnes supplémentaires ───────────

  const select = document.getElementById("convives");
  const container = document.getElementById("convives-supplementaires");

  if (select && container) {
    const MAX = 5; // 6+ = 5 champs supplémentaires max

    function updateConvives() {
      const n = parseInt(select.value, 10) || 1;
      const needed = Math.min(n - 1, MAX);

      // Supprime les champs en trop
      while (container.children.length > needed) {
        container.removeChild(container.lastChild);
      }

      // Ajoute les champs manquants
      for (let i = container.children.length; i < needed; i++) {
        const num = i + 2; // 2ème, 3ème, 4ème personne...
        const block = document.createElement("fieldset");
        block.className = "field field-group convive-dynamique";
        block.innerHTML =
          '<legend>Personne ' + num + '</legend>' +
          '<div class="field">' +
            '<label for="nom-' + num + '">Nom</label>' +
            '<input type="text" id="nom-' + num + '" name="nom-' + num + '" autocomplete="family-name">' +
          '</div>' +
          '<div class="field">' +
            '<label for="prenom-' + num + '">Prénom</label>' +
            '<input type="text" id="prenom-' + num + '" name="prenom-' + num + '" autocomplete="given-name">' +
          '</div>' +
          '<div class="field">' +
            '<label for="enfant-' + num + '">Enfant ?</label>' +
            '<select id="enfant-' + num + '" name="enfant-' + num + '">' +
              '<option value="non">Non</option>' +
              '<option value="oui">Oui</option>' +
            '</select>' +
          '</div>';
        container.appendChild(block);
      }
    }

    select.addEventListener("change", updateConvives);
    updateConvives();
  }
})();
