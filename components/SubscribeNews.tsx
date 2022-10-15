import { MouseEventHandler, useState } from "react";

const SubscribeNews = () => {
  const [email, setEmail] = useState("");
  const [hasSubscribed, setHasSubscribed] = useState(false);

  const onSubscribe: MouseEventHandler<HTMLButtonElement> = () => {
    if (!email) {
      alert("Bitte gib Deine E-Mail-Adresse an.");
      return;
    }

    fetch("/api/subscribeNews", {
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    setHasSubscribed(true);
  };

  return (
    <div className="bg-violet mt-8 mx-4 sm:mx-10 py-10 px-10 rounded-xl text-white">
      <p className="mb-2 text-lg">Verpasse keine weiteren Events mehr!</p>
      <p className="mb-8">
        Erhalte wöchentlich unseren Newsletter mit den kommenden Highlights.
      </p>
      {hasSubscribed ? (
        <p className="mt-4 sm:mt-0 py-2 rounded-full text-white text-center sm:text-left font-medium">
          Vielen Dank!
        </p>
      ) : (
        <>
          <input
            className="bg-slate-600 block sm:inline-block mx-auto sm:mx-0 rounded-full sm:rounded-r-none py-2 pl-6 pr-6 sm:pr-2 placeholder-slate-300 w-full sm:w-64 max-w-xs"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail-Adresse"
            type="email"
            value={email}
          />
          <button
            className="bg-amber-500 block sm:inline-block mx-auto sm:mx-0 mt-4 sm:mt-0 py-2 pl-9 sm:pl-8 pr-9 rounded-full sm:rounded-l-none text-white font-medium"
            onClick={onSubscribe}
          >
            Abonnieren
          </button>
        </>
      )}
    </div>
  );
};

export default SubscribeNews;
