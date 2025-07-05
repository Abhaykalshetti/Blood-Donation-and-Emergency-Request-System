import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaTint,
  FaSyringe,
  FaHandsHelping,
  FaHospitalAlt,
  FaHeartbeat,
} from "react-icons/fa";
import DonorNavbar from "./DonorNavbar"; // Adjust the path if needed

const DonorDashboard = () => {
  const [message, setMessage] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("/api/donor", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMessage(response.data.message);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const articles = [
    {
      title: "Why Blood Donation is a Social Responsibility",
      preview:
        "Learn why donating blood is not just a medical need but a moral duty...",
      full: `Learn why donating blood is not just a medical need but a moral duty we owe to our community.
      Blood donation helps in ensuring timely access to lifesaving blood and components, especially during emergencies.
      When individuals donate, they contribute directly to building a more resilient healthcare system.`,
    },
    {
      title: "Preparing for Your First Blood Donation",
      preview:
        "What to eat, how to hydrate, and how to relax before your first ever...",
      full: `Stay well-hydrated before donating. Eat a healthy meal rich in iron and avoid fatty foods.
      Sleep well the night before and wear comfortable clothes. Carry ID and stay calm — professionals are there to help.`,
    },
    {
      title: "What Happens to Donated Blood?",
      preview:
        "Trace the journey of your donated blood from the donation center...",
      full: `Once donated, blood is tested, separated into components (RBCs, plasma, platelets),
      and stored as needed. It is then matched and delivered to hospitals based on patient requirements.`,
    },
    {
      title: "Overcoming the Fear of Needles",
      preview:
        "Afraid of donating? These tips can help you conquer your fear...",
      full: `Fear of needles is common. Distract yourself during the donation, focus on deep breathing,
      and remember that the discomfort is momentary — but the life you save is forever.`,
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 grid gap-6 pb-12">
        {/* Intro */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-6">
          <div className="text-4xl text-red-500">
            <FaHeartbeat />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              The Importance of Blood Donation
            </h3>
            <p className="text-gray-600">
              Every two seconds someone needs blood. Your single donation can
              save up to three lives. It's a simple act that makes a big
              difference.
            </p>
            <p className="italic text-red-700 mt-2">
              "The gift of blood is a gift to someone's life."
            </p>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
            <p className="font-bold">Info</p>
            <p>{message}</p>
          </div>
        )}

        {/* Welcome Header */}
        <header className="bg-red-50 pt-2">
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-red-700 mb-4">
              Welcome to the Donor Dashboard
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Your contributions can save lives. Stay connected, stay informed.
            </p>

            {/* Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                <FaTint className="text-3xl text-red-600 mb-2" />
                <p className="font-semibold text-gray-700">Donate Blood</p>
                <p className="text-sm text-gray-500">
                  One donation can save up to 3 lives.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                <FaSyringe className="text-3xl text-red-600 mb-2" />
                <p className="font-semibold text-gray-700">Eligibility</p>
                <p className="text-sm text-gray-500">
                  You must be 18+ and healthy to donate.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                <FaHandsHelping className="text-3xl text-red-600 mb-2" />
                <p className="font-semibold text-gray-700">Emergency Help</p>
                <p className="text-sm text-gray-500">
                  Respond to urgent blood requests nearby.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                <FaHospitalAlt className="text-3xl text-red-600 mb-2" />
                <p className="font-semibold text-gray-700">Nearby Camps</p>
                <p className="text-sm text-gray-500">
                  Find camps organized by trusted hospitals.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Blood Facts */}
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            🩸 Did You Know? (Facts about Blood Donation)
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc ml-4 text-gray-700">
            <li>One pint of donated blood can save up to three lives.</li>
            <li>Red blood cells can only be stored for 42 days.</li>
            <li>Only 1% of Indians donate blood annually – we need more!</li>
            <li>You can donate whole blood every 90 days.</li>
            <li>Donating blood burns up to 650 calories per donation!</li>
            <li>
              AB+ is the universal plasma donor; O- is universal blood donor.
            </li>
          </ul>
        </section>

        {/* Articles Section with Toggle */}
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            📚 Articles & Awareness
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {articles.map((article, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200"
              >
                <h4 className="font-bold text-red-700">{article.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {expandedIndex === idx ? article.full : article.preview}
                </p>
                <button
                  className="mt-2 text-red-600 hover:underline text-sm"
                  onClick={() => toggleExpand(idx)}
                >
                  {expandedIndex === idx ? "Show Less" : "Read More"}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DonorDashboard;
