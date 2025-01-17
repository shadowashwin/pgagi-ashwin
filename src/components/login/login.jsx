import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/feature/login/loginSlice';

export default function login_signup() {

  const dispatch = useDispatch();

  // const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  // const username = useSelector((state) => state.login.username);
  // const gender = useSelector((state) => state.login.gender);

  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const extractUsername = (email) => {
    const emailPrefix = email.split("@")[0];
    return emailPrefix.replace(/[0-9]/g, "");
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    // Get form values
    const email = e.target.email.value;
    const password = e.target.password.value;
    const gender = e.target.gender.value;

    // Extract name from email (everything before @)
    const username = extractUsername(email);

    // Create user object
    const user = {
      email,
      password,
      username,
      gender
    };

    // Get existing users from localStorage or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    if (existingUsers.some(u => u.email === email)) {
      setErrorMessage('Email already registered');
      return;
    }

    // Add new user to array and save back to localStorage
    existingUsers.push(user);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Clear form and switch to login
    e.target.reset();
    setErrorMessage('');
    setIsSigningUp(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Get form values
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      setErrorMessage('Invalid email or password');
      return;
    }

    // Dispatch user data to Redux store
    dispatch(login({
      username: user.username,
      gender: user.gender
    }));

    // Clear form and error message
    e.target.reset();
    setErrorMessage('');
  };

  return (
    <div className="w-full rounded-lg border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-md shadow-lg shadow-[rgba(30,30,30,0.5)]">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          {isSigningUp ? "Sign Up" : "Sign in to your account"}
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={isSigningUp ? handleSignUp : handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-transparent border border-gray-100 text-white rounded-lg block w-full p-2.5"
              placeholder="name@xyz.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-transparent border border-gray-300 text-white rounded-lg block w-full p-2.5"
              placeholder="••••••••"
              required
            />
          </div>
          {isSigningUp && (
            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-white"
              >
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                className="bg-transparent border border-gray-300 text-white rounded-lg block w-full p-2.5"
                required
              >
                <option className='bg-transparent text-black' value="">Select gender</option>
                <option className='bg-transparent text-black' value="male">Male</option>
                <option className='bg-transparent text-black' value="female">Female</option>
              </select>
            </div>
          )}
          {errorMessage && (
            <p className="text-sm font-light text-red-500">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full text-white p-3 border hover:shadow-lg hover:shadow-white border-white rounded-lg hover:bg-white hover:text-black hover:font-bold"
          >
            {isSigningUp ? "Sign Up" : "Sign In"}
          </button>
          <div className="text-sm font-light text-gray-400">
            {isSigningUp ? (
              <div className="text-white">Already have an account? <button type="button" className="font-medium text-white hover:underline" onClick={() => setIsSigningUp(false)}>Log In</button></div>
            ) : (
              <div className="text-white">Don’t have an account yet? <button type="button" className="font-medium text-white hover:underline " onClick={() => setIsSigningUp(true)}>Sign Up</button></div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
