const LoginForm = ({ email, setEmail, password, setPassword }) => {
   return (
        <div>
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
        </div>
    );
};

export default LoginForm;