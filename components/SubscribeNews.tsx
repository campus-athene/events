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
    <div className="mx-4 mt-8 rounded-xl bg-violet py-10 px-10 text-white sm:mx-10">
      <p className="mb-2 text-lg">Verpasse keine weiteren Events mehr!</p>
      <p className="mb-8">
        Erhalte wöchentlich unseren Newsletter mit den kommenden Highlights.
      </p>
      {hasSubscribed ? (
        <p className="mt-4 rounded-full py-2 text-center font-medium text-white sm:mt-0 sm:text-left">
          Vielen Dank!
        </p>
      ) : (
        <>
          <input
            className="mx-auto block w-full max-w-xs rounded-full bg-slate-600 py-2 pl-6 pr-6 placeholder-slate-300 sm:mx-0 sm:inline-block sm:w-64 sm:rounded-r-none sm:pr-2"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail-Adresse"
            type="email"
            value={email}
          />
          <button
            className="mx-auto mt-4 block rounded-full bg-amber-500 py-2 pl-9 pr-9 font-medium text-white sm:mx-0 sm:mt-0 sm:inline-block sm:rounded-l-none sm:pl-8"
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
