import React, { useState, useEffect } from "react";
import { FaBirthdayCake, FaVenusMars, FaSmoking, FaCoffee, FaHeartbeat, FaUserMd, FaWeight, FaRulerVertical } from "react-icons/fa";
import { firstFormPopUp, firstFormPopUpAfterSubmit } from "../functionality/firstFormPopUp";

const FirstFillForm = ({ storedUserEmail }) => {
    const [showForm, setShowForm] = useState(false); // Initially, the form is hidden
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        hight: "",
        weight: "",
        smoking: "",
        coffee: "",
        generalHealth: "",
        allowDoctor: false,
    });

    const [isFirstLogin, setIsFirstLogin] = useState(null); // Initialize as null to handle loading state

    useEffect(() => {
        const checkFirstLogin = async () => {
            const result = await firstFormPopUp(storedUserEmail); // Wait for the result from firstFormPopUp
            setIsFirstLogin(result); // Update the state with the result
        };
        checkFirstLogin();
    }, [storedUserEmail]); // Dependency array to rerun the effect when storedUserEmail changes

    useEffect(() => {
        if (isFirstLogin) {
            setShowForm(true); // Show form if it's the first login
        }
    }, [isFirstLogin]); // This effect runs when isFirstLogin changes

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if all necessary fields are filled
        const isFormValid = Object.values(formData).every(value => value !== "" && (typeof value === "boolean" ? value : true));
        
        if (isFormValid) {
            console.log("Form Data Submitted:", formData);

            // Send the formData to firstFormPopUp.js
            await firstFormPopUpAfterSubmit(storedUserEmail, formData); // Pass both storedUserEmail and formData

            setShowForm(false); // Close the form if it's valid
            alert("The form submmited successfuly!");
        } else {
            alert("Please fill all required fields before submitting!");
        }
    };

    // Don't render the form if it's not the first login or if isFirstLogin is null
    if (isFirstLogin === null) {
        return <div>Loading...</div>; // Show a loading message while determining if it's the first login
    }

    return (
        <div>
            {showForm && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                        <h3 className="text-xl text-blue-900 font-semibold text-center mb-6">Health Information Form</h3>
                        <form className="max-w-xl mx-auto my-4 space-y-6" onSubmit={handleSubmit}>
                            {/* Form fields */}
                            <div className="flex items-center justify-between">
                                <FaBirthdayCake className="mr-2 text-blue-500" />
                                <label htmlFor="age" className="text-gray-700 font-semibold w-1/3">Age:</label>
                                <div className="w-2/3">
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="Please enter your age"
                                        className="p-2 border border-gray-300 rounded w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <FaVenusMars className="mr-2 text-blue-500" />
                                <label htmlFor="gender" className="text-gray-700 font-semibold w-1/3">Gender:</label>
                                <div className="w-2/3">
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="p-2 border border-gray-300 rounded w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <FaRulerVertical className="mr-2 text-blue-500" />
                                <label htmlFor="hight" className="text-gray-700 font-semibold w-1/3">Hight:</label>
                                <div className="w-2/3">
                                    <input
                                        id="hight"
                                        name="hight"
                                        value={formData.hight}
                                        onChange={handleChange}
                                        placeholder="Please enter your hight"
                                        className="p-2 border border-gray-300 rounded w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <FaWeight className="mr-2 text-blue-500" />
                                <label htmlFor="weight" className="text-gray-700 font-semibold w-1/3">Weight:</label>
                                <div className="w-2/3">
                                    <input
                                        id="weight"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        placeholder="Please enter your weight"
                                        className="p-2 border border-gray-300 rounded w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <FaSmoking className="mr-2 text-blue-500" />
                                <label htmlFor="smoking" className="text-gray-700 font-semibold w-1/3">Do you smoke?</label>
                                <div className="w-2/3">
                                    <select
                                        id="smoking"
                                        name="smoking"
                                        value={formData.smoking}
                                        onChange={handleChange}
                                        className="p-2 border border-gray-300 rounded w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <FaCoffee className="mr-2 text-blue-500" />
                                <label htmlFor="coffee" className="text-gray-700 font-semibold w-1/3">How many cups of coffee per day?</label>
                                <div className="w-2/3">
                                    <select
                                        id="coffee"
                                        name="coffee"
                                        value={formData.coffee}
                                        onChange={handleChange}
                                        className="p-2 border border-gray-300 rounded w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="1-2">1-2</option>
                                        <option value="3-6">3-6</option>
                                        <option value="6+">6+</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <FaHeartbeat className="mr-2 text-blue-500" />
                                <label htmlFor="generalHealth" className="text-gray-700 font-semibold w-1/3">General Health Status:</label>
                                <div className="w-2/3">
                                    <textarea
                                        id="generalHealth"
                                        name="generalHealth"
                                        value={formData.generalHealth}
                                        onChange={handleChange}
                                        placeholder="Please enter your general health status"
                                        className="p-2 border border-gray-300 rounded w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-grey-900">
                                <label htmlFor="allowDoctor" className="text-gray-700 font-semibold w-1/3 flex items-center text-sm">
                                    <FaUserMd className="mr-2 text-blue-500" />
                                    I know that doctors can view my data
                                </label>
                                <div className="w-2/3 flex items-center">
                                    <input
                                        type="checkbox"
                                        id="allowDoctor"
                                        name="allowDoctor"
                                        checked={formData.allowDoctor}
                                        onChange={handleChange}
                                        className="form-checkbox h-5 w-5 text-blue-500"
                                        required
                                    />
                                    <span className="ml-2 text-black">Yes, allow doctor to view my data</span>
                                </div>
                            </div>

                            <div className="flex space-x-4 justify-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white border border-blue-500 p-2 rounded w-1/2 hover:bg-blue-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FirstFillForm;
