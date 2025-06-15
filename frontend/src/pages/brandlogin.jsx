import { Link } from 'react-router-dom';
import { PrimaryButton, InputField, Checkbox } from '../components/AuthUtils';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SecureLoginUI() {
  // State for form inputs and errors
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  
  // Use ref for password to avoid storing in state
  const passwordRef = useRef();
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setFormData({ ...formData, rememberMe: !formData.rememberMe });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Enhanced form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Password validation
    const password = passwordRef.current?.value;
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    return newErrors;
  };

  // Rate limiting check
  const checkRateLimit = () => {
    if (loginAttempts >= 5) {
      setIsBlocked(true);
      setTimeout(() => {
        setIsBlocked(false);
        setLoginAttempts(0);
      }, 300000); // 5 minutes block
      return false;
    }
    return true;
  };

  // Secure error handling
  const handleLoginError = (error, response) => {
    setLoginAttempts(prev => prev + 1);
    
    let errorMessage = 'Login failed. Please check your credentials.';
    
    // Don't expose detailed server errors to client
    if (response && response.status === 429) {
      errorMessage = 'Too many login attempts. Please try again later.';
    } else if (response && response.status >= 500) {
      errorMessage = 'Server error. Please try again later.';
    }
    
    setErrors({ general: errorMessage });
  };

  // Handle form submission with security improvements
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!checkRateLimit()) {
      setErrors({ general: 'Too many failed attempts. Please wait 5 minutes.' });
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Use HTTPS in production
      const apiUrl='http://localhost:8080/auth/loginbrand';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for session management
        body: JSON.stringify({
          business_email: formData.email.trim().toLowerCase(),
          business_phone: formData.phone.trim(),
          password: passwordRef.current.value,
          remember_me: formData.rememberMe,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Store only necessary data securely
        if (result.token) {
          // Store JWT in httpOnly cookie (server-side) is preferred
          // If you must store client-side, use secure storage
          sessionStorage.setItem('authToken', result.token);
        }
        
        // Clear password from memory
        passwordRef.current.value = '';
        
        // Reset attempts on successful login
        setLoginAttempts(0);
        
        // Navigate without showing success message
        navigate('/Navigation', { replace: true });
      } else {
        handleLoginError(null, response);
      }

    } catch (error) {
      console.error('Login error:', error.message); // Log only error message, not full error
      handleLoginError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Side - Login Form */}
      <div className="w-1/2 bg-white flex flex-col">
        {/* Logo and Neo Text in a row */}
        <div className="pt-12 mb-12 pl-16 flex items-center">
          <img 
            src="/images/lock.svg" 
            alt="Lock Logo" 
            className="w-8 h-8" 
          />
          <div className="text-zinc-800 text-4xl font-bold font-['Red_Hat_Display'] ml-3">Neo</div>
        </div>
        
        {/* Login Form */}
        <div className="w-full pt-4 flex-1 flex flex-col pl-[108px] pr-16">
          <div className="flex flex-col w-full">
            <h1 className="text-4xl font-bold text-zinc-800 mb-12">Login</h1>
            
            {/* General Error Message */}
            {errors.general && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.general}
              </div>
            )}
            
            {isBlocked && (
              <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                Account temporarily locked due to multiple failed attempts. Please try again in 5 minutes.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Business Phone Number */}
              <InputField
                label="Business Phone Number"
                type="tel"
                placeholder="09685749685"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                error={errors.phone}
                className="placeholder-muted-gray"
                autoComplete="tel"
                disabled={isLoading || isBlocked}
              />

              {/* Business Email */}
              <InputField
                label="Business Email"
                type="email"
                placeholder="john.doe@gmail.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={errors.email}
                className="placeholder-muted-gray"
                autoComplete="email"
                disabled={isLoading || isBlocked}
              />

              {/* Password - Using ref instead of state */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-800">
                  Password
                </label>
                <div className="relative">
                  <input
                    ref={passwordRef}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="•••••••••••••••••••••••••"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.password ? 'border-red-500' : 'border-zinc-300'
                    }`}
                    autoComplete="current-password"
                    disabled={isLoading || isBlocked}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6"
                    disabled={isLoading || isBlocked}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-800" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-800" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        <path d="M2.81 3.53l1.41-1.41 16.97 16.97-1.41 1.41L2.81 3.53z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex justify-between items-center">
                <Checkbox
                  label="Remember me"
                  checked={formData.rememberMe}
                  onChange={handleCheckboxChange}
                  disabled={isLoading || isBlocked}
                />
                <Link 
                  to="/Forgot_pass" 
                  className="text-error-red text-sm font-medium font-['Poppins'] hover:underline"
                  tabIndex={isLoading || isBlocked ? -1 : 0}
                >
                  Forgot Password
                </Link>
              </div>

              {/* Login Button */}
              <PrimaryButton 
                type="submit" 
                disabled={isLoading || isBlocked}
                className={isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </PrimaryButton>

              {/* Sign Up Link */}
              <div className="text-center">
                <span className="text-zinc-800 text-sm font-medium font-['Poppins']">Don't have an account? </span>
                <Link 
                  to="/brandsignup" 
                  className="text-error-red text-sm font-semibold font-['Poppins'] hover:underline"
                  tabIndex={isLoading || isBlocked ? -1 : 0}
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Right Side - Image */}
      <div className="w-1/2 relative">
        <div className="h-full w-full bg-zinc-300">
          <img
            src="/images/shoe1.png"
            alt="Shoes"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Brand Message */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white text-center">
          <h2 className="text-4xl font-bold font-['Inter'] whitespace-nowrap">
            Stunning Stores For Your Brand
          </h2>
          
          {/* Pagination dots */}
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-8 h-2.5 bg-indigo-500 rounded-md"></div>
            <div className="w-2.5 h-2.5 bg-zinc-300 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-zinc-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecureLoginUI;