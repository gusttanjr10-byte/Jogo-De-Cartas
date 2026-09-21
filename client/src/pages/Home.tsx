import { useState } from "react";

export default function Home() {
  const [opened, setOpened] = useState(false);

  function handleCta() {
    setOpened(true);
  }

  return (
    <main className="ritual-page">
      <div className="ritual-halo" aria-hidden="true" />
      <section className="ritual-content" aria-labelledby="page-title">
        <img
          className="ritual-mark"
          src="/manus-storage/consulta-gratuita_9549de9b.webp"
          alt="Consulta gratuita"
        />

        <h1 id="page-title">
          Descubra Gratuitamente o Que as Cartas
          <br />
          Vão Revelar Sobre Sua Vida!
        </h1>

        <p>
          As cartas do baralho dourado sagrado podem revelar o
          <br className="desktop-break" /> caminho exato para <strong>remover os bloqueios em sua vida.</strong>
        </p>

        <div className="ritual-spacer" aria-hidden="true" />

        <div className={`reveal ${opened ? "reveal-visible" : ""}`}>
          <img
            src="/manus-storage/consultora_215990ec.webp"
            alt="Consultora de tarô pronta para sua leitura"
          />
          <span>Seu caminho começa com uma pergunta.</span>
        </div>
      </section>

      <div className="ritual-footer">
        <button type="button" onClick={handleCta} className="ritual-cta">
          CLIQUE AQUI E FAÇA SUA LEITURA GRATUITA!
        </button>
      </div>
    </main>
  );
}

