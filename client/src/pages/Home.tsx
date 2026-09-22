import { useEffect, useMemo, useState } from "react";

type Step = "landing" | "quiz" | "analysis" | "cards" | "result" | "vsl";
type Question = { title: string; intro?: string; options: string[] };

const logo = "/assets/consulta-gratuita.webp";
const cardBacks = [
  "/assets/cards/card-1.webp",
  "/assets/cards/card-2.webp",
  "/assets/cards/card-3.webp",
  "/assets/cards/card-4.webp",
  "/assets/cards/card-5.webp",
  "/assets/cards/card-6-fixed.png",
  "/assets/cards/card-7.webp",
  "/assets/cards/card-8.webp",
];
const revealed = [
  "/assets/cards/roda.png",
  "/assets/cards/louco.png",
  "/assets/cards/torre.png",
];

const questions: Question[] = [
  {
    title: "Qual dessas frases mais descreve o que você está sentindo esse ano?",
    options: [
      "😪 Sinto que a minha vida está travada, mesmo fazendo tudo certo.",
      "😔 Tenho tudo pra ser feliz, mas ainda sinto um vazio por dentro.",
      "🫨 Estou numa decisão importante e não sei qual caminho escolher.",
      "🤔 Sinto que algo grande está prestes a mudar, mas não sei o que.",
    ],
  },
  {
    title: "Quando você pensa nas suas relações... Qual frase combina mais com o que você sente?",
    options: [
      "💔 Me doo completamente pelas pessoas, mas quando preciso... Estou sozinha.",
      "🙁 Sinto que carrego tudo nas costas enquanto os outros seguem em frente.",
      "😓 Já doei tanto de mim que nem sei mais o que sobrou pra mim mesma.",
      "🥺 Sinto que meu amor, meu esforço e minha energia nunca são suficientes para ninguém.",
    ],
  },
  {
    title: "O que você busca e espera de mudança para sua vida este ano?",
    intro: "Escolha a opção que mais representa o momento que você está vivendo.",
    options: [
      "💰 Melhorar minha situação financeira.",
      "💌 Encontrar o meu grande amor.",
      "🍀 Encontrar a minha paz interior.",
      "🙏 Encontrar a minha direção e propósito de vida.",
    ],
  },
  {
    title: "Você já teve a sensação de olhar ao redor e ver todo mundo avançando... Mas sentir que você ainda está travada no mesmo lugar?",
    intro: "As cartas podem mostrar por que essa sensação continua se repetindo...",
    options: [
      "✅ Sim, me identifico completamente!",
      "🤔 Às vezes... mas acho que é só uma fase.",
      "❔ Tenho esse sentimento, mas não sei explicar de onde vem.",
    ],
  },
  {
    title: "(Última pergunta antes da sua leitura)",
    intro: "Se as cartas revelassem HOJE o que está bloqueando sua vida e te mostrassem o caminho exato para desbloquear...\n\nVocê estaria pronto para seguir essa orientação?",
    options: [
      "✅ Sim, estou pronta para receber.",
      "😔 Sim, mas tenho medo de me decepcionar de novo.",
      "🤔 Não sei, depende do que as cartas disserem.",
    ],
  },
];

function Progress({ value }: { value: number }) {
  return <div className="progress"><span style={{ width: `${value}%` }} /></div>;
}

function Shell({ children, progress = 0 }: { children: React.ReactNode; progress?: number }) {
  return <main className="ritual-page"><div className="ritual-halo" /><div className="ritual-sparkles" aria-hidden="true" /><section className="funnel-shell ritual-entrance"><img className="logo" src={logo} alt="Consulta gratuita" />{progress > 0 && <Progress value={progress} />}{children}</section></main>;
}

function Vsl() {
  const [offerVisible, setOfferVisible] = useState(false);
  useEffect(() => {
    const playerId = "vid-6ab1cdcdbe5b4b2f580f3e8c";
    const mount = document.getElementById("smartplayer-mount");
    if (!mount || document.getElementById("converteai-player-6ab1cdcdbe5b4b2f580f3e8c")) return;
    const player = document.createElement("vturb-smartplayer");
    player.id = playerId;
    player.style.display = "block";
    player.style.margin = "0 auto";
    player.style.width = "100%";
    player.style.maxWidth = "400px";
    const placeholder = document.createElement("div");
    placeholder.className = "vturb-player-placeholder";
    mount.appendChild(player);
    player.appendChild(placeholder);
    const script = document.createElement("script");
    script.id = "converteai-player-6ab1cdcdbe5b4b2f580f3e8c";
    script.src = "https://scripts.converteai.net/dc8ab8c0-f9ac-47c3-af12-a4174ba40c45/players/6ab1cdcdbe5b4b2f580f3e8c/v4/player.js";
    script.async = true;
    document.head.appendChild(script);
    const offerTimer = window.setTimeout(() => setOfferVisible(true), 1020 * 1000);
    return () => { window.clearTimeout(offerTimer); script.remove(); player.remove(); };
  }, []);
  return <Shell><div className="vsl-page"><h2>Sua Revelação Final:<br />A verdade está prestes a ser revelada!</h2><div className="vsl-frame smartplayer-frame"><div id="smartplayer-mount" className="smartplayer-host" /></div>{offerVisible && <a className="gold-button offer-button" href="https://pay.wiapy.com/FtrIKYwOwzg-">SIM, QUERO ATIVAR O CÓDIGO AGORA MESMO!</a>}</div></Shell>;
}

