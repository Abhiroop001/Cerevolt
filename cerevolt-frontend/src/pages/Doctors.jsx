import { useState, useEffect } from "react";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/doctor/sel")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  const handleBook = (doctorName) => {
    alert(`Booking an appointment with ${doctorName}...`);
    // 🔜 Later, redirect to your appointment booking page:
    // navigate(`/book-appointment/${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* 🌟 Hero Section */}
      <section className="text-center py-16 px-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md">
        <h1 className="text-5xl font-bold mb-4">Meet Our Expert Doctors</h1>
        <p className="max-w-3xl mx-auto text-lg text-indigo-100 leading-relaxed">
          At <strong>Cerevolt Health</strong>, our team of dedicated doctors combines
          experience, compassion, and innovation to bring you world-class care.
          Whether you need a specialist or a friendly consultation, you’re in the best hands.
        </p>
      </section>

      {/* 🩺 Doctors Section */}
      <div className="container mx-auto px-6 py-12">
        {doctors.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">Loading doctors...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transition-transform transform hover:scale-[1.03] hover:shadow-2xl"
              >
                {/* Doctor Image */}
                <div className="w-40 h-40 mb-4">
                  <img
                    src={"http://localhost:2000/doctor_img/" + doctor.dimg}
                    alt={doctor.dname}
                    className="w-full h-full object-cover rounded-full border-4 border-indigo-500 shadow-md"
                  />
                </div>

                {/* Doctor Info */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                  {doctor.dname}
                </h2>
                <p className="text-indigo-600 text-sm mb-2">{doctor.dqualification}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {doctor.ddescription}
                </p>

                {/* Appointment Button */}
                <button
                  onClick={() => handleBook(doctor.dname)}
                  className="bg-indigo-500 text-white px-5 py-2 rounded-md hover:bg-indigo-600 transition"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
