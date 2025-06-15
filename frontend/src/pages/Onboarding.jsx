import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Reusable Checkbox Component
const Checkbox = ({ label, checked, onChange, onKeyDown, inputRef, className = "" }) => (
  <div className={`flex items-center ${className}`}>
    <input
      ref={inputRef}
      type="checkbox"
      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
      checked={checked}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
    <label className="ml-2 text-sm text-gray-700">{label}</label>
  </div>
);

// Reusable Radio Button Component
const RadioButton = ({ id, name, value, label, checked, onChange, onKeyDown, inputRef }) => (
  <div className="flex items-center">
    <input
      ref={inputRef}
      id={id}
      type="radio"
      name={name}
      value={value}
      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
      checked={checked}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
    <label htmlFor={id} className="ml-2 text-sm text-gray-700">{label}</label>
  </div>
);

// Reusable Select Component
const Select = ({ id, label, value, onChange, options, error, onKeyDown, inputRef }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      ref={inputRef}
      id={id}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`w-full px-4 py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
    >
      <option value="">Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
    {error && (
      <p className="mt-1 text-sm text-red-500">{error}</p>
    )}
  </div>
);

// Reusable Input Component
const Input = ({ id, label, type = "text", value, onChange, placeholder, error, onKeyDown, inputRef, className = "" }) => (
  <div className={`mb-4 ${className}`}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      ref={inputRef}
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      className={`w-full px-4 py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
    />
    {error && (
      <p className="mt-1 text-sm text-red-500">{error}</p>
    )}
  </div>
);

// Reusable File Input Component
const FileInput = ({ id, label, onChange, error, onKeyDown, inputRef, fileName }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <input
        ref={inputRef}
        id={id}
        type="file"
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 opacity-0 absolute inset-0"
      />
      <div className={`w-full px-4 py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md flex items-center justify-between`}>
        <span className="text-gray-500">{fileName || 'Choose file'}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      </div>
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-500">{error}</p>
    )}
  </div>
);

