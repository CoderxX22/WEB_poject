const SignupForm = ({ email, setEmail, password, setPassword, fullName, setFullName, role, setRole, specialInput, setSpecialInput }) => {  
    return (
        <div>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">Name</label>
                <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter Full Name"
                className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
                <input
                type="email"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</label>
                <input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-300">Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <label htmlFor="role" className="block text-gray-700 dark:text-gray-300">Role</label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">--Select a Role--</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Patient">Patient</option>
                </select>
                <label htmlFor="specialInput" className="block text-gray-700 dark:text-gray-300">Special Input</label>
                <input
                    type="text"
                    id="specialInput"
                    value={specialInput}
                    onChange={(e) => setSpecialInput(e.target.value)}
                    disabled={role === "Patient" || role === ""}
                    className={`w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 text-black ${
                    role === "Patient" || role === ""
                        ? "cursor-not-allowed bg-gray-300 text-gray-400"
                        : "dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }`}
                    placeholder={
                    role === "Patient" || role === ""
                        ? "Disabled for this role"
                        : "Enter Number"
                    }
                    required
                />
            </div>
        </div>
    );
};

export default SignupForm;
