import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PasswordInput, Spinner, validatePassword, handleEnterKey } from '../utils/AuthUtils';

const ResetUI = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

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

  // Reset password logic
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const resetPasswordRef = useRef(null);
  const resetConfirmPasswordRef = useRef(null);
  const resetButtonRef = useRef(null);

  useEffect(() => {
    setResetPassword('');
    setResetConfirmPassword('');
    setErrors({});
    setSuccessMessage('');
    setTimeout(() => resetPasswordRef.current?.focus(), 0);
  }, []);

  const handleResetPassword = async () => {
    const newErrors = {};
    if (!resetPassword) newErrors.resetPassword = 'Password is required';
    else if (!validatePassword(resetPassword)) newErrors.resetPassword = 'Password must be at least 8 characters';
    if (!resetConfirmPassword) newErrors.resetConfirmPassword = 'Confirm password is required';
    else if (resetPassword !== resetConfirmPassword) newErrors.resetConfirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // Get token from URL parameters or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token') || localStorage.getItem('resetToken');
        
        // Make API call to reset password
        const response = await fetch('http://localhost:8080/auth/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
            new_password: resetPassword
          })
        });
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Password reset failed');
        }
        
        setSuccessMessage('Password has been reset successfully! Redirecting to login...');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/Brandlogin');
        }, 2000);
      } catch (error) {
        setErrors({ resetGeneral: error.message || 'Password reset failed' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const brandName = "NeoMarche";

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        <div className="p-6 md:p-12">
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
              className="flex items-center text-gray-600 mb-6 hover:text-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              Back to login
            </button>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Set a password</h1>
            <p className="text-gray-600 mb-8">Your previous password has been reset. Please set a new password for your account.</p>
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">{successMessage}</p>
              </div>
            )}
            {errors.resetGeneral && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-500">{errors.resetGeneral}</p>
              </div>
            )}
            <PasswordInput
              id="resetPassword"
              label="Create Password"
              value={resetPassword}
              onChange={(e) => {
                setResetPassword(e.target.value);
                setErrors(prev => ({ ...prev, resetPassword: null, resetGeneral: null }));
              }}
              error={errors.resetPassword}
              showPassword={showResetPassword}
              setShowPassword={setShowResetPassword}
              placeholder="Create a password"
              onKeyDown={(e) => handleEnterKey(e, resetConfirmPasswordRef)}
              inputRef={resetPasswordRef}
              autoComplete="new-password"
            />
            <PasswordInput
              id="resetConfirmPassword"
              label="Re-enter Password"
              value={resetConfirmPassword}
              onChange={(e) => {
                setResetConfirmPassword(e.target.value);
                setErrors(prev => ({ ...prev, resetConfirmPassword: null, resetGeneral: null }));
              }}
              error={errors.resetConfirmPassword}
              showPassword={showResetConfirmPassword}
              setShowPassword={setShowResetConfirmPassword}
              placeholder="Confirm your password"
              onKeyDown={(e) => handleEnterKey(e, resetButtonRef)}
              inputRef={resetConfirmPasswordRef}
              autoComplete="new-password"
            />
            <button
              ref={resetButtonRef}
              type="button"
              className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex justify-center items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleResetPassword}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Set password'}
            </button>
          </div>
        </div>
      </div>
      {/* Right Side: Slider */}
      <div className="hidden md:block w-full md:w-1/2 h-64 md:h-screen bg-gray-900 relative">
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
              <div className="relative z-10 mt-auto mb-12 text-center">
                <h3 className="text-white text-2xl font-bold">{slide.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
          {slidesContent.map((_, index) => (
            <button
              key={index}
              className={`h-1 rounded-full transition-all ${activeSlide === index ? 'bg-indigo-600 w-6' : 'bg-gray-500 w-1'}`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResetUI;