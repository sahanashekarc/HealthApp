import React, { useEffect, useState } from "react";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  // 👉 Replace this with how you actually store userId (localStorage/auth/etc.)
  const userId = "69bce7e44d5183b2b6982704";

  const fetchAppointments = async () => {
    try {
      const res = await fetch(
        `http://localhost:5003/api/appointments/user/${userId}`
      );
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // ✅ FIX: runs only once (prevents infinite API calls)
  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <div>
          {appointments.map((appt) => (
            <div
              key={appt._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <p><strong>Patient:</strong> {appt.patientName}</p>
              <p><strong>Doctor:</strong> {appt.doctorName}</p>
              <p><strong>Department:</strong> {appt.department}</p>
              <p><strong>Date:</strong> {appt.appointmentDate}</p>
              <p><strong>Time:</strong> {appt.appointmentTime}</p>
              <p><strong>Reason:</strong> {appt.reason}</p>
              <p><strong>Notes:</strong> {appt.notes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Appointments;