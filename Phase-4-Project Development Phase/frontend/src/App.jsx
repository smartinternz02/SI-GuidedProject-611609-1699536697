import { useState } from "react";
import { setintoBackend } from "./sendInput";
function App() {
  const [form, setForm] = useState({
    type: "",
    amount: "",
    oldbalanceOrg: "",
    newbalanceOrig: "",
  });

  const [loading, setLoading] = useState(false);
  const [Predict, setPrediction] = useState("Not yet predicted");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(form);
      await sendtoBackend();
    } catch (error) {
      console.error("Error sending data to backend:", error);
    } finally {
      setLoading(false);
      setForm({
        type: "",
        amount: "",
        oldbalanceOrg: "",
        newbalanceOrig: "",
      });
    }
  };

  const sendtoBackend = async () => {
    try {
      console.log(form);
      const response = await setintoBackend(form);

      console.log(response.prediction[0]);
      setPrediction(response.prediction[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  return (
    <div className="md:grid md:place-content-center md:h-screen font-default">
      <div className="flex flex-col md:flex-row bg-white md:rounded-r-3xl w-full md:w-9/12 md:mx-auto md:shadow-2xl">
        <div className="md:w-2/4 bg-gradient-to-b from-light-slate-blue to-light-royal-blue rounded-b-3xl p-5 md:rounded-3xl flex flex-col items-center">
          <div className="pb-4 pt-2 text-pale-blue font-medium text-lg">
            Accuracy
          </div>
          <div className="rounded-full p-11 font-bold m-5 bg-gradient-to-b from-violet-blue to-persian-blue flex flex-col items-center">
            <div className="text-5xl text-pale-blue">76</div>
            <div className="text-pale-blue font-medium text-xs">of 100</div>
          </div>
          <div className="text-pale-blue font-semibold tracking-wide text-2xl">
            {Predict}
          </div>
          <div className="pb-4 pt-4 pr-8 pl-8 text-pale-blue font-extralight tracking-wide text-center text-xs">
            Online fraud predictions are algorithmic and statistical, but not
            infallible; additional security measures and human oversight are
            advised.
          </div>
        </div>
        <div className="p-5 space-y-8">
          <h1 className="text-2xl font-bold mb-3">Enter Values</h1>
          <div className="space-y-2">
            <form
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col gap-8"
              action="">
              <input
                type="text"
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Type"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              />
              <input
                type="text"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              />
              <input
                type="text"
                name="oldbalanceOrg"
                value={form.oldbalanceOrg}
                onChange={handleChange}
                placeholder="Old Balance Org"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              />
              <input
                type="text"
                name="newbalanceOrig"
                value={form.newbalanceOrig}
                onChange={handleChange}
                placeholder="New Balance Orig"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              />
              <button
                type="submit"
                className="bg-tertiary py-3 px-8 outline-none w-fit text-black font-bold shadow-md shadow-primary rounded-xl">
                {loading ? "Predicting" : "Predict"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
