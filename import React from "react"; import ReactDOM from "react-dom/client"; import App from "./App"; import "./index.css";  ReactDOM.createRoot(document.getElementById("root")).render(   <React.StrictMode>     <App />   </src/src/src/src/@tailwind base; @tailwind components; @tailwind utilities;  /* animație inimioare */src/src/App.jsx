import { useState, useEffect } from "react";

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesClicked, setYesClicked] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (!yesClicked) return;

    const interval = setInterval(() => {
      const id = Math.random().toString(36).substring(2, 9);
      const left = Math.random() * 90;
      setHearts((prev) => [...prev, { id, left }]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 5000);
    }, 300);

    return () => clearInterval(interval);
  }, [yesClicked]);

  const messages = [
    "Are you sure, Simona? 🥺",
    "Really sure? 💔",
    "Think again, Simona… 😢",
    "I’ll be very sad 😭",
    "Please say yes ❤️",
    "Don’t break my heart 💘"
  ];

  const handleNo = () => setNoCount(noCount + 1);
  const handleYes = () => setYesClicked(true);

  const noButtonSize = 16 - noCount * 2;
  const yesButtonSize = 16 + noCount * 2;

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-pink-100 p-4 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-red-500 text-2xl animate-fall"
          style={{ left: `${heart.left}%`, top: "-5%" }}
        >
          💖
        </div>
      ))}

      {yesClicked && (
        <audio autoPlay loop>
          <source src="/isee-red.mp3" type="audio/mpeg" />
        </audio>
      )}

      <div className="text-center bg-white rounded-3xl shadow-xl p-6 sm:p-8 max-w-md w-full">
        {!yesClicked ? (
          <>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-pink-600">
              Simona, will you be my Valentine? ❤️
            </h1>

            {noCount > 0 && (
              <p className="mb-4 text-gray-600 text-sm sm:text-base">
                {messages[Math.min(noCount - 1, messages.length - 1)]}
              </p>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <button
                onClick={handleYes}
                style={{ fontSize: `${yesButtonSize}px` }}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-xl transition-all"
              >
                Yes ❤️
              </button>

              <button
                onClick={handleNo}
                style={{ fontSize: `${noButtonSize > 8 ? noButtonSize : 8}px` }}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-xl transition-all"
              >
                No 😢
              </button>
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-4">
              YAYYY SIMONA!!! ❤️🎉
            </h1>
            <p className="text-base sm:text-lg text-gray-700">
              You just made me the happiest person alive 💖
            </p>
            <div className="mt-6 text-4xl sm:text-5xl">💘💘💘</div>
          </div>
        )}
      </div>
    </div>
  );
}
