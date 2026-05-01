export function meta() {
  return [
    { title: "Contact" },
    {
      name: "description",
      content: "Contacter l'équipe SportSee.",
    },
  ];
}

export default function Contact() {
  return (
    <main className="legal-page">
      <h1>Contact</h1>
      <p>
        Une question sur votre compte, vos statistiques ou l'utilisation de
        SportSee ? Notre équipe peut vous accompagner.
      </p>

      <section>
        <h2>Support</h2>
        <p>
          Email : <a href="mailto:support@sportsee.com">support@sportsee.com</a>
        </p>
      </section>

      <section>
        <h2>Adresse</h2>
        <p>SportSee, 12 rue des Performances, 75000 Paris, France</p>
      </section>
    </main>
  );
}
