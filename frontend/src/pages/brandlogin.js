import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PasswordInput,
  Spinner,
  validateEmail,
  validatePhone,
  validateCountryCode,
  validatePassword,
  handleEnterKey
} from '../utils/AuthUtils';

const BrandLogin = ({setIsAuthenticated}) => {
  
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

  // Login logic
  const [loginMethod, setLoginMethod] = useState('email');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loginCountryCode, setLoginCountryCode] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const loginEmailRef = useRef(null);
  const loginCountryCodeRef = useRef(null);
  const loginPhoneRef = useRef(null);
  const loginPasswordRef = useRef(null);
  const loginButtonRef = useRef(null);

  useEffect(() => {
    const savedMethod = localStorage.getItem('loginMethod');
    const savedEmail = localStorage.getItem('loginEmail');
    const savedPhone = localStorage.getItem('loginPhone');
    const savedCountryCode = localStorage.getItem('loginCountryCode');
    setLoginPassword('');
    setErrors({});
    setSuccessMessage('');
    if (savedMethod) {
      setLoginMethod(savedMethod);
      setRememberMe(true);
      if (savedMethod === 'email' && savedEmail) setLoginEmail(savedEmail);
      else if (savedMethod === 'phone' && savedPhone && savedCountryCode) {
        setLoginPhone(savedPhone);
        setLoginCountryCode(savedCountryCode);
      }
    } else {
      setLoginEmail('');
      setLoginPhone('');
      setLoginCountryCode('');
      setRememberMe(false);
    }
    setTimeout(() => loginEmailRef.current?.focus(), 0);
  }, []);

  const handleLogin = async () => {
    const newErrors = {};
    if (loginMethod === 'phone') {
      if (!loginCountryCode) newErrors.loginCountryCode = 'Country code is required';
      else if (!validateCountryCode(loginCountryCode)) newErrors.loginCountryCode = 'Invalid country code';
      if (!loginPhone) newErrors.loginPhone = 'Phone number is required';
      else if (!validatePhone(loginPhone)) newErrors.loginPhone = 'Invalid phone number';
    } else {
      if (!loginEmail) newErrors.loginEmail = 'Email is required';
      else if (!validateEmail(loginEmail)) newErrors.loginEmail = 'Please enter a valid email address';
    }
    if (!loginPassword) newErrors.loginPassword = 'Password is required';
    else if (!validatePassword(loginPassword)) newErrors.loginPassword = 'Password must be at least 8 characters';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // Format business_phone as required by backend (+countryCode + phoneNumber)
        const businessPhone = loginMethod === 'phone' ? 
          `+${loginCountryCode}${loginPhone}` : null;

        // Make the call to the backend endpoint with the correct payload structure
        const response = await fetch('http://localhost:8080/auth/loginbrand', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginMethod === 'email' ? 
            { business_email: loginEmail, password: loginPassword } : 
            { business_phone: businessPhone, password: loginPassword })
        });
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Login failed');
        }
        
        if (rememberMe) {
          localStorage.setItem('loginMethod', loginMethod);
          if (loginMethod === 'email') {
            localStorage.setItem('loginEmail', loginEmail);
            localStorage.removeItem('loginPhone');
            localStorage.removeItem('loginCountryCode');
          } else {
            localStorage.setItem('loginPhone', loginPhone);
            localStorage.setItem('loginCountryCode', loginCountryCode);
            localStorage.removeItem('loginEmail');
          }
        } else {
          localStorage.removeItem('loginMethod');
          localStorage.removeItem('loginEmail');
          localStorage.removeItem('loginPhone');
          localStorage.removeItem('loginCountryCode');
        }
        
        // Store the JWT token from the response
        if (data.jwToken) {
          localStorage.setItem('token', data.jwToken);
          // Store user data if needed
          if (data.email) localStorage.setItem('email', data.email);
          if (data.name) localStorage.setItem('name', data.name);
        }
        
        setSuccessMessage(data.message || 'Login successful!');
        setTimeout(() => {
          setIsAuthenticated(true); // 🔥 This must be set before redirect
          setSuccessMessage('');
          navigate('/admin-dashboard');
        }, 2000);
      } catch (error) {
        setErrors({ loginGeneral: error.message || 'Login failed' });
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
            <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-gray-800">Login</h1>
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">{successMessage}</p>
              </div>
            )}
            {errors.loginGeneral && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-500">{errors.loginGeneral}</p>
              </div>
            )}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Sign in with</p>
              <div className="flex space-x-4 mb-6">
                <button
                  type="button"
                  className={`flex-1 py-2 px-3 text-sm rounded-md border ${loginMethod === 'email' ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'border-gray-300 text-gray-700'}`}
                  onClick={() => {
                    setLoginMethod('email');
                    setLoginPhone('');
                    setLoginCountryCode('');
                    loginEmailRef.current?.focus();
                  }}
                >
                  Email
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-3 text-sm rounded-md border ${loginMethod === 'phone' ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'border-gray-300 text-gray-700'}`}
                  onClick={() => {
                    setLoginMethod('phone');
                    setLoginEmail('');
                    loginCountryCodeRef.current?.focus();
                  }}
                >
                  Phone
                </button>
              </div>
            </div>
            {loginMethod === 'phone' ? (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Phone Number</label>
                <div className="flex space-x-2">
                  <div className="w-1/4">
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-gray-500">+</span>
                      <input
                        ref={loginCountryCodeRef}
                        id="loginCountryCode"
                        type="tel"
                        className={`w-full pl-6 pr-3 py-3 border ${errors.loginCountryCode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="91"
                        value={loginCountryCode}
                        onChange={(e) => {
                          const value = e.target.value;
                          if ((/^\d*$/.test(value) || value === '') && value.length <= 4) {
                            setLoginCountryCode(value);
                            setErrors(prev => ({ ...prev, loginCountryCode: null, loginGeneral: null }));
                          }
                        }}
                        onKeyDown={(e) => handleEnterKey(e, loginPhoneRef)}
                        autoComplete="tel-country-code"
                        aria-describedby={errors.loginCountryCode ? 'loginCountryCode-error' : undefined}
                      />
                    </div>
                    {errors.loginCountryCode && (
                      <p id="loginCountryCode-error" className="mt-1 text-sm text-red-500">{errors.loginCountryCode}</p>
                    )}
                  </div>
                  <div className="w-3/4">
                    <input
                      ref={loginPhoneRef}
                      type="tel"
                      className={`w-full px-4 py-3 border ${errors.loginPhone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="9876543210"
                      value={loginPhone}
                      onChange={(e) => {
                        const value = e.target.value;
                        if ((/^\d*$/.test(value) || value === '') && value.length <= 15) {
                          setLoginPhone(value);
                          setErrors(prev => ({ ...prev, loginPhone: null, loginGeneral: null }));
                        }
                      }}
                      onKeyDown={(e) => handleEnterKey(e, loginPasswordRef)}
                      autoComplete="tel-national"
                      aria-describedby={errors.loginPhone ? 'loginPhone-error' : undefined}
                    />
                    {errors.loginPhone && (
                      <p id="loginPhone-error" className="mt-1 text-sm text-red-500">{errors.loginPhone}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-1">Business Email</label>
                <input
                  ref={loginEmailRef}
                  id="loginEmail"
                  type="email"
                  className={`w-full px-4 py-3 border ${errors.loginEmail ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="john.doe@gmail.com"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    setErrors(prev => ({ ...prev, loginEmail: null, loginGeneral: null }));
                  }}
                  onKeyDown={(e) => handleEnterKey(e, loginPasswordRef)}
                  autoComplete="email"
                  aria-describedby={errors.loginEmail ? 'loginEmail-error' : undefined}
                />
                {errors.loginEmail && (
                  <p id="loginEmail-error" className="mt-1 text-sm text-red-500">{errors.loginEmail}</p>
                )}
              </div>
            )}
            <PasswordInput
              id="loginPassword"
              label="Password"
              value={loginPassword}
              onChange={(e) => {
                setLoginPassword(e.target.value);
                setErrors(prev => ({ ...prev, loginPassword: null, loginGeneral: null }));
              }}
              error={errors.loginPassword}
              showPassword={showLoginPassword}
              setShowPassword={setShowLoginPassword}
              placeholder="Enter your password"
              onKeyDown={(e) => handleEnterKey(e, loginButtonRef)}
              inputRef={loginPasswordRef}
              autoComplete="current-password"
            />
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  checked={rememberMe}
                  onChange={(e) => {
                    setRememberMe(e.target.checked);
                    if (!e.target.checked) {
                      localStorage.removeItem('loginMethod');
                      localStorage.removeItem('loginEmail');
                      localStorage.removeItem('loginPhone');
                      localStorage.removeItem('loginCountryCode');
                    }
                  }}
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember me</label>
              </div>
              <button
                type="button"
                onClick={() => navigate('/Forgot_pass')}
                className="text-sm text-rose-500 hover:text-rose-600"
              >
                Forgot Password
              </button>
            </div>
            <button
              ref={loginButtonRef}
              type="button"
              className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mb-6 flex justify-center items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Login'}
            </button>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate('/brandsignup')}
                  className="text-rose-500 hover:text-rose-600"
                >
                  Sign up
                </button>
              </p>
            </div>
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

export default BrandLogin;