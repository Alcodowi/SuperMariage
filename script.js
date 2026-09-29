// Noelia & Jean-Baptiste — interactions des formulaires
// Les réponses sont stockées localement (localStorage) et un e-mail
// récapitulatif peut être envoyé aux mariés via mailto.

(function () {
  "use strict";

  const CLE_RSVP = "mariage-rsvp";
  const CLE_REPAS = "mariage-repas";

  /* ─────────── RSVP ─────────── */

  const rsvpForm = document.getElementById("rsvp-form");
  const rsvpSuccess = document.getElementById("rsvp-success");
  const presenceHint = document.getElementById("presence-hint");

  if (rsvpForm) {
    // Restaure une réponse précédente s'il y en a une
    try {
      const saved = JSON.parse(localStorage.getItem(CLE_RSVP) || "null");
      if (saved) {
        rsvpForm.nom.value = saved.nom || "";
        rsvpForm.prenom.value = saved.prenom || "";
        rsvpForm.civil.checked = !!saved.civil;
        rsvpForm.mariage.checked = !!saved.mariage;
        rsvpForm.convives.value = saved.convives || 1;
      }
    } catch (e) { /* stockage indisponible : on ignore */ }

    rsvpForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const civil = rsvpForm.civil.checked;
      const mariage = rsvpForm.mariage.checked;

      if (!civil && !mariage) {
        presenceHint.textContent = "Merci de sélectionner au moins un événement.";
        presenceHint.classList.add("erreur");
        return;
      }
      presenceHint.classList.remove("erreur");

      const donnees = {
        nom: rsvpForm.nom.value.trim(),
        prenom: rsvpForm.prenom.value.trim(),
        civil: civil,
        mariage: mariage,
        convives: parseInt(rsvpForm.convives.value, 10) || 1
      };

      try { localStorage.setItem(CLE_RSVP, JSON.stringify(donnees)); } catch (err) { /* ignore */ }

      const evenements = [];
      if (civil) evenements.push("Mariage civil — 17 juin");
      if (mariage) evenements.push("Mariage — 19 juin");

      const corps =
        "Bonjour Noelia & Jean-Baptiste,\n\n" +
        donnees.prenom + " " + donnees.nom + " sera présent(e) :\n" +
        "• " + evenements.join("\n• ") + "\n" +
        "Nombre de personnes : " + donnees.convives + "\n\n" +
        "À très vite !";

      const mailto =
        "mailto:?subject=" + encodeURIComponent("RSVP — " + donnees.prenom + " " + donnees.nom) +
        "&body=" + encodeURIComponent(corps);

      rsvpSuccess.hidden = false;
      rsvpForm.reset();
      window.location.href = mailto;
    });
  }

  /* ─────────── REPAS ─────────── */

  const repasForm = document.getElementById("repas-form");
  const repasSuccess = document.getElementById("repas-success");

  if (repasForm) {
    repasForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nom = repasForm["repas-nom"].value.trim();
      const info = repasForm["repas-info"].value.trim();

      let liste = [];
      try { liste = JSON.parse(localStorage.getItem(CLE_REPAS) || "[]"); } catch (err) { liste = []; }

      liste.push({ nom: nom, info: info, date: new Date().toISOString() });
      try { localStorage.setItem(CLE_REPAS, JSON.stringify(liste)); } catch (err) { /* ignore */ }

      repasSuccess.hidden = false;
      repasForm.reset();
    });
  }
})();
