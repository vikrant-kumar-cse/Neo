import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

// Password Input Component
const PasswordInput = ({ id, label, value, onChange, error, showPassword, setShowPassword, placeholder, onKeyDown, inputRef }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type={showPassword ? "text" : "password"}
          className={`w-full px-4 py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoComplete={id === "password" ? "current-password" : "new-password"}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex="-1"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

// Spinner Component
const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// Utility functions
const handleEnterKey = (e, nextRef) => {
  if (e.key === 'Enter' && nextRef && nextRef.current) {
    e.preventDefault();
    nextRef.current.focus();
  }
};

// Validation functions
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

function BrandSignup() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Form data state
  const [signupInfo, setSignupInfo] = useState({
    first_name: '',
    last_name: '',
    business_email: '',
    countryCode: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // References for form fields
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const countryCodeRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const termsRef = useRef(null);
  const signupButtonRef = useRef(null);

  // Slider content
  const slidesContent = [
    { image: '/images/shoe1.png', title: 'Stunning Stores For Your Brand' },
    { image: '/images/shoe2.png', title: 'Seamless User Experience' },
    { image: '/images/fas1.png', title: 'Seamless Buying Experience' }
  ];

  // Slider logic
  const nextSlide = () => setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1));
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  // Focus first input on mount
  useEffect(() => {
    setTimeout(() => firstNameRef.current?.focus(), 0);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // For phone numbers, only allow digits
    if ((name === 'countryCode' || name === 'phoneNumber') && !/^\d*$/.test(value)) {
      return;
    }
    
    // Country code length restriction
    if (name === 'countryCode' && value.length > 4) {
      return;
    }
    
    // Phone number length restriction
    if (name === 'phoneNumber' && value.length > 15) {
      return;
    }
    
    setSignupInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null, general: null }));
    }
  };

  // Form validation and submission
  const handleSignup = async (e) => {
    if (e) e.preventDefault();
    
    // Validate form
    const newErrors = {};
    const { first_name, last_name, business_email, countryCode, phoneNumber, password, confirmPassword, termsAccepted } = signupInfo;
    
    if (!first_name) newErrors.first_name = 'First name is required';
    if (!last_name) newErrors.last_name = 'Last name is required';
    if (!business_email) newErrors.business_email = 'Email is required';
    else if (!validateEmail(business_email)) newErrors.business_email = 'Please enter a valid email address';
    if (!countryCode) newErrors.countryCode = 'Country code is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!termsAccepted) newErrors.termsAccepted = 'You must agree to the terms';
    
    setErrors(newErrors);
    
    // Submit if no errors
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      try {
        const url = "http://localhost:8080/auth/signupbrand";
        
        // Prepare payload in the requested format
        const requestData = {
          first_name,
          last_name,
          business_email,
          business_phone: `+${countryCode}${phoneNumber}`,
          password,
          confirmPassword,
          termsAccepted
        };
        
        console.log("Submitting data:", requestData);
        
        const response = await fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });
        
        const result = await response.json();
        const { success, message, error } = result;
        
        if (success) {
          handleSuccess(message);
          setSuccessMessage('Signup successful! Redirecting to login...');
          setTimeout(() => {
            navigate('/verify_otp');
          }, 1000);
        } else if (error) {
          const details = error?.details?.[0]?.message || 'Signup failed';
          handleError(details);
          setErrors({ general: details });
        } else if (!success) {
          handleError(message);
          setErrors({ general: message });
        }
      } catch (err) {
        handleError(err.message || 'An unexpected error occurred');
        setErrors({ general: err.message || 'An unexpected error occurred' });
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
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Sign up</h1>
            <p className="text-gray-600 mb-8">Let's get you all set up so you can access your personal brand account.</p>
            
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">{successMessage}</p>
              </div>
            )}
            
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-500">{errors.general}</p>
              </div>
            )}
            
            <form onSubmit={handleSignup}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    ref={firstNameRef}
                    id="first_name"
                    name="first_name"
                    type="text"
                    className={`w-full px-4 py-3 border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="John"
                    value={signupInfo.first_name}
                    onChange={handleChange}
                    onKeyDown={(e) => handleEnterKey(e, lastNameRef)}
                    autoComplete="given-name"
                    aria-describedby={errors.first_name ? 'first_name-error' : undefined}
                  />
                  {errors.first_name && (
                    <p id="first_name-error" className="mt-1 text-sm text-red-500">{errors.first_name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    ref={lastNameRef}
                    id="last_name"
                    name="last_name"
                    type="text"
                    className={`w-full px-4 py-3 border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="Doe"
                    value={signupInfo.last_name}
                    onChange={handleChange}
                    onKeyDown={(e) => handleEnterKey(e, emailRef)}
                    autoComplete="family-name"
                    aria-describedby={errors.last_name ? 'last_name-error' : undefined}
                  />
                  {errors.last_name && (
                    <p id="last_name-error" className="mt-1 text-sm text-red-500">{errors.last_name}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="business_email" className="block text-sm font-medium text-gray-700 mb-1">Business Email</label>
                <input
                  ref={emailRef}
                  id="business_email"
                  name="business_email"
                  type="email"
                  className={`w-full px-4 py-3 border ${errors.business_email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="john.doe@gmail.com"
                  value={signupInfo.business_email}
                  onChange={handleChange}
                  onKeyDown={(e) => handleEnterKey(e, countryCodeRef)}
                  autoComplete="email"
                  aria-describedby={errors.business_email ? 'business_email-error' : undefined}
                />
                {errors.business_email && (
                  <p id="business_email-error" className="mt-1 text-sm text-red-500">{errors.business_email}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Phone Number</label>
                <div className="flex space-x-2">
                  <div className="w-1/4">
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-gray-500">+</span>
                      <input
                        ref={countryCodeRef}
                        type="tel"
                        name="countryCode"
                        className={`w-full pl-6 pr-3 py-3 border ${errors.countryCode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="91"
                        value={signupInfo.countryCode}
                        onChange={handleChange}
                        onKeyDown={(e) => handleEnterKey(e, phoneRef)}
                        autoComplete="tel-country-code"
                        aria-describedby={errors.countryCode ? 'countryCode-error' : undefined}
                      />
                    </div>
                    {errors.countryCode && (
                      <p id="countryCode-error" className="mt-1 text-sm text-red-500">{errors.countryCode}</p>
                    )}
                  </div>
                  <div className="w-3/4">
                    <input
                      ref={phoneRef}
                      type="tel"
                      name="phoneNumber"
                      className={`w-full px-4 py-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="9876543210"
                      value={signupInfo.phoneNumber}
                      onChange={handleChange}
                      onKeyDown={(e) => handleEnterKey(e, passwordRef)}
                      autoComplete="tel-national"
                      aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
                    />
                    {errors.phoneNumber && (
                      <p id="phoneNumber-error" className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <PasswordInput
                id="password"
                label="Password"
                value={signupInfo.password}
                onChange={(e) => handleChange({ target: { name: 'password', value: e.target.value } })}
                error={errors.password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                placeholder="Enter your password"
                onKeyDown={(e) => handleEnterKey(e, confirmPasswordRef)}
                inputRef={passwordRef}
              />
              
              <PasswordInput
                id="confirmPassword"
                label="Confirm Password"
                value={signupInfo.confirmPassword}
                onChange={(e) => handleChange({ target: { name: 'confirmPassword', value: e.target.value } })}
                error={errors.confirmPassword}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
                placeholder="Confirm your password"
                onKeyDown={(e) => handleEnterKey(e, termsRef)}
                inputRef={confirmPasswordRef}
              />
              
              <div className="flex items-center mb-6">
                <input
                  ref={termsRef}
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  className={`h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 ${errors.termsAccepted ? 'border-red-500' : ''}`}
                  checked={signupInfo.termsAccepted}
                  onChange={handleChange}
                  onKeyDown={(e) => handleEnterKey(e, signupButtonRef)}
                  aria-describedby={errors.termsAccepted ? 'terms-error' : undefined}
                />
                <label htmlFor="termsAccepted" className="ml-2 text-sm text-gray-700">
                  I agree to all the <span className="text-rose-500">Terms</span> and <span className="text-rose-500">Privacy Policies</span>
                </label>
              </div>
              
              {errors.termsAccepted && (
                <p id="terms-error" className="mb-4 text-sm text-red-500">{errors.termsAccepted}</p>
              )}
              
              <button
                ref={signupButtonRef}
                type="submit"
                className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mb-4 flex justify-center items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : 'Create account'}
              </button>
              
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/brandlogin" className="text-rose-500 hover:text-rose-600">
                    Login
                  </Link>
                </p>
              </div>
            </form>
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
      
      <ToastContainer />
    </div>
  );
}

export default BrandSignup;