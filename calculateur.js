function calculerTout() {
    // Récupérer les valeurs des fondations
    const longueurFondations = parseFloat(document.getElementById('longueur').value);
    const largeurFondations = parseFloat(document.getElementById('largeur').value);
    const hauteurFondations = parseFloat(document.getElementById('hauteur').value);

    // Récupérer les valeurs des murs
    const longueurMaison = parseFloat(document.getElementById('longueurMaison').value);
    const largeurMaison = parseFloat(document.getElementById('largeurMaison').value);
    const hauteurMur = parseFloat(document.getElementById('hauteurMur').value);
    const hauteurDalle = parseFloat(document.getElementById('hauteurDalle').value);
    const typeMur = document.getElementById('typeMur').value;

    // Calcul des fondations
    const volumeFondations = longueurFondations * largeurFondations * hauteurFondations;

    // Calcul des murs
    let surfaceTotaleMurs = 2 * (longueurMaison + largeurMaison) * hauteurMur;

    // Calculer la surface totale des fenêtres
    const fenetres = document.getElementsByClassName('fenetre');
    let surfaceTotaleFenetres = 0;
    for (let i = 0; i < fenetres.length; i++) {
        const hauteurFenetre = parseFloat(fenetres[i].getElementsByClassName('hauteurFenetre')[0].value);
        const largeurFenetre = parseFloat(fenetres[i].getElementsByClassName('largeurFenetre')[0].value);
        surfaceTotaleFenetres += hauteurFenetre * largeurFenetre;
    }

    // Soustraire la surface des fenêtres de la surface totale des murs
    const surfaceMursNet = surfaceTotaleMurs - surfaceTotaleFenetres;

    let nombreMateriaux, coutTotalMateriaux;

    if (typeMur === "parpaing") {
        // Calcul du nombre de parpaings nécessaires
        const surfaceParpaing = 0.2 * 0.5; // 0.2 m x 0.5 m par parpaing
        nombreMateriaux = Math.ceil(surfaceMursNet / surfaceParpaing);

        // Récupérer le prix des parpaings depuis le stockage local
        const prixParpaing = parseFloat(localStorage.getItem('prixParpaing')) || 0;
        coutTotalMateriaux = nombreMateriaux * prixParpaing;
    } else if (typeMur === "brique") {
        // Calcul du nombre de briques nécessaires
        const surfaceBrique = 0.3 * 0.5; // 0.3 m x 0.5 m par brique
        nombreMateriaux = Math.ceil(surfaceMursNet / surfaceBrique);

        // Récupérer le prix des briques depuis le stockage local
        const prixBrique = parseFloat(localStorage.getItem('prixBrique')) || 0;
        coutTotalMateriaux = nombreMateriaux * prixBrique;
    }

    // Calcul du volume de la dalle
    const volumeDalle = longueurMaison * largeurMaison * hauteurDalle;

    // Récupérer le prix du béton depuis le stockage local
    const prixBeton = parseFloat(localStorage.getItem('prixBeton')) || 0;
    const coutTotalBeton = volumeDalle * prixBeton;

    // Calcul du nombre de sacs de ciment et de sable
    const cimentParM2 = 20; // 20 kg de ciment par m²
    const sableParM2 = 50; // 50 kg de sable par m²
    const poidsCimentTotal = surfaceMursNet * cimentParM2; // Poids total du ciment en kg
    const poidsSableTotal = surfaceMursNet * sableParM2; // Poids total du sable en kg
    const nombreSacsCiment = Math.ceil(poidsCimentTotal / 35); // Nombre de sacs de ciment (35 kg par sac)

    // Récupérer le prix du sac de ciment depuis le stockage local
    const prixSacCiment = parseFloat(localStorage.getItem('prixSacCiment')) || 0;
    const coutTotalCiment = nombreSacsCiment * prixSacCiment;

    // Créer le contenu HTML des résultats
    const resultatsHtml = `
        <strong>Volume des fondations :</strong> ${volumeFondations.toFixed(2)} m³<br>
        <strong>Surface totale des murs :</strong> ${surfaceTotaleMurs.toFixed(2)} m²<br>
        <strong>Surface totale des fenêtres :</strong> ${surfaceTotaleFenetres.toFixed(2)} m²<br>
        <strong>Surface des murs net (après déduction des fenêtres) :</strong> ${surfaceMursNet.toFixed(2)} m²<br>
        <strong>Nombre de ${typeMur === "parpaing" ? "parpaings" : "briques"} nécessaires :</strong> ${nombreMateriaux}<br>
        <strong>Coût total des ${typeMur === "parpaing" ? "parpaings" : "briques"} :</strong> ${coutTotalMateriaux.toFixed(2)} €<br>
        <strong>Volume de la dalle :</strong> ${volumeDalle.toFixed(2)} m³<br>
        <strong>Coût total du béton pour la dalle :</strong> ${coutTotalBeton.toFixed(2)} €<br>
        <strong>Nombre de sacs de ciment nécessaires :</strong> ${nombreSacsCiment}<br>
        <strong>Coût total du ciment :</strong> ${coutTotalCiment.toFixed(2)} €<br>
        <strong>Poids total de sable requis :</strong> ${poidsSableTotal.toFixed(2)} kg
    `;

    // Stocker les résultats dans le localStorage
    localStorage.setItem("resultats", resultatsHtml);

    // Rediriger l'utilisateur vers la page de résultats
    window.location.href = "resultats.html";
}
