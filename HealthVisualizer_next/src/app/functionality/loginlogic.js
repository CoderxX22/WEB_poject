import { db } from "../functionality/firebase";
import { collection, getDocs, query, where, setDoc, doc, updateDoc } from "firebase/firestore";

export const handleFormSubmit = async ({
  isLogin,
  email,
  password,
  fullName,
  role,
  specialInput,
  setError,
  navigateToRole,
  familyDoctor,
}) => {
  try {
    if (isLogin) {
      console.log("Logging in...");
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]
        const userData = userDoc.data();
        const userRole = userData?.role;
        const userPass = userData?.password;
        const userName = userData?.fullName;
        const userConn = userData?.connected;

        if (userPass !== password) {
          setError("The Password is incorrect");
        } else if (!userConn) {
          const userDocRef = doc(db, "users", userDoc.id);
          await updateDoc(userDocRef, { connected: true });
          if (userRole) {
            console.log(`User role: ${userRole}`);
            navigateToRole(userRole, userName, email);
          } else {
            setError("User role is not defined in the database.");
          }
        } else {
          alert("The User is already connected from another device");
        }
      } else {
        setError("No user found with this email.");
      }
    } else {
      console.log("Signing up...");
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        alert("The email you entered already exists.");
      } else {
        await setDoc(doc(usersRef), {
          fullName,
          email,
          password,
          role,
          specialInput: role === "Doctor" ? specialInput : "Null",
          connected: false,
          familyDoctor,
          firstLogin: role === "Doctor" ? false : true,
        });
        alert("Signup successful! Click OK to refresh.");
        window.location.reload();
      }
    }
  } catch (err) {
    console.error("Error during form submission:", err);
    setError("An error occurred. Please try again.");
  }
};

export const navigateToRole = (role, userName, email) => {
  document.cookie = `userName=${userName}; path=/`;
  document.cookie = `email=${email}; path=/`;
  document.cookie = `role=${role}; path=/`;

  if (role === "Doctor") {
    window.location.href = "/pages/DoctorScreen";
  } else if (role === "Patient") {
    window.location.href = "/pages/PatientScreen";
  } else {
    console.log("Role not selected or invalid");
  }
};

export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  
  export const logOut = async () => {
    try {
      const email = getCookie("email");
      if (email) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userDocRef = doc(db, "users", userDoc.id);
  
          await updateDoc(userDocRef, { connected: false });
  
          // Clear cookies
          document.cookie = "userName=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          document.cookie = "email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  
          // Redirect to login
          window.location.href = "/";
        }
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  export const fetchDoctors = async () => {
    try {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(usersRef);
  
      const doctors = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          if (data.role && data.role === "Doctor") {
            return {
              id: doc.id,
              name: "Dr." + data.fullName,
            };
          }
          return null;
        })
        .filter((doctor) => doctor !== null); // Filter out non-doctor entries
  
      return doctors;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw new Error("Failed to fetch doctors");
    }
  };
  