const OnboardingUI = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  // Step 1: Business Information State
  const [companyName, setCompanyName] = useState('');
  const [tradeLicense, setTradeLicense] = useState(null);
  const [tradeLicenseName, setTradeLicenseName] = useState('');
  const [businessCountry, setBusinessCountry] = useState('');
  const [companyProfile, setCompanyProfile] = useState('');
  const [primaryContactName, setPrimaryContactName] = useState('');
  const [primaryContactPhone, setPrimaryContactPhone] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [brandName, setBrandName] = useState('');
  const [brandWebsite, setBrandWebsite] = useState('');
  const [brandCountry, setBrandCountry] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [brandFormat, setBrandFormat] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Step 2: Store Preferences State
  const [storeTopics, setStoreTopics] = useState({
    fixtureDesign: false,
    popUpStore: false,
    pointOfPurchase: false,
    superMarkets: false,
    storeOnMars: false,
    legacyStores: false,
    openToExploration: false,
    warehouseRetailer: false,
    boutique: false,
    aiShoppingAssistant: false,
  });
  const [storeComponents, setStoreComponents] = useState({
    component1: false,
    component2: false,
    component3: false,
    component4: false,
    component5: false,
  });

  // Step 3: Detailed Preferences State
  const [features, setFeatures] = useState({
    gondolaDisplays: false,
    displayCases: false,
    mannequins1: false,
    displayRack: false,
    mannequins2: false,
    apparelFixtures: false,
    slatwallDisplays: false,
    dumpBins: false,
    gridwallDisplays: false,
    eyewearStands: false,
    pegboards: false,
    endCapDisplays: false,
    racks: false,
    shelfTalkers: false,
    roundRacks: false,
    tables: false,
    shelving: false,
    lobbyArea: false,
    acrylicDisplays: false,
    facade: false,
    storytellingLeds: false,
    archGate: false,
  });
  const [decor, setDecor] = useState({
    artwork: false,
    mirrors: false,
    plants: false,
    photoFrames: false,
    rugs: false,
    floorLamps: false,
    tableLamps: false,
    posters: false,
    mirrorArt: false,
    wallBranding: false,
  });
  const [wallsFloors, setWallsFloors] = useState({
    paint: false,
    woodenFlooring: false,
    hardwoodTiles: false,
    wallPanel: false,
    wallShelf: false,
    embeddedWallDisplays: false,
  });
  const [design, setDesign] = useState({
    paint: false,
    vintage: false,
    ikeaStyle: false,
    retro: false,
    storeFromFuture: false,
    luxury: false,
  });
  const [storeFeatures, setStoreFeatures] = useState({
    payment: false,
    virtualTryon: false,
    shipping: false,
    seasonalStoreChristmas: false,
    seasonalStoreChristmas2: false,
  });

  // Step 4: Purpose State
  const [purpose, setPurpose] = useState('');

  // Step 5: Timeline State
  const [timeline, setTimeline] = useState('');

  // Refs for focus management
  const companyNameRef = useRef(null);
  const tradeLicenseRef = useRef(null);
  const businessCountryRef = useRef(null);
  const companyProfileRef = useRef(null);
  const primaryContactNameRef = useRef(null);
  const primaryContactPhoneRef = useRef(null);
  const businessPhoneRef = useRef(null);
  const vatNumberRef = useRef(null);
  const brandNameRef = useRef(null);
  const brandWebsiteRef = useRef(null);
  const brandCountryRef = useRef(null);
  const facebookRef = useRef(null);
  const instagramRef = useRef(null);
  const brandFormatRef = useRef(null);
  const termsRef = useRef(null);
  const privacyRef = useRef(null);
  const nextButtonStep1Ref = useRef(null);
  const purposeRef = useRef(null);
  const timelineRef = useRef(null);

  const validatePhone = (phone) => /^\d{8,15}$/.test(phone);
  const validateUrl = (url) => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(url);

  const validateStep1 = () => {
    const newErrors = {};
    if (!companyName) newErrors.companyName = 'Company name is required';
    if (!tradeLicense) newErrors.tradeLicense = 'Trade license is required';
    if (!businessCountry) newErrors.businessCountry = 'Country is required';
    if (!companyProfile) newErrors.companyProfile = 'Company profile is required';
    if (!primaryContactName) newErrors.primaryContactName = 'Contact name is required';
    if (!primaryContactPhone) newErrors.primaryContactPhone = 'Contact phone is required';
    else if (!validatePhone(primaryContactPhone)) newErrors.primaryContactPhone = 'Invalid phone number';
    if (!businessPhone) newErrors.businessPhone = 'Business phone is required';
    else if (!validatePhone(businessPhone)) newErrors.businessPhone = 'Invalid phone number';
    if (!brandName) newErrors.brandName = 'Brand name is required';
    if (!brandCountry) newErrors.brandCountry = 'Country is required';
    if (facebook && !validateUrl(facebook)) newErrors.facebook = 'Invalid URL';
    if (instagram && !validateUrl(instagram)) newErrors.instagram = 'Invalid URL';
    if (brandWebsite && !validateUrl(brandWebsite)) newErrors.brandWebsite = 'Invalid URL';
    if (!brandFormat) newErrors.brandFormat = 'Brand format is required';
    if (!termsAccepted) newErrors.termsAccepted = 'You must accept the terms';
    if (!privacyAccepted) newErrors.privacyAccepted = 'You must accept the privacy policy';
    setErrors(newErrors);
    setGeneralError(Object.keys(newErrors).length > 0 ? 'Please fill all required fields correctly' : '');
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const selectedTopics = Object.values(storeTopics).some(val => val);
    const selectedComponents = Object.values(storeComponents).some(val => val);
    const newErrors = {};
    if (!selectedTopics) newErrors.storeTopics = 'Please select at least one store topic';
    if (!selectedComponents) newErrors.storeComponents = 'Please select at least one store component';
    setErrors(newErrors);
    setGeneralError(Object.keys(newErrors).length > 0 ? 'Please select at least one option in each section' : '');
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const selectedFeatures = Object.values(features).some(val => val);
    const selectedDecor = Object.values(decor).some(val => val);
    const selectedWallsFloors = Object.values(wallsFloors).some(val => val);
    const selectedDesign = Object.values(design).some(val => val);
    const selectedStoreFeatures = Object.values(storeFeatures).some(val => val);
    const newErrors = {};
    if (!selectedFeatures) newErrors.features = 'Please select at least one feature';
    if (!selectedDecor) newErrors.decor = 'Please select at least one decor option';
    if (!selectedWallsFloors) newErrors.wallsFloors = 'Please select at least one wall/floor option';
    if (!selectedDesign) newErrors.design = 'Please select at least one design inspiration';
    if (!selectedStoreFeatures) newErrors.storeFeatures = 'Please select at least one store feature';
    setErrors(newErrors);
    setGeneralError(Object.keys(newErrors).length > 0 ? 'Please select at least one option in each section' : '');
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors = {};
    if (!purpose) newErrors.purpose = 'Please select a purpose';
    setErrors(newErrors);
    setGeneralError(Object.keys(newErrors).length > 0 ? 'Please select a purpose' : '');
    return Object.keys(newErrors).length === 0;
  };

  const validateStep5 = () => {
    const newErrors = {};
    if (!timeline) newErrors.timeline = 'Please select a timeline';
    setErrors(newErrors);
    setGeneralError(Object.keys(newErrors).length > 0 ? 'Please select a timeline' : '');
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    let isValid = false;
    if (step === 1) isValid = validateStep1();
    else if (step === 2) isValid = validateStep2();
    else if (step === 3) isValid = validateStep3();
    else if (step === 4) isValid = validateStep4();
    else if (step === 5) {
      isValid = validateStep5();
      if (isValid) {
        console.log('Onboarding completed:', {
          businessInfo: { companyName, tradeLicense, businessCountry, companyProfile, primaryContactName, primaryContactPhone, businessPhone, vatNumber },
          brandInfo: { brandName, brandWebsite, brandCountry, facebook, instagram, brandFormat },
          storePreferences: { storeTopics, storeComponents },
          detailedPreferences: { features, decor, wallsFloors, design, storeFeatures },
          purpose,
          timeline,
        });
        navigate('/dashboard');
      }
    }
    if (isValid && step < 5) {
      setStep(step + 1);
      setErrors({});
      setGeneralError('');
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
      setGeneralError('');
    } else {
      navigate('/auth');
    }
  };

  const handleEnterKey = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  const countries = ['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain'];

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <div className="w-full overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        <div className="p-6 md:p-12">
          <div className="mb-8">
            <div className="flex items-center">
              <div className="mr-2">
                <img
                  src="./images/Logo.png" // Replace this URL with your actual PNG logo path
                  alt="NeoMarche Logo"
                  className="w-8 h-8"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">NeoMarche</h2>
            </div>
          </div>

          {generalError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-500">{generalError}</p>
            </div>
          )}

          {step === 1 && (
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Before setting up store, ask some basic information about your brand!</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Business Information</h3>
                  <Input
                    id="companyName"
                    label="Company Name (As Per License)"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name"
                    error={errors.companyName}
                    onKeyDown={(e) => handleEnterKey(e, tradeLicenseRef)}
                    inputRef={companyNameRef}
                  />
                  <FileInput
                    id="tradeLicense"
                    label="Upload Trade License"
                    onChange={(e) => {
                      setTradeLicense(e.target.files[0]);
                      setTradeLicenseName(e.target.files[0]?.name);
                    }}
                    error={errors.tradeLicense}
                    onKeyDown={(e) => handleEnterKey(e, businessCountryRef)}
                    inputRef={tradeLicenseRef}
                    fileName={tradeLicenseName}
                  />
                  <Select
                    id="businessCountry"
                    label="Country & Emirates of Registration"
                    value={businessCountry}
                    onChange={(e) => setBusinessCountry(e.target.value)}
                    options={countries}
                    error={errors.businessCountry}
                    onKeyDown={(e) => handleEnterKey(e, companyProfileRef)}
                    inputRef={businessCountryRef}
                  />
                  <Select
                    id="companyProfile"
                    label="Your Profile at Company"
                    value={companyProfile}
                    onChange={(e) => setCompanyProfile(e.target.value)}
                    options={['Owner', 'Manager', 'Director', 'Other']}
                    error={errors.companyProfile}
                    onKeyDown={(e) => handleEnterKey(e, primaryContactNameRef)}
                    inputRef={companyProfileRef}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      id="primaryContactName"
                      label="Primary Contact Name"
                      value={primaryContactName}
                      onChange={(e) => setPrimaryContactName(e.target.value)}
                      placeholder="Enter contact name"
                      error={errors.primaryContactName}
                      onKeyDown={(e) => handleEnterKey(e, primaryContactPhoneRef)}
                      inputRef={primaryContactNameRef}
                    />
                    <Input
                      id="primaryContactPhone"
                      label="Primary Contact Phone"
                      type="tel"
                      value={primaryContactPhone}
                      onChange={(e) => setPrimaryContactPhone(e.target.value)}
                      placeholder="Enter phone number"
                      error={errors.primaryContactPhone}
                      onKeyDown={(e) => handleEnterKey(e, businessPhoneRef)}
                      inputRef={primaryContactPhoneRef}
                    />
                  </div>
                  <Input
                    id="businessPhone"
                    label="Business Phone"
                    type="tel"
                    value={businessPhone}
                    onChange={(e) => setBusinessPhone(e.target.value)}
                    placeholder="Enter business phone"
                    error={errors.businessPhone}
                    onKeyDown={(e) => handleEnterKey(e, vatNumberRef)}
                    inputRef={businessPhoneRef}
                  />
                  <Input
                    id="vatNumber"
                    label="VAT Registration Number (Optional if under threshold)"
                    value={vatNumber}
                    onChange={(e) => setVatNumber(e.target.value)}
                    placeholder="Enter VAT number"
                    error={errors.vatNumber}
                    onKeyDown={(e) => handleEnterKey(e, brandNameRef)}
                    inputRef={vatNumberRef}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Primary Brand Information</h3>
                  <Input
                    id="brandName"
                    label="Brand Name (If differs from store name)"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Enter brand name"
                    error={errors.brandName}
                    onKeyDown={(e) => handleEnterKey(e, brandWebsiteRef)}
                    inputRef={brandNameRef}
                  />
                  <Input
                    id="brandWebsite"
                    label="Brand Website (Optional)"
                    value={brandWebsite}
                    onChange={(e) => setBrandWebsite(e.target.value)}
                    placeholder="Enter website URL"
                    error={errors.brandWebsite}
                    onKeyDown={(e) => handleEnterKey(e, brandCountryRef)}
                    inputRef={brandWebsiteRef}
                  />
                  <Select
                    id="brandCountry"
                    label="Country & Emirates of Registration"
                    value={brandCountry}
                    onChange={(e) => setBrandCountry(e.target.value)}
                    options={countries}
                    error={errors.brandCountry}
                    onKeyDown={(e) => handleEnterKey(e, facebookRef)}
                    inputRef={brandCountryRef}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      id="facebook"
                      label="Facebook"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      placeholder="Enter Facebook URL"
                      error={errors.facebook}
                      onKeyDown={(e) => handleEnterKey(e, instagramRef)}
                      inputRef={facebookRef}
                    />
                    <Input
                      id="instagram"
                      label="Instagram"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="Enter Instagram URL"
                      error={errors.instagram}
                      onKeyDown={(e) => handleEnterKey(e, brandFormatRef)}
                      inputRef={instagramRef}
                    />
                  </div>
                  <Select
                    id="brandFormat"
                    label="Multi-Brand / Single Brand Format"
                    value={brandFormat}
                    onChange={(e) => setBrandFormat(e.target.value)}
                    options={['Multi-Brand', 'Single Brand']}
                    error={errors.brandFormat}
                    onKeyDown={(e) => handleEnterKey(e, termsRef)}
                    inputRef={brandFormatRef}
                  />
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                <Checkbox
                  label="Terms & Conditions"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  onKeyDown={(e) => handleEnterKey(e, privacyRef)}
                  inputRef={termsRef}
                />
                <Checkbox
                  label="Privacy Policy"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  onKeyDown={(e) => handleEnterKey(e, nextButtonStep1Ref)}
                  inputRef={privacyRef}
                />
              </div>
              {(errors.termsAccepted || errors.privacyAccepted) && (
                <p className="mt-2 text-sm text-red-500">{errors.termsAccepted || errors.privacyAccepted}</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Understanding Your Store Preference</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select the Store Topics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.keys(storeTopics).map((key) => (
                      <Checkbox
                        key={key}
                        label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        checked={storeTopics[key]}
                        onChange={() => setStoreTopics(prev => ({ ...prev, [key]: !prev[key] }))}
                      />
                    ))}
                  </div>
                  {errors.storeTopics && (
                    <p className="mt-2 text-sm text-red-500">{errors.storeTopics}</p>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select the Store components, you interested in</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.keys(storeComponents).map((key, index) => (
                      <Checkbox
                        key={key}
                        label={`Component ${index + 1}`}
                        checked={storeComponents[key]}
                        onChange={() => setStoreComponents(prev => ({ ...prev, [key]: !prev[key] }))}
                      />
                    ))}
                  </div>
                  {errors.storeComponents && (
                    <p className="mt-2 text-sm text-red-500">{errors.storeComponents}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Understanding Your Store Preference</h1>
              <h3 className="text-lg font-semibold mb-4">Let's Get Deeper so that we understand your brand better!</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-semibold mb-2">Features & Store Areas</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.keys(features).map((key) => (
                      <Checkbox
                        key={key}
                        label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        checked={features[key]}
                        onChange={() => setFeatures(prev => ({ ...prev, [key]: !prev[key] }))}
                      />
                    ))}
                  </div>
                  {errors.features && (
                    <p className="mt-2 text-sm text-red-500">{errors.features}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-md font-semibold mb-2">Decor & Lighting</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.keys(decor).map((key) => (
                      <Checkbox
                        key={key}
                        label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        checked={decor[key]}
                        onChange={() => setDecor(prev => ({ ...prev, [key]: !prev[key] }))}
                      />
                    ))}
                  </div>
                  {errors.decor && (
                    <p className="mt-2 text-sm text-red-500">{errors.decor}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-md font-semibold mb-2">Walls & Floors</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.keys(wallsFloors).map((key) => (
                      <Checkbox
                        key={key}
                        label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        checked={wallsFloors[key]}
                        onChange={() => setWallsFloors(prev => ({ ...prev, [key]: !prev[key] }))}
                      />
                    ))}
                  </div>
                  {errors.wallsFloors && (
                    <p className="mt-2 text-sm text-red-500">{errors.wallsFloors}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-md font-semibold mb-2">Design Inspiration</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.keys(design).map((key) => (
                      <Checkbox
                        key={key}
                        label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        checked={design[key]}
                        onChange={() => setDesign(prev => ({ ...prev, [key]: !prev[key] }))}
                      />
                    ))}
                  </div>
                  {errors.design && (
                    <p className="mt-2 text-sm text-red-500">{errors.design}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-md font-semibold mb-2">Store Features</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.keys(storeFeatures).map((key) => (
                      <Checkbox
                        key={key}
                        label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        checked={storeFeatures[key]}
                        onChange={() => setStoreFeatures(prev => ({ ...prev, [key]: !prev[key] }))}
                      />
                    ))}
                  </div>
                  {errors.storeFeatures && (
                    <p className="mt-2 text-sm text-red-500">{errors.storeFeatures}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">What are you looking for currently</h1>
              <div className="space-y-4">
                <RadioButton
                  id="purpose1"
                  name="purpose"
                  value="designOurBrandStore"
                  label="Design Our Brand Store"
                  checked={purpose === 'designOurBrandStore'}
                  onChange={(e) => setPurpose(e.target.value)}
                  onKeyDown={(e) => handleEnterKey(e, purposeRef)}
                  inputRef={purposeRef}
                />
                <RadioButton
                  id="purpose2"
                  name="purpose"
                  value="setUpPaymentVirtualStore"
                  label="Set up our fully payment integrated virtual store"
                  checked={purpose === 'setUpPaymentVirtualStore'}
                  onChange={(e) => setPurpose(e.target.value)}
                />
                <RadioButton
                  id="purpose3"
                  name="purpose"
                  value="justForShowcase"
                  label="Just For Showcase to Customer Virtual Experience (For launching Hero Products)"
                  checked={purpose === 'justForShowcase'}
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </div>
              {errors.purpose && (
                <p className="mt-2 text-sm text-red-500">{errors.purpose}</p>
              )}
            </div>
          )}

          {step === 5 && (
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">When do you want to start the project?</h1>
              <div className="space-y-4">
                <RadioButton
                  id="timeline1"
                  name="timeline"
                  value="immediately"
                  label="Immediately"
                  checked={timeline === 'immediately'}
                  onChange={(e) => setTimeline(e.target.value)}
                  onKeyDown={(e) => handleEnterKey(e, timelineRef)}
                  inputRef={timelineRef}
                />
                <RadioButton
                  id="timeline2"
                  name="timeline"
                  value="in2to3Months"
                  label="In 2 - 3 Months"
                  checked={timeline === 'in2to3Months'}
                  onChange={(e) => setTimeline(e.target.value)}
                />
                <RadioButton
                  id="timeline3"
                  name="timeline"
                  value="withinAYear"
                  label="Within a year"
                  checked={timeline === 'withinAYear'}
                  onChange={(e) => setTimeline(e.target.value)}
                />
                <RadioButton
                  id="timeline4"
                  name="timeline"
                  value="notSure"
                  label="Not Sure"
                  checked={timeline === 'notSure'}
                  onChange={(e) => setTimeline(e.target.value)}
                />
              </div>
              {errors.timeline && (
                <p className="mt-2 text-sm text-red-500">{errors.timeline}</p>
              )}
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePrevStep}
              className="flex items-center py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              Back
            </button>
            <button
              ref={nextButtonStep1Ref}
              type="button"
              onClick={handleNextStep}
              className="flex items-center py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="m12 5 7 7-7 7"></path>
                <path d="M5 12h14"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingUI;