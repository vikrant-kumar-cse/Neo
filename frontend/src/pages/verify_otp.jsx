import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PrimaryButton, InputField } from '../components/AuthUtils';

function VerifyUI() {
  const uid=localStorage.getItem('brandId');
  console.log(uid);
  

  const [formData, setFormData] = useState({ code: '' });
  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    console.log('Input changed:', e.target.value);
    const newCode = e.target.value.toUpperCase();
    setFormData({ ...formData, code: newCode });
    if (errors.code) {
      setErrors({ ...errors, code: '' });
    }
    setSubmissionMessage('');
  };

  const validateForm = () => {
    console.log('Validating form:', formData.code);
    const newErrors = {};
    if (!formData.code) {
      newErrors.code = 'Verification code is required';
    } else if (formData.code.length < 6) {
      newErrors.code = 'Code must be at least 6 characters';
    } else if (!/^[0-9A-Z]{6,}$/.test(formData.code)) {
      newErrors.code = 'Code must be alphanumeric';
    }
    console.log('Validation errors:', newErrors);
    return newErrors;
  };

  // Real API call function to your backend
  const verifyCodeAPI = async (verificationCode) => {
    try {
      const response = await fetch('http://localhost:8080/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verification_code: verificationCode
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }
      // ✅ Save token and brandId in localStorage for future use
            localStorage.setItem('brand_token', data.token);
            localStorage.setItem('brand_id', data.brandId);
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button triggered');
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmissionMessage('Please correct the errors above.');
      console.log('Submission blocked due to errors:', validationErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Making API call for code:', formData.code);
      const response = await verifyCodeAPI(formData.code);
      
      if (response.success) {
        setSubmissionMessage('Code verified successfully! Redirecting...');
        console.log('API call successful:', response);
        
        // Store any tokens or user data if needed
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
        
        setTimeout(() => {
          try {
            navigate('/Brandinfo');
          } catch (navError) {
            console.error('Navigation error:', navError);
            setSubmissionMessage('Error redirecting. Please try again.');
          }
        }, 1000);
      } else {
        throw new Error(response.message || 'Invalid verification code');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setErrors({ code: error.message || 'Invalid or expired code' });
      setSubmissionMessage('Verification failed. Please check the code and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Side - Form */}
      <div className="lg:w-1/2 w-full flex flex-col">
        <div className="pt-12 mb-12 pl-16 flex items-center">
          <img 
            src="/images/lock.svg" 
            alt="Lock Logo" 
            className="w-8 h-8" 
          />
          <div className="text-zinc-800 text-4xl font-bold font-['Red_Hat_Display'] ml-3">Neo</div>
        </div>
        <div className="w-full pt-4 flex-1 flex flex-col pl-[108px] pr-16">
          <div className="flex flex-col w-full space-y-12">
            <div className="flex flex col space-y-2">
              <h1 className="text-4xl font-bold text-zinc-800 font-['Red_Hat_Display']">
                Verify code
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Enter Code"
                type="text"
                placeholder="7789BM6X"
                value={formData.code}
                onChange={handleInputChange}
                error={errors.code}
                className="w-full h-14 placeholder-muted-gray uppercase"
                disabled={isLoading}
              />
              <PrimaryButton 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : 'Verify'}
              </PrimaryButton>
              {submissionMessage && (
                <div className={`p-3 rounded-lg text-sm text-center font-medium ${
                  submissionMessage.includes('🎉') || submissionMessage.includes('successfully') 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : submissionMessage.includes('🔴') || submissionMessage.includes('❌') || submissionMessage.includes('failed')
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : submissionMessage.includes('⏰') || submissionMessage.includes('expired')
                    ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    : submissionMessage.includes('⚠️')
                    ? 'bg-orange-50 text-orange-700 border border-orange-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {submissionMessage}
                </div>
              )}
              <div className="text-center">
                <span className="text-zinc-800 text-sm font-medium font-['Poppins']">Didn't receive a code? </span>
                <Link 
                  to="/resend_otp" 
                  className="text-error-red text-sm font-semibold font-['Poppins'] hover:underline"
                  disabled={isLoading}
                >
                  Resend
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Right Side - Image */}
      <div className="lg:w-1/2 w-full h-[30vh] lg:h-full fixed right-0 top-0 z-0 overflow-hidden">
        <div className="h-full w-full bg-zinc-300">
          <img
            src="/images/shoe1.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white text-center">
          <h2 className="text-4xl font-bold font-['Inter'] whitespace-nowrap">
            Stunning Stores For Your Brand
          </h2>
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

export default VerifyUI;