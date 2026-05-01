export function meta() {
  return [
    { title: "Conditions générales" },
    {
      name: "description",
      content: "Conditions générales d'utilisation de SportSee.",
    },
  ];
}

export default function Terms() {
  return (
    <main className="legal-page">
      <h1>Conditions générales</h1>
      <p>
        Les présentes conditions générales encadrent l'utilisation de SportSee
        et des services associés au suivi des performances sportives.
      </p>

      <section>
        <h2>Utilisation du service</h2>
        <p>
          L'utilisateur s'engage à fournir des informations exactes et à utiliser
          la plateforme dans un cadre personnel, conforme à sa destination.
        </p>
      </section>

      <section>
        <h2>Données personnelles</h2>
        <p>
          Les données affichées dans SportSee servent uniquement à présenter les
          statistiques, objectifs et informations liées au profil utilisateur.
        </p>
      </section>

      <section>
        <h2>Responsabilité</h2>
        <p>
          SportSee fournit des indicateurs de suivi. Ces informations ne
          remplacent pas l'avis d'un professionnel de santé ou du sport.
        </p>
      </section>
    </main>
  );
}
