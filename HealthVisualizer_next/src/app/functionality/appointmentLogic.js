import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export const fetchAppointments = async (doctorName, setUpcomingAppointments, setPastAppointments) => {
  try {
    const appointmentsRef = collection(db, "appointments");

    // Query to fetch appointments for the specified doctor
    const q = query(appointmentsRef, where("doctorName", "==", doctorName));

    const appointmentsSnapshot = await getDocs(q);

    const currentDate = new Date();
    const upcoming = [];
    const past = [];

    appointmentsSnapshot.forEach((doc) => {
      const appointment = doc.data();

      if (appointment.date && appointment.time) {
        const appointmentDate = new Date(appointment.date.toDate());

        const appointmentWithId = {
          id: doc.id,
          ...appointment,
        };

        // Convert current date to a Firestore Timestamp
        const currentDateWithoutTime = new Date();
        const ToTimeStamp = Timestamp.fromDate(currentDateWithoutTime);

        if (appointment.date >= ToTimeStamp) {
          upcoming.push(appointmentWithId);
        } else {
          past.push(appointmentWithId);
        }
      }
    });

    // Sort the appointments by date and time
    const sortByDateTime = (a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA - dateTimeB;
    };

    setUpcomingAppointments(upcoming.sort(sortByDateTime));
    setPastAppointments(past.sort(sortByDateTime).reverse());
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
};
