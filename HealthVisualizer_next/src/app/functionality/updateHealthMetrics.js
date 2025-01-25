import { db } from "../functionality/firebase"; // Assuming firebase is set up correctly
import { collection, getDocs, query, where, doc, updateDoc, setDoc } from "firebase/firestore"; // Add updateDoc and setDoc

export const handleSave = async (selectedPatient) => {
  try {
    // Reference to the patient's document
    const patientRef = doc(db, "patients", selectedPatient.email); // Use email as the document ID

    // Update the document with the new values
    await updateDoc(patientRef, {
      smoking: editedPatient.smoking,
      generalHealth: editedPatient.generalHealth,
      bloodPressure: editedPatient.bloodPressure,
      heartRate: editedPatient.heartRate,
      bmi: editedPatient.bmi,
      weight: editedPatient.weight,
      height: editedPatient.height,
    });

    // After updating, exit edit mode
    setIsEditing(false);
    alert("Patient details updated successfully!");
  } catch (error) {
    console.error("Error updating patient details:", error);
    alert("Failed to update patient details.");
  }
};
