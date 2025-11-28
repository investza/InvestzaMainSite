import { useState, React } from "react";

function ReviewMyportfolioForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    console.log("Form submitted successfully");
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/60  flex items-center justify-center z-[999] p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-slide-in-up relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-5 text-gray-800 text-center">
          Review My Portfolio
        </h2>
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter Your Name"
            className="border px-4 py-3 rounded-lg 
               focus:ring-2 focus:ring-purple-500 
               outline-none text-black 
               placeholder-gray-600
               text-base sm:text-lg text-2xl" required
          />

          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            maxLength={10}
            placeholder="Phone Number"
            className="border px-4 py-3 rounded-lg 
               focus:ring-2 focus:ring-purple-500 
               outline-none text-black 
               placeholder-gray-600
               text-base sm:text-lg" required
          />

          <button
            type="submit"
            className="bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 
               text-white py-3 rounded-lg text-lg font-medium 
               hover:opacity-90 transition-all mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewMyportfolioForm;
