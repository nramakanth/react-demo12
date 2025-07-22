import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from '../supabase';

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    
    try {
      // Step 1: Sign in
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        console.error('Authentication error:', authError);
        setMessage(authError.message);
        return;
      }

      if (!authData?.user) {
        setMessage("Login failed. Please check your credentials.");
        return;
      }

      // Step 2: After successful login, fetch user data from your database
      const { data: userData, error: dbError } = await supabase
        .from('users')  // replace with your table name
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        setMessage("Logged in but couldn't fetch user data.");
        return;
      }

      // Store both auth and user data
      localStorage.setItem('user', JSON.stringify({
        ...authData.user,
        userData: userData
      }));

      setMessage("Login successful!");
      navigate('/home');

    } catch (err) {
      console.error('Unexpected error:', err);
      setMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-bold text-gray-900">
            <span className="text-blue-600">Auto</span>Care Pro
          </h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
            <Link
              to="/register"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Register new account
            </Link>
          </div>
        </form>
        {message && (
          <div className={`mt-2 text-center text-sm ${message.includes('Error') || message.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
} 