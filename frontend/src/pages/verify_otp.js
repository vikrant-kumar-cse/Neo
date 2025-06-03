import React, { useState, useEffect, useRef } from 'react';


// Mock Spinner component
const Spinner = () => (
  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
);

// OTP Input component
const OtpInput = ({ length = 6, value = '', onChange, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  // Initialize refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Focus on first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      setTimeout(() => inputRefs.current[0].focus(), 100);
    }
  }, []);

  // Update OTP array when value prop changes
  useEffect(() => {
    if (value) {
      const otpArray = value.split('').slice(0, length);
      setOtp([...otpArray, ...Array(length - otpArray.length).fill('')]);
    }
  }, [value, length]);

  const handleChange = (e, index) => {
    const { value: inputValue } = e.target;
    
    // Only allow digits
    if (!/^\d*$/.test(inputValue)) return;
    
    // Update the OTP array
    const newOtp = [...otp];
    
    // If user pastes a value with multiple characters
    if (inputValue.length > 1) {
      // Take the needed characters for current and subsequent fields
      const pastedData = inputValue.split('');
      
      for (let i = 0; i < length - index; i++) {
        if (i < pastedData.length) {
          newOtp[index + i] = pastedData[i];
        }
      }
      
      setOtp(newOtp);
      
      // Focus on the next empty input or the last one
      const nextIndex = Math.min(index + pastedData.length, length - 1);
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
        inputRefs.current[nextIndex].select();
      }
    } else {
      // Normal input of a single character
      newOtp[index] = inputValue.substring(0, 1);
      setOtp(newOtp);
      
      // Focus on next input if available
      if (inputValue && index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
    
    // Call onChange with the complete string
    const otpString = newOtp.join('');
    onChange(otpString);
    
    // If all fields are filled, call onComplete
    if (newOtp.join('').length === length) {
      if (onComplete) onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    // If backspace is pressed on an empty input, move to previous
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
    
    // Arrow navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
    
    if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (!/^\d*$/.test(pasteData)) return;
    
    handleChange({ target: { value: pasteData } }, index);
  };

  return (
    <div className="flex justify-between gap-2">
      {Array(length).fill(null).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          maxLength={1}
          value={otp[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={handleFocus}
          onPaste={(e) => handlePaste(e, index)}
          inputMode="numeric"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
};

// Timer component for resending OTP
const ResendTimer = ({ initialSeconds = 60, onTimerEnd }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  
  useEffect(() => {
    if (seconds <= 0) {
      if (onTimerEnd) onTimerEnd();
      return;
    }
    
    const timer = setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [seconds, onTimerEnd]);
  
  return (
    <span className="text-gray-500">
      {seconds > 0 ? `Resend in ${seconds}s` : ''}
    </span>
  );
};

// Main verification component
const VerifyUI = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Navigation mock function
  const navigate = (path) => {
    console.log(`Navigate to: ${path}`);
    // In a real app, this would use your routing system
    window.location.href = path; // Added this line to actually navigate
  };

  // Extract token from URL if present
  const [token, setToken] = useState('');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  // Slider logic
  const nextSlide = () => setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1));
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const slidesContent = [
    { image: '/images/shoe1.png', title: 'Stunning Stores For Your Brand' },
    { image: '/images/shoe2.png', title: 'Seamless User Experience' },
    { image: '/images/fas1.png', title: 'Seamless Buying Experience' }
  ];

  // Verify code logic
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [errors, setErrors] = useState({});
  const [canResend, setCanResend] = useState(false);
  const [email, setEmail] = useState('ex***@example.com'); // Masked email for display

  // Set up email from localStorage or default value
  useEffect(() => {
    // In a real app, you would get this from localStorage or context
    const storedEmail = localStorage.getItem('userEmail') || 'user@example.com'; // Get from localStorage
    if (storedEmail) {
      // Mask email for privacy
      const [username, domain] = storedEmail.split('@');
      const maskedUsername = username.length > 3 ? 
        `${username.substring(0, 2)}***` : 
        `${username.substring(0, 1)}***`;
      setEmail(`${maskedUsername}@${domain}`);
    }
  }, []);

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setErrors({ verificationCode: 'Please enter the complete 6-digit code' });
      return;
    }
    
    setErrors({});
    setIsLoading(true);
    
    try {
      // API endpoint with the code
      const apiUrl = `http://localhost:8080/auth/verify-code`;
      
      // Add token to request if available
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verification_code: verificationCode, // <-- This needs to match the backend
          token: token || undefined
        })
      };
      
      const response = await fetch(apiUrl, requestOptions);
      
      // Handle response
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Verification failed. Please try again.');
      }
      
      const data = await response.json();
      
      setSuccessMessage('Verification successful! Redirecting...');
      
      // Store any returned tokens or user data if needed
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      // Redirect after successful verification
      setTimeout(() => {
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          navigate('/BrandLogin'); // Default redirect
        }
      }, 1500);
      
    } catch (error) {
      setErrors({ verifyGeneral: error.message || 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    // Navigate to the resend_otp route instead of making API call directly
    navigate('/resend_otp');
  };

  const brandName = "NeoMarche";

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="p-6 md:p-12 max-w-md mx-auto">
          <div className="mb-8">
            <div className="flex items-center">
              <div className="text-indigo-600 mr-2">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6ZM16 24C11.582 24 8 20.418 8 16C8 11.582 11.582 8 16 8C20.418 8 24 11.582 24 16C24 20.418 20.418 24 16 24Z" fill="#4F46E5" />
                  <path d="M16 12C13.791 12 12 13.791 12 16C12 18.209 13.791 20 16 20C18.209 20 20 18.209 20 16C20 13.791 18.209 12 16 12Z" fill="#4F46E5" />
                  <path d="M16 0C12.318 0 9.318 2.95 9.318 6.591C9.318 7.141 9.768 7.591 10.318 7.591C10.868 7.591 11.318 7.141 11.318 6.591C11.318 4.054 13.409 2 16 2C18.591 2 20.682 4.054 20.682 6.591C20.682 7.141 21.132 7.591 21.682 7.591C22.232 7.591 22.682 7.141 22.682 6.591C22.682 2.95 19.682 0 16 0Z" fill="#4F46E5" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{brandName}</h2>
            </div>
          </div>
          <div className="flex-1">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="flex items-center text-gray-600 mb-6 hover:text-gray-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              Back to login
            </button>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Verify Your Email</h1>
            <div className="mb-6">
              <p className="text-gray-600">
                Enter the 6-digit code we sent to <strong>{email}</strong>
              </p>
            </div>
            
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">{successMessage}</p>
              </div>
            )}
            
            {errors.verifyGeneral && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-500">{errors.verifyGeneral}</p>
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Verification Code</label>
              <OtpInput 
                length={6}
                value={verificationCode}
                onChange={value => {
                  setVerificationCode(value);
                  setErrors({});
                }}
                onComplete={handleVerifyCode}
              />
              {errors.verificationCode && (
                <p className="mt-2 text-sm text-red-500">{errors.verificationCode}</p>
              )}
            </div>
            
            <div className="flex justify-between items-center mb-8">
              {canResend ? (
                <button 
                  type="button"
                  className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
                  onClick={handleResendCode}
                >
                  Resend Code
                </button>
              ) : (
                <ResendTimer 
                  initialSeconds={30} 
                  onTimerEnd={() => setCanResend(true)} 
                />
              )}
            </div>
            
            <button
              type="button"
              className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex justify-center items-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              onClick={handleVerifyCode}
              disabled={isLoading || verificationCode.length !== 6}
            >
              {isLoading ? <Spinner /> : 'Verify & Continue'}
            </button>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Didn't receive the code?{" "}
                <button 
                  type="button" 
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                  onClick={() => navigate('/resend_otp')}
                >
                  Request another code
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side: Slider */}
      <div className="hidden md:block w-full md:w-1/2 h-screen bg-gray-900 relative">
        <div role="tablist" className="h-full" aria-label="Promotional slides">
          {slidesContent.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col transition-opacity duration-700 ${activeSlide === index ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden={activeSlide !== index}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30" /> {/* Overlay for better text visibility */}
              <div className="relative z-10 mt-auto mb-12 text-center px-6">
                <h3 className="text-white text-2xl font-bold">{slide.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
          {slidesContent.map((_, index) => (
            <button
              key={index}
              className={`h-1 rounded-full transition-all ${activeSlide === index ? 'bg-indigo-600 w-6' : 'bg-gray-400 w-2'}`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerifyUI;