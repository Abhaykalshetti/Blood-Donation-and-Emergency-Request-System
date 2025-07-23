// src/pages/common/Notifications.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";
import api from "../../services/api";

const DonorNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/api/get-profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
       console.log(response.data.notifications);
       
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);
    const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });}

  return (
     <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-700">
        🔔 Your Notifications
      </h2>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">No notifications yet.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((note, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-lg p-4 border-l-4 border-red-600"
            >
              <div className="text-sm font-semibold text-red-700">
                {note.sender}
              </div>
              <div className="text-gray-700 mt-1">{note.message}</div>
              <div className="text-right mt-2 text-xs text-gray-500 italic">
                {formatDateTime(note.timestamp)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorNotifications;
