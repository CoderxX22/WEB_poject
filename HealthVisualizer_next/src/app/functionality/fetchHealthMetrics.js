import { db } from "../functionality/firebase";
import { collection, getDocs, query, where, doc, updateDoc, setDoc } from "firebase/firestore"; // Add updateDoc and setDoc

export const fetchPatientDetails = async (email) => {
  try {
    // Reference to the patient's document using the email
    const patientRef = collection(db, "patients"); // Using email as document ID
    const patientQuery = query(patientRef, where("userEmail", "==", email)); // Query the patient collection for the email
    const querySnapshot = await getDocs(patientQuery); // Fetch the document

    if (!querySnapshot.empty) {
      // If the patient exists, retrieve the specific fields
      const patientData = querySnapshot.docs[0].data();
      return {
        bloodPressure: patientData.BloodPressure,
        height: patientData.hight,
        weight: patientData.weight,
        heartRate: patientData.HeartRate,
        bmi: patientData.BMI,
      };
    } else {
      console.log("No such patient document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return null;
  }
};
