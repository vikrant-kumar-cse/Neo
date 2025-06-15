import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PrimaryButton, InputField, Checkbox } from '../components/AuthUtils';

function SignupUI() {
  // State for form inputs and errors
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' }); // New state for messages
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Handle input changes
  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ text: '', type: '' });
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setFormData({ ...formData, agreeTerms: !formData.agreeTerms });
    if (errors.agreeTerms) {
      setErrors({ ...errors, agreeTerms: '' });
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number (10 digits required)';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Za-z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = 'Password must include at least one letter, one digit, and one special symbol';
    } else if (/^\d+$/.test(formData.password)) {
      newErrors.password = 'Password cannot be digits only';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the Terms and Privacy Policies';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('http://localhost:8080/auth/signupbrand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          business_email: formData.email,
          business_phone: formData.phone,
          password: formData.password,
          agreeTerms: formData.agreeTerms
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage({
          text: result.message || 'Account created successfully! Welcome to Neo.',
          type: 'success'
        });
        // Reset form on success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false,
        });
      } else {
        setMessage({
          text: result.message || 'Signup failed. Please try again.',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error During Signup:', error);
      setMessage({
        text: 'Something went wrong. Please check your connection and try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row items-center justify-center bg-white m-0 p-0 overflow-hidden">
      {/* Left Side - Image */}
      <div className="lg:w-1/2 w-full h-[30vh] lg:h-full relative">
        <div className="h-full w-full bg-zinc-300">
          <img
            src="/images/shoe1.png"
            alt="Shoes"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Brand Message */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
          <h2 className="text-xl sm:text-4xl font-bold font-['Inter'] whitespace-nowrap">
            Stunning Stores For Your Brand
          </h2>
          
          {/* Pagination dots */}
          <div className="mt-1 flex justify-center space-x-2">
            <div className="w-4 h-1 bg-indigo-500 rounded-md"></div>
            <div className="w-1 h-1 bg-zinc-300 rounded-full"></div>
            <div className="w-1 h-1 bg-zinc-300 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Signup Form */}
      <div className="lg:w-1/2 w-full flex flex-col items-center py-4 max-h-[70vh] lg:max-h-full">
        {/* Logo and Neo Text in a row */}
        <div className="mb-4 flex items-center">
          <img 
            src="/images/lock.svg" 
            alt="Lock Logo" 
            className="w-6 h-6 sm:w-8 sm:h-8" 
          />
          <div className="text-zinc-800 text-3xl sm:text-4xl font-bold font-['Red_Hat_Display'] ml-2 sm:ml-3">Neo</div>
        </div>

        <div className="max-w-[640px] w-full px-4 lg:px-6 flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-800 font-['Red_Hat_Display']">Sign up</h1>
            <p className="text-sm sm:text-base text-muted-gray opacity-75">
              Let's get you all set up so you can access your personal account.
            </p>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`p-4 rounded-lg border-l-4 ${
              message.type === 'success' 
                ? 'bg-green-50 border-green-400 text-green-700' 
                : 'bg-red-50 border-red-400 text-red-700'
            }`}>
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${
                  message.type === 'success' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {message.type === 'success' ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{message.text}</p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-3 flex-1">
            {/* First Name and Last Name in a Row */}
            <div className="flex gap-2">
              <InputField
                label="First Name"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                error={errors.firstName}
                className="flex-1 placeholder-muted-gray"
              />
              <InputField
                label="Last Name"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                error={errors.lastName}
                className="flex-1 placeholder-muted-gray"
              />
            </div>

            {/* Business Email and Business Phone Number in a Row */}
            <div className="flex gap-2">
              <InputField
                label="Business Email"
                type="email"
                placeholder="john.doe@gmail.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={errors.email}
                className="flex-1 placeholder-muted-gray"
              />
              <InputField
                label="Business Phone Number"
                type="tel"
                placeholder="09685749685"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                error={errors.phone}
                className="flex-1 placeholder-muted-gray"
              />
            </div>

            {/* Password */}
            <InputField
              label="Password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={errors.password}
              className="placeholder-muted-gray"
            />

            {/* Confirm Password */}
            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              error={errors.confirmPassword}
              className="placeholder-muted-gray"
            />

            {/* Terms Checkbox */}
            <div className="flex items-center">
              <Checkbox
                label={
                  <>
                    I agree to all the <span className="text-rose-400 font-semibold">Terms</span> and{' '}
                    <span className="text-rose-400 font-semibold">Privacy Policies</span>
                  </>
                }
                checked={formData.agreeTerms}
                onChange={handleCheckboxChange}
              />
              {errors.agreeTerms && <p className="text-rose-400 text-xs ml-2">{errors.agreeTerms}</p>}
            </div>

            {/* Create Account Button */}
            <PrimaryButton disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create account'}
            </PrimaryButton>

            {/* Login Link */}
            <div className="text-center">
              <span className="text-zinc-800 text-xs sm:text-sm font-medium font-['Poppins']">Already have an account? </span>
              <Link to="/brandlogin" className="text-rose-400 text-xs sm:text-sm font-semibold font-['Poppins'] hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupUI;