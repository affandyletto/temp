import { Eye, AlertCircle, ArrowLeft } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ForgotPassword=()=>{
	const navigate=useNavigate()
	const [showError, setShowError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Always show error for any login attempt
    setShowError(true);
  };

  return (
    <div className="w-full min-h-screen relative bg-white overflow-hidden flex items-center justify-center px-5 py-8">
      {/* Error Message */}
      {showError && (
        <div className="fixed top-5 right-5 w-80 p-3 bg-rose-50 rounded-xl flex justify-start items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
          <div className="flex-1 flex flex-col justify-start items-start gap-0.5">
            <div className="self-stretch text-red-700 text-sm font-semibold font-['Inter'] leading-snug tracking-tight">Login Failed</div>
            <div className="self-stretch text-red-700 text-sm font-normal font-['Inter'] leading-snug tracking-tight">The username or password you entered is incorrect. Please check your credentials and try again</div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full max-w-sm flex flex-col items-start gap-6">
        {/* Logo */}
        <div className="self-stretch flex justify-center items-center gap-1">
          <div className="w-16 h-16 relative overflow-hidden">
            <img 
              src="/images/Logo.webp" 
              alt="OneSurvey Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        {/* Welcome Text */}
        <div className="self-stretch flex flex-col justify-center items-center gap-1">
          <div className="self-stretch text-center text-gray-800 text-2xl font-bold font-['Inter'] leading-loose">
            Forgot Password?
          </div>
          <div className="self-stretch text-center text-zinc-500 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
            No worries, we’ll send you reset instructions.
          </div>
        </div>
        {/* Form Fields */}
        <form onSubmit={handleLogin} className="self-stretch flex flex-col gap-4">
          {/* Username Field */}
          <div className="self-stretch flex flex-col gap-2">
            <div className="text-gray-800 text-sm font-semibold font-['Inter'] leading-snug tracking-tight">
              Email
            </div>
            <div className={`self-stretch min-h-12 p-4 bg-white rounded-xl border ${showError ? 'border-red-500' : 'border-slate-200'} flex items-center`}>
              <input 
                type="text" 
                placeholder="Input email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 text-sm font-normal font-['Inter'] leading-snug tracking-tight text-zinc-500 bg-transparent outline-none placeholder:text-zinc-500"
              />
            </div>
          </div>
          {/* Sign In Button */}
          <button 
            type="submit"
            className="self-stretch px-10 py-4 bg-primary-200 rounded-2xl flex justify-center items-center hover:bg-primary-300 transition-colors"
          >
            <span className="text-white text-sm font-semibold font-['Inter'] leading-snug tracking-tight">
              Send Reset Link
            </span>
          </button>
          <div onClick={()=>{
          	navigate("/login")
          }} className="rounded-full inline-flex justify-center items-center gap-2 px-4 py-2 hover:bg-cyan-50 transition-colors">
		      <ArrowLeft className="w-4 h-4 text-primary-200" />
		      <span className="text-primary-200 text-sm font-semibold font-['Inter'] leading-snug tracking-tight">
		        Back to Sign In
		      </span>
		    </div>
        </form>
      </div>
    </div>
    )
}