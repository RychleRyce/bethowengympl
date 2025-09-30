import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showBeethoven, setShowBeethoven] = useState(false);
  const [incorrectAnswer, setIncorrectAnswer] = useState('');
  const [showFact, setShowFact] = useState(false);
  const [currentFact, setCurrentFact] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(''); // 'correct' or 'incorrect'
  const [showIntro, setShowIntro] = useState(true);

  // Historically accurate facts about Beethoven's life
  const historicalFacts = [
    "V mládí jsem byl nucen hrát na klavír pro svého otce, který mě často bil, když jsem dělal chyby. Můj otec chtěl z mě udělat dalšího Mozarta.",
    "V Bonnu jsem studoval u Christiana Gottloba Neefe, který mi řekl: 'Pokud bude pokračovat takto, bude druhým Mozartem.'",
    "V roce 1787 jsem cestoval do Vídně, abych studoval u Mozarta. Když jsem hrál, Mozart řekl přítomným: 'Pozorně poslouchejte, tento mladík jednou zaujme celý svět.'",
    "Můj sluch začal slábnout kolem roku 1796. Psal jsem Heiligenstadtský testament, kde jsem přiznal svou zoufalství, ale rozhodl jsem se žít pro umění.",
    "I když jsem byl hluchý, jsem komponoval tak, že jsem kousal do dřevěné tyče spojené s klavírem, abych cítil vibrace hudby.",
    "Mé dílo 'Eroica' (Třetí symfonie) jsem původně věnoval Napoleonu Bonapartovi, ale když se Napoleon prohlásil císařem, roztrhal jsem titulní stránku a změnil jsem název na 'Hrdinská symfonie'.",
    "Nikdy jsem se neoženil, ale měl jsem mnoho vášnivých vztahů. Mé 'Immortal Beloved' (Věčně milovaná) dopisy zůstávají záhadou dodnes.",
    "Byl jsem známý svým divokým vzhledem a neuspořádaným chováním. Často jsem chodil v špinavých šatech a měl jsem rozcuchané vlasy.",
    "V mých posledních letech jsem byl tak hluchý, že jsem nemohl slyšet publikum tleskat po premiéře Deváté symfonie. Museli mě otočit, abych viděl jejich nadšení.",
    "Moje Devátá symfonie s 'Ode na radost' byla první symfonií, která zahrnovala sbor a sólisty. Byla to revoluce v hudební historii!",
    "Psaní hudby pro mě bylo bolestivé. Můj stůl byl plný přeškrtnutých not a oprav. Nikdy jsem nebyl spokojený s prvním nápadem.",
    "V roce 1827, když jsem umíral, pršelo tak silně, že blesky osvětlovaly můj pokoj. Můj poslední akt byl pozvednutí ruky k nebi.",
    "Můj život byl plný bolesti - ztráta sluchu, samota, nemoci - ale hudba byla mým jediným útěchou a posláním.",
    "V Bonnu jsem pracoval jako varhaník v kostele a později jako violista v orchestru. Tyto zkušenosti mě naučily porozumět všem hudebním nástrojům.",
    "Můj otec byl zpěvák a učitel hudby, ale byl alkoholik. Musel jsem vydělávat peníze pro rodinu již od dětství."
  ];

  const questions = [
    {
      question: "Kdy se Beethoven narodil?",
      options: ["1770", "1780", "1760", "1790"],
      correct: "1770",
      explanation: "Narodil jsem se 17. prosince 1770 v Bonnu. Můj otec Johann byl zpěvák a hudební učitel, který mě tvrdě trénoval od mého čtvrtého roku života."
    },
    {
      question: "Kde se Beethoven narodil?",
      options: ["Vídeň", "Bonn", "Berlín", "Mnichov"],
      correct: "Bonn",
      explanation: "Bonn bylo mým rodným městem. Bylo to tehdy hlavní město kurfiřtství Kolínského. Zde jsem strávil své dětství a mládí, než jsem odjel do Vídně v roce 1792."
    },
    {
      question: "Jaký nástroj hrál Beethoven?",
      options: ["Housle", "Flétna", "Klavír", "Violoncello"],
      correct: "Klavír",
      explanation: "Klavír byl mým hlavním nástrojem. Byl jsem považován za jednoho z nejlepších klavíristů své doby. Mé klavírní sonáty, jako 'Měsíční' a 'Pathétique', jsou dodnes hrané po celém světě."
    },
    {
      question: "V jakém věku Beethoven začal ztrácet sluch?",
      options: ["16 let", "26 let", "36 let", "46 let"],
      correct: "26 let",
      explanation: "Můj sluch začal slábnout kolem roku 1796, když mi bylo 26 let. Nejprve jsem slyšel hučení v uších, poté jsem začal ztrácet schopnost slyšet vysoké tóny. Do roku 1814 jsem byl téměř úplně hluchý."
    },
    {
      question: "Která Beethovenova symfonie obsahuje sbor?",
      options: ["Třetí symfonie", "Devátá symfonie", "Pátá symfonie", "Sedmá symfonie"],
      correct: "Devátá symfonie",
      explanation: "Devátá symfonie, dokončená v roce 1824, byla první symfonií v historii, která zahrnovala sbor a sólisty v posledním movementu. Text 'Ode na radost' je od Friedricha Schillera."
    },
    {
      question: "Kolik symfonií Beethoven napsal?",
      options: ["5", "7", "9", "11"],
      correct: "9",
      explanation: "Napsal jsem devět symfonií, každou z nich revoluční ve svém čase. Od první symfonie v roce 1800 až po Devátou v roce 1824 - každá představuje můj hudební vývoj a boj s osudem."
    },
    {
      question: "Co znamená 'van' v Beethovenově jméně?",
      options: ["Znamení šlechtického původu", "Příjmení jeho otce", "Název města", "Titul hudebního mistra"],
      correct: "Znamení šlechtického původu",
      explanation: "'Van' je nizozemská předpona, která označuje původ z určitého místa. Moji předkové pocházeli z belgického města Mechelen, které se tehdy nazývalo Malines nebo Mecheln."
    },
    {
      question: "Jaký byl Beethovenův vztah k Mozartovi?",
      options: ["Byli přáteli", "Beethoven ho studoval", "Nikdy se nesetkali", "Byli rivalové"],
      correct: "Beethoven ho studoval",
      explanation: "V roce 1787 jsem cestoval do Vídně, abych studoval u Mozarta. Mozart byl ohromen mým hraním a řekl přítomným: 'Pozorně poslouchejte, tento mladík jednou zaujme celý svět.'"
    },
    {
      question: "Který z těchto skladatelů byl Beethovenovým učitelem?",
      options: ["Mozart", "Haydn", "Bach", "Schubert"],
      correct: "Haydn",
      explanation: "Joseph Haydn byl mým učitelem ve Vídni od roku 1792. I když jsem měl k němu respekt, naše vztahy nebyly vždy hladké. Haydn mi dal základy, ale já jsem chtěl jít dál."
    },
    {
      question: "Jaký byl Beethovenův nejoblíbenější žánr?",
      options: ["Opera", "Smyčcový kvartet", "Symfonie", "Klavírní sonáta"],
      correct: "Klavírní sonáta",
      explanation: "Klavírní sonáty byly mým laboratorním polem. Napsal jsem jich 32 a každá představuje nový hudební experiment. 'Měsíční sonáta' a 'Appassionata' jsou mezi nejznámějšími."
    },
    {
      question: "Který z těchto děl není Beethovenovo?",
      options: ["Moonlight Sonata", "Fifth Symphony", "Requiem", "Pathétique Sonata"],
      correct: "Requiem",
      explanation: "Requiem je dílo Wolfganga Amadea Mozarta, které dokončil jeho žák Franz Xaver Süssmayr po Mozartově smrti v roce 1791. Já jsem nikdy nepsal requiem."
    },
    {
      question: "Jaký byl Beethovenův vztah k Napoleonovi?",
      options: ["Obdivoval ho", "Nenáviděl ho", "Nikdy ho nepotkal", "Byl jeho osobním hudebníkem"],
      correct: "Obdivoval ho",
      explanation: "Původně jsem obdivoval Napoleona jako symbol svobody a demokracie. Proto jsem pojmenoval svou Třetí symfonii 'Bonaparte'. Když se Napoleon prohlásil císařem, byl jsem zklamaný a přejmenoval jsem ji na 'Eroica'."
    },
    {
      question: "Který z těchto titulů není spojen s Beethovenovou symfonií?",
      options: ["Hrdinská", "Pastorální", "Dvojka", "Chórová"],
      correct: "Dvojka",
      explanation: "Moje symfonie mají přezdívky: Třetí je 'Hrdinská', Šestá je 'Pastorální', Devátá je 'Chórová'. Druhá symfonie nemá běžnou přezdívku, i když je plná života a energie."
    },
    {
      question: "Jaký byl Beethovenův poslední životní akt?",
      options: ["Komponování", "Cestování", "Učení", "Vystupování"],
      correct: "Komponování",
      explanation: "Až do své smrti v roce 1827 jsem komponoval. Moje poslední díla, jako jsou pozdní smyčcové kvartety a Devátá symfonie, jsou považovány za nejhlubší a nejgeniálnější díla mé kariéry."
    },
    {
      question: "Kde je Beethoven pohřben?",
      options: ["Bonn", "Vídeň", "Berlín", "Mnichov"],
      correct: "Vídeň",
      explanation: "Jsem pohřben ve Vídni na hřbitově Zentralfriedhof. Můj pohřeb v roce 1827 se zúčastnilo tisíce lidí. Dnes ležím vedle Mozarta a Schuberta v 'hudební části' hřbitova."
    }
  ];

  const handleAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    const currentQ = questions[currentQuestion];
    
    if (selectedOption === currentQ.correct) {
      setScore(score + 1);
      setAnswerStatus('correct');
      setCurrentFact(historicalFacts[currentQuestion]);
      setShowFact(true);
      setTimeout(() => {
        setShowFact(false);
        setAnswerStatus('');
        setSelectedAnswer(null);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        }
      }, 4000);
    } else {
      setAnswerStatus('incorrect');
      setIncorrectAnswer(currentQ.explanation);
      setShowBeethoven(true);
      setTimeout(() => {
        setShowBeethoven(false);
        setAnswerStatus('');
        setSelectedAnswer(null);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        }
      }, 5000);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowBeethoven(false);
    setIncorrectAnswer('');
    setShowFact(false);
    setCurrentFact('');
    setSelectedAnswer(null);
    setAnswerStatus('');
    setShowIntro(true);
  };

  const startQuiz = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 p-4 font-serif">
      {/* Full Screen Quiz */}
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        {/* Intro Screen */}
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="mb-8">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Beethoven.jpg/800px-Beethoven.jpg" 
                alt="Beethoven" 
                className="rounded-full shadow-2xl border-4 border-amber-200 w-64 h-64 object-cover"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Ludwig van Beethoven</h1>
            <p className="text-xl text-gray-600 italic mb-8">"Hudba je vyšší než všechna moudrost a filozofie."</p>
            <p className="text-gray-700 mb-8 leading-relaxed max-w-md">
              Jsem Ludwig van Beethoven, narozený v bouřlivém období francouzské revoluce a napoleonských válek. 
              Můj život (1770-1827) představuje přechod od klasicismu k romantismu, od osvícenství k vášnivému vyjádření lidské duše.
            </p>
            <button
              onClick={startQuiz}
              className="px-8 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium shadow-lg"
            >
              Začít kvíz
            </button>
          </motion.div>
        )}

        {/* Quiz Content */}
        {!showIntro && (
          <div className="w-full max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Beethovenův hudební kvíz</h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Otázka {currentQuestion + 1} z {questions.length}</span>
                <span className="text-sm text-green-700 font-semibold">Skóre: {score}</span>
              </div>
            </div>

            {currentQuestion < questions.length ? (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-medium text-gray-800 mb-4">{questions[currentQuestion].question}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        disabled={selectedAnswer !== null}
                        className={`p-4 text-left rounded-lg border-2 transition-colors duration-200 font-medium text-gray-800 hover:shadow-md ${
                          selectedAnswer === option && answerStatus === 'correct'
                            ? 'border-green-400 bg-green-50'
                            : selectedAnswer === option && answerStatus === 'incorrect'
                            ? 'border-red-400 bg-red-50'
                            : 'border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                        }`}
                      >
                        {option}
                        {selectedAnswer === option && answerStatus === 'correct' && (
                          <span className="ml-2 text-green-600 font-bold">✓ Správně!</span>
                        )}
                        {selectedAnswer === option && answerStatus === 'incorrect' && (
                          <span className="ml-2 text-red-600 font-bold">✗ Špatně</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Gratulace, milý příteli!</h3>
                <p className="text-xl text-amber-700 mb-4">Tvůj konečný skóre: {score} z {questions.length}</p>
                
                {/* Positive and funny evaluation */}
                {score === questions.length && (
                  <div className="mb-6">
                    <p className="text-gray-700 mb-4">🎉 <strong>Perfektní výsledek! Jsi skutečný znalec mého života a díla!</strong></p>
                    <p className="text-gray-700 mb-4">Mozart by byl pyšný, Haydn by ti podal ruku, a já... já bych ti zahrál na klavír svou nejlepší sonátu!</p>
                    <p className="text-gray-700 mb-4">Víš, co? Pokud bys měl možnost, zavolal bych ti "Beethovenův geniální přítel"!</p>
                  </div>
                )}
                {score >= questions.length / 2 && score < questions.length && (
                  <div className="mb-6">
                    <p className="text-gray-700 mb-4">👏 <strong>Skvělé výsledky! Tvé znalosti jsou obdivuhodné!</strong></p>
                    <p className="text-gray-700 mb-4">Pokračuj ve studiu hudby! Jak říkávám: "Hudba začíná tam, kde končí slova."</p>
                    <p className="text-gray-700 mb-4">Můžeš si říkat "Beethovenův věrný posluchač" - a to je poctivé jméno!</p>
                  </div>
                )}
                {score < questions.length / 2 && (
                  <div className="mb-6">
                    <p className="text-gray-700 mb-4">🎵 <strong>Nezoufej! Každý velký skladatel začínal s jednou notou.</strong></p>
                    <p className="text-gray-700 mb-4">I já jsem začínal s chybami - můj otec mě často bil, když jsem dělal chyby!</p>
                    <p className="text-gray-700 mb-4">Ale pamatuj: "Život je krátký, ale hudba je dlouhá." Takže si vezmi klavír a zahraj si něco!</p>
                  </div>
                )}
                
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium shadow-md"
                >
                  Začít znovu
                </button>
              </div>
            )}
          </div>
        )}

        {/* Beethoven Popup */}
        <AnimatePresence>
          {showBeethoven && (
            <motion.div
              initial={{ x: -350, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -350, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-8 right-8 bg-white rounded-lg p-6 shadow-2xl border-2 border-red-400 max-w-sm"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center border-2 border-amber-300">
                  <span className="text-2xl">🎼</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">Beethoven říká:</h4>
                  <p className="text-gray-700 text-sm leading-relaxed italic">"{incorrectAnswer}"</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fact Popup */}
        <AnimatePresence>
          {showFact && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-amber-50 rounded-lg p-6 shadow-2xl border-2 border-amber-300 max-w-md"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📜</span>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Z mého života...</h4>
                  <p className="text-gray-700 text-sm leading-relaxed italic">"{currentFact}"</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}