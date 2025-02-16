import { collection, getDocs, query, where,addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import { getCookie } from "./loginlogic"; // Adjust path if needed

export const fetchAppointmentsForDoctor = async (doctorName, setUpcomingAppointments, setPastAppointments) => {
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

// Fetch doctors from Firestore
export const fetchDoctors = async () => {
    try {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(usersRef);
      
      const doctorsList = querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          if (data.role && data.role === "Doctor") {
            return {
              id: doc.id,
              name: "Dr." + data.fullName,
            };
          }
          return null;
        })
        .filter(doctor => doctor !== null); // Remove any null entries
      
        return doctorsList;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("Failed to fetch doctors list");
    }
  };

// Fetch appointments from Firestore
export const fetchAppointmentsForPatient = async (storedUserEmail) => {
  try {
    if (!storedUserEmail) {
      throw new Error("User email not found.");
    }

    const appointmentsRef = collection(db, "appointments");
    const querySnapshot = await getDocs(appointmentsRef);
    
    // Filter appointments for the current user
    const userAppointments = querySnapshot.docs
      .map((doc) => doc.data())
      .filter((appointment) => appointment.userEmail === storedUserEmail);

    return userAppointments;
  } catch (err) {
    console.error("Error fetching appointments:", err);
  }
};

export const handleCreateAppointment = async (
  e,
  newAppointment,
  setNewAppointment,
  setAppointments,
  setShowAddAppointment,
  setLoading,
  setError
) => {
  e.preventDefault();

  const missingFields = [];
  if (!newAppointment.doctorName) missingFields.push("Doctor's Name");
  if (!newAppointment.date) missingFields.push("Date");
  if (!newAppointment.time) missingFields.push("Time");
  if (!newAppointment.specialty) missingFields.push("Specialty");
  if (!newAppointment.location) missingFields.push("Location");

  if (missingFields.length > 0) {
    alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
    return;
  }

  // Check if the chosen date is in the past
  const selectedDate = new Date(newAppointment.date);
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Remove time components for pure date comparison

  if (selectedDate <= now) {
    alert("Choose a date at least for tomorrow");
    return;
  }

  try {
    setLoading(true);
    const storedUserEmail = getCookie("email");
    if (!storedUserEmail) {
      throw new Error("User email not found. Please log in.");
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", storedUserEmail));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
      throw new Error("User not found.");
    }

    // Get the first document in the snapshot
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    const fullName = userData.fullName;

    // Prepare the appointment data
    const appointmentData = {
      doctorName: newAppointment.doctorName,
      date: newAppointment.date,
      time: newAppointment.time,
      specialty: newAppointment.specialty,
      location: newAppointment.location,
      patientName: fullName, // Add user's full name
      userEmail: storedUserEmail, // Add user's email to track who created it
    };

    // Save the appointment in the global "appointments" collection
    const appointmentsCollectionRef = collection(db, "appointments");
    await addDoc(appointmentsCollectionRef, appointmentData);

    setAppointments((prevAppointments) => [...prevAppointments, appointmentData]);
    setNewAppointment({
      doctorName: "",
      date: "",
      time: "",
      specialty: "",
      location: "",
    });
    setShowAddAppointment(false);
    alert("Appointment created successfully!");
  } catch (err) {
    console.error("Error creating appointment:", err);
    setError("Failed to create appointment. Please try again later.");
  } finally {
    setLoading(false);
  }
};


