import React from 'react';

// Reusable Password Input Component
export const PasswordInput = ({ id, label, value, onChange, error, showPassword, setShowPassword, placeholder, onKeyDown, inputRef, autoComplete }) => (
  <div className="mb-6">
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
        autoComplete={autoComplete}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <button
        type="button"
        className="absolute right-3 top-3 text-gray-500"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
            <line x1="2" x2="22" y1="2" y2="22"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        )}
      </button>
    </div>
    {error && (
      <p id={`${id}-error`} className="mt-1 text-sm text-red-500">{error}</p>
    )}
  </div>
);

// Inline Spinner Component
export const Spinner = () => (
  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
);

// Validation Functions
export const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
export const validatePhone = (phone) => /^\d{8,15}$/.test(phone);
export const validateCountryCode = (code) => /^\d{1,4}$/.test(code);
export const validatePassword = (password) => password.length >= 8;

// Handle Enter Key for Focus Management
export const handleEnterKey = (e, nextRef) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (nextRef.current) {
      nextRef.current.focus();
    }
  }
};