function Cards({ onDone }: { onDone: () => void }) {
  const [selected, setSelected] = useState<number[]>([]);
  const remaining = useMemo(() => cardBacks.map((_, i) => i).filter(i => !selected.includes(i)), [selected]);
  const choose = (index: number) => {
    if (selected.includes(index)) return;
    const next = [...selected, index];
    setSelected(next);
    if (next.length === 3) setTimeout(onDone, 550);
  };
  return <Shell progress={72}><div className="cards-page"><h2>O baralho está aberto para você:</h2><h3>Não pense muito, apenas sinta.</h3><p>Escolha 3 cartas, uma de cada vez, <b>na ordem que o seu instinto mandar:</b></p><div className="card-grid">{cardBacks.map((src, i) => <button type="button" className={`tarot-card ${selected.includes(i) ? "selected" : ""} ${remaining.includes(i) ? "" : "dimmed"}`} key={src + i} onClick={() => choose(i)}><img src={src} alt={`Carta ${i + 1}`} />{selected.includes(i) && <small>{selected.indexOf(i) + 1}</small>}</button>)}</div></div></Shell>;
}

function Result({ onDone }: { onDone: () => void }) {
  return <Shell progress={72}><div className="cards-page result-page"><h2>O baralho está aberto para você:</h2><h3>Não pense muito, apenas sinta.</h3><p>Escolha 3 cartas, uma de cada vez, <b>na ordem que o seu instinto mandar:</b></p><div className="card-grid">{cardBacks.map((src, i) => <div className={`tarot-card ${i < 3 ? "revealed" : "dimmed"}`} key={src + i}><img src={i < 3 ? revealed[i] : src} alt={i < 3 ? ["A Roda da Fortuna", "O Louco", "A Torre"][i] : `Carta ${i + 1}`} />{i < 3 && <small>{i + 1}</small>}</div>)}</div><button className="gold-button result-button" type="button" onClick={onDone}>VER RESULTADO DA LEITURA</button></div></Shell>;
}

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [question, setQuestion] = useState(0);
  if (step === "vsl") return <Vsl />;
  if (step === "cards") return <Cards onDone={() => setStep("result")} />;
  if (step === "result") return <Result onDone={() => setStep("vsl")} />;
  if (step === "analysis") return <Shell><div className="analysis"><p>A partir do que você me revelou...</p><p>O universo irá filtrar, entre milhares de combinações possíveis...</p><p>As únicas <b>8 cartas</b> capazes de falar diretamente com a sua energia neste momento.</p><p>Escolha apenas 3 para descobrir o caminho exato para destravar tudo em 2026.</p><b>Prepare-se.</b><Progress value={100} /><strong>Analisando suas respostas...</strong><button className="gold-button" onClick={() => setStep("cards")}>Escolher Minhas Cartas Agora</button></div></Shell>;
  if (step === "quiz") { const q = questions[question]; return <Shell progress={(question + 1) * 18}><div className="quiz"><h2>{q.title}</h2>{q.intro && <p className="intro">{q.intro}</p>}<div className="options">{q.options.map(option => <button key={option} type="button" onClick={() => question === questions.length - 1 ? setStep("analysis") : setQuestion(question + 1)}>{option}</button>)}</div></div></Shell>; }
  return <Shell><div className="landing"><h1>Descubra Gratuitamente o Que as Cartas Vão Revelar Sobre Sua Vida!</h1><p>As cartas do baralho dourado sagrado podem revelar o caminho exato para <b>remover os bloqueios em sua vida.</b></p><img className="consultora-landing" src="/assets/consultora.webp" alt="Consultora de tarô" /><button className="gold-button" onClick={() => setStep("quiz")}>CLIQUE AQUI E FAÇA SUA LEITURA GRATUITA!</button></div></Shell>;
}
