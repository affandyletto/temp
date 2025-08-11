import { Eye, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { login } from '@/api/auth';

export const Login = () => {
  const navigate = useNavigate();
  const { checkAuth } = useUser();
  
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowError(false);

    try {
      // Call login API
      await login({
        username,
        password,
        userAgent: navigator.userAgent,
        initialLogin: false
      });

      // After successful login, check auth to get user data & organizations
      await checkAuth();
      
      // Navigate to main app
      navigate('/projects');
      
    } catch (error) {
      setShowError(true);
      
      // Handle different error types
      if (error.type === 'ACTIVE_SESSION') {
        setErrorMessage("You are already logged in on another device. Force login?");
        // TODO: Show force login modal
      } else {
        setErrorMessage(
          error.response?.data?.detail || 
          "The username or password you entered is incorrect. Please check your credentials and try again"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-white overflow-hidden flex">
      {/* Error Message */}
      {showError && (
        <div className="fixed top-5 right-5 w-80 p-3 bg-rose-50 rounded-xl flex justify-start items-start gap-2 z-50">
          <AlertCircle className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
          <div className="flex-1 flex flex-col justify-start items-start gap-0.5">
            <div className="self-stretch text-red-700 text-sm font-semibold font-['Inter'] leading-snug tracking-tight">Login Failed</div>
            <div className="self-stretch text-red-700 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
              {errorMessage}
            </div>
          </div>
        </div>
      )}

      {/* Left Side - Image (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src="/images/loginbg.png" 
          alt="Login Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent"></div>
        
        {/* Logo on image */}
        <div className="absolute top-10 left-10 flex items-center gap-1">
          <div className="w-14 h-14 relative overflow-hidden">
            <img 
              src="/images/Logo.webp" 
              alt="OneSurvey Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-white text-xl font-semibold font-['Inter']">OneSurvey</div>
        </div>
        
        {/* Bottom text on image */}
        <div className="absolute bottom-20 left-10 right-10 flex flex-col gap-2">
          <div className="text-white text-4xl font-semibold font-['Inter'] leading-tight">
            Lorem ipsum dolor sit amet consectetur. Mollis arcu eget.
          </div>
          <div className="text-white text-base font-normal font-['Inter'] leading-6 tracking-wide">
            Lorem ipsum dolor sit amet consectetur. Venenatis viverra mattis neque magna ultrices lacus nulla amet arcu. Nisi scelerisque est potenti
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-md flex flex-col items-start gap-6">
          {/* Logo (visible on mobile only) */}
          <div className="lg:hidden self-stretch flex justify-center items-center gap-1">
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
              Welcome to OneSurvey!
            </div>
            <div className="self-stretch text-center text-zinc-500 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
              Please enter your detail to Sign In
            </div>
          </div>
          
          {/* Form Fields */}
          <div onSubmit={handleLogin} className="self-stretch flex flex-col gap-4">
            {/* Username Field */}
            <div className="self-stretch flex flex-col gap-2">
              <div className="text-gray-800 text-sm font-semibold font-['Inter'] leading-snug tracking-tight">
                Username
              </div>
              <div className={`self-stretch min-h-12 p-4 bg-white rounded-xl border ${showError ? 'border-red-500' : 'border-slate-200'} flex items-center`}>
                <input 
                  type="text" 
                  placeholder="Input username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  className="flex-1 text-sm font-normal font-['Inter'] leading-snug tracking-tight text-zinc-500 bg-transparent outline-none placeholder:text-zinc-500"
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="self-stretch flex flex-col gap-3">
              <div className="self-stretch flex flex-col gap-2">
                <div className="text-gray-800 text-sm font-semibold font-['Inter'] leading-snug tracking-tight">
                  Password
                </div>
                <div className={`self-stretch min-h-12 p-4 bg-white rounded-xl border ${showError ? 'border-red-500' : 'border-slate-200'} flex items-center gap-2`}>
                  <input 
                    type="password" 
                    placeholder="Input password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                    className="flex-1 text-sm font-normal font-['Inter'] leading-snug tracking-tight text-zinc-500 bg-transparent outline-none placeholder:text-zinc-500"
                  />
                  <Eye className="w-5 h-5 text-zinc-500 cursor-pointer" />
                </div>
              </div>
              
              {/* Forgot Password Link */}
              <div className="self-end cursor-pointer" onClick={() => navigate("/forgotPassword")}>
                <div className="text-blue-600 text-sm font-semibold font-['Inter'] leading-snug tracking-tight py-2">
                  Forgot Password?
                </div>
              </div>
            </div>
            
            {/* Sign In Button */}
            <button 
              onClick={handleLogin}
              disabled={loading}
              className="self-stretch px-10 py-4 bg-blue-600 rounded-2xl flex justify-center items-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-white text-sm font-semibold font-['Inter'] leading-snug tracking-tight">
                {loading ? 'Signing In...' : 'Sign In'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}