import { db } from "../functionality/firebase"; // Assuming firebase is set up correctly
import { collection, getDocs, query, where, doc, updateDoc, setDoc } from "firebase/firestore"; // Add updateDoc and setDoc

export const firstFormPopUp = async (userEmail) => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            return userData.firstLogin; // Return the firstLogin value directly
        } else {
            return true; // If no user found, return false as a fallback
        }
    } catch (err) {
        console.error("Error checking first login:", err);
        return; // Return false in case of an error
    }
};

export const firstFormPopUpAfterSubmit = async (userEmail, formData) => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            const userFullName = userData.fullName;
            console.log("Current firstLogin value:", userData.firstLogin);

            // If it's the first login, update the firstLogin to false
            if (userData.firstLogin === true) {
                const userDocRef = doc(db, "users", userDoc.id);
                await updateDoc(userDocRef, {
                    firstLogin: false,
                });

                console.log("First login updated to false.");

                // Now, create a new document in the 'patients' collection
                const patientDocRef = doc(db, "patients", userEmail); // Use email as doc ID
                await setDoc(patientDocRef, {
                    ...formData,   // Store form data
                    userEmail: userEmail, // Include userEmail to link the data
                    fullName: userFullName,
                    createdAt: new Date(), // Optional: timestamp for the document
                    BloodPressure: "N/A", // Optional: default values
                    HeartRate: "N/A",
                    BMI: "N/A",
                });

                console.log("Patient document created successfully with form data.");
            }

            // Return true to indicate the form submission and processing was successful
            return true;
        } else {
            console.log("No user found with the provided email.");
            return false; // Return false if no user found with the email
        }
    } catch (err) {
        console.error("Error during first login or creating patient document:", err);
        return false; // Return false in case of an error
    }
};
