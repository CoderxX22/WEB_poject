import { db } from "../functionality/firebase"; // Assuming firebase is set up correctly
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

// Function to fetch patient data for a single email
export const patientData = async (userEmail) => {
    try {
        // Reference to the specific document in the "patients" collection
        const patientDocRef = doc(db, "patients", userEmail); // Using userEmail as the document ID
        const userData = await getDoc(patientDocRef);

        if (userData.exists()) {
            return userData.data(); // Return the document data
        } else {
            console.log("No patient data found for email:", userEmail);
            return {}; // Return empty object if no data found
        }
    } catch (err) {
        console.error("Error checking patient data:", err);
        return {}; // Return empty object in case of an error
    }
};

// Function to fetch all patients assigned to a specific doctor
export const patientDataForDoctor = async (userName) => {
    try {
        // Reference to the "users" collection
        const patientDocRef = collection(db, "users");

        // Query to find all documents with "familyDoctor" matching "Dr.<userName>"
        const q = query(patientDocRef, where("familyDoctor", "==", `Dr.${userName}`));
        const querySnapshot = await getDocs(q);

        // Extract the "email" field from each matching document
        const emailArr = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.email) {
                emailArr.push(data.email);
            }
        });

        // If no emails found, return an empty array
        if (emailArr.length === 0) {
            console.log(`No patients found for Dr.${userName}`);
            return [];
        }

        // Array to store patient data
        const patientDataArr = [];

        // Fetch data from "patients" collection for each email
        for (const email of emailArr) {
            const patientDocRef = doc(db, "patients", email);
            const patientDoc = await getDoc(patientDocRef);

            if (patientDoc.exists()) {
                patientDataArr.push(patientDoc.data());
            } else {
                console.warn(`No patient data found for email: ${email}`);
            }
        }

        // Return the array of patient data
        return patientDataArr;
    } catch (err) {
        console.error("Error fetching patient data:", err);
        return []; // Return an empty array in case of an error
    }
};
