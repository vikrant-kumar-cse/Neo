import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BrandInformation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    tradeLicense: null,
    countryEmiratesBusiness: '',
    profileAtCompany: '',
    primaryContactName: '',
    primaryContactPhone: '',
    businessPhone: '',
    vatRegistrationNumber: '',
    brandLogo: null,
    brandName: '',
    brandWebsite: '',
    countryEmiratesBrand: '',
    facebook: '',
    instagram: '',
    multiBrand: '',
    terms: false,
    privacy: false,
  });

  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});
  const [isMultiBrandOpen, setIsMultiBrandOpen] = useState(false);
  const [isCountryBusinessOpen, setIsCountryBusinessOpen] = useState(false);
  const [isCountryBrandOpen, setIsCountryBrandOpen] = useState(false);

  const multiBrandOptions = ['Multi-Brand', 'Single Brand'];
  const countryOptions = [
    'UAE - Abu Dhabi',
    'UAE - Dubai',
    'UAE - Sharjah',
    'UAE - Ajman',
    'UAE - Umm Al Quwain',
    'UAE - Ras Al Khaimah',
    'UAE - Fujairah',
  ];

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
    checkWarnings(field, value);
  };

  const handleFileChange = (field) => (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [field]: file });
    validateField(field, file);
    checkWarnings(field, file);
  };

  const handleCheckboxChange = (field) => () => {
    const value = !formData[field];
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
    checkWarnings(field, value);
  };

  const handleDropdownChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
    checkWarnings(field, value);
    if (field === 'multiBrand') setIsMultiBrandOpen(false);
    if (field === 'countryEmiratesBusiness') setIsCountryBusinessOpen(false);
    if (field === 'countryEmiratesBrand') setIsCountryBrandOpen(false);
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    switch (field) {
      case 'companyName':
        if (!value.trim()) newErrors.companyName = 'Please enter your company name.';
        else delete newErrors.companyName;
        break;
      case 'tradeLicense':
        if (!value) newErrors.tradeLicense = 'Please upload a trade license file.';
        else delete newErrors.tradeLicense;
        break;
      case 'countryEmiratesBusiness':
      case 'countryEmiratesBrand':
        if (!value) newErrors[field] = 'Please select a country and emirate.';
        else delete newErrors[field];
        break;
      case 'profileAtCompany':
        if (!value.trim()) newErrors.profileAtCompany = 'Please specify your profile at the company.';
        else delete newErrors.profileAtCompany;
        break;
      case 'primaryContactName':
        if (!value.trim()) newErrors.primaryContactName = 'Please provide a primary contact name.';
        else delete newErrors.primaryContactName;
        break;
      case 'primaryContactPhone':
        if (!value.trim()) newErrors.primaryContactPhone = 'Please enter a primary contact phone number.';
        else if (!/^\d{10}$/.test(value)) newErrors.primaryContactPhone = 'Phone number must be 10 digits.';
        else delete newErrors.primaryContactPhone;
        break;
      case 'businessPhone':
        if (!value.trim()) newErrors.businessPhone = 'Please enter a business phone number.';
        else if (!/^\d{10}$/.test(value)) newErrors.businessPhone = 'Phone number must be 10 digits.';
        else delete newErrors.businessPhone;
        break;
      case 'brandName':
        if (!value.trim()) newErrors.brandName = 'Please enter your brand name.';
        else delete newErrors.brandName;
        break;
      case 'multiBrand':
        if (!value) newErrors.multiBrand = 'Please select a brand format.';
        else delete newErrors.multiBrand;
        break;
      case 'terms':
        if (!value) newErrors.terms = 'You must agree to the Terms & Conditions to proceed.';
        else delete newErrors.terms;
        break;
      case 'privacy':
        if (!value) newErrors.privacy = 'You must agree to the Privacy Policy to proceed.';
        else delete newErrors.privacy;
        break;
      default:
        delete newErrors[field];
    }
    setErrors(newErrors);
  };

  const checkWarnings = (field, value) => {
    const newWarnings = { ...warnings };
    switch (field) {
      case 'vatRegistrationNumber':
        if (value && !/^\d{15}$/.test(value)) newWarnings.vatRegistrationNumber = 'VAT number should be 15 digits for full compliance (optional).';
        else delete newWarnings.vatRegistrationNumber;
        break;
      case 'primaryContactPhone':
      case 'businessPhone':
        if (value && /^\d{10}$/.test(value) && !value.startsWith('05')) newWarnings[field] = 'Consider using a UAE mobile prefix (e.g., 05) for better reachability.';
        else delete newWarnings[field];
        break;
      case 'brandWebsite':
        if (value && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)) newWarnings.brandWebsite = 'Website URL format may be incorrect. Please use a valid format (e.g., https://example.com).';
        else delete newWarnings.brandWebsite;
        break;
      default:
        delete newWarnings[field];
    }
    setWarnings(newWarnings);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((field) => validateField(field, formData[field]));
    setErrors(newErrors);

    if (Object.keys(errors).length > 0) return;

    const form = new FormData();
    form.append('companyName', formData.companyName);
    form.append('tradeLicense', formData.tradeLicense);
    form.append('countryAndEmirates', formData.countryEmiratesBusiness);
    form.append('profileAtCompany', formData.profileAtCompany);
    form.append('primaryContactName', formData.primaryContactName);
    form.append('primaryContactPhone', formData.primaryContactPhone);
    form.append('businessPhone', formData.businessPhone);
    form.append('vatRegistrationNumber', formData.vatRegistrationNumber);
    form.append('brandLogo', formData.brandLogo);
    form.append('brandName', formData.brandName);
    form.append('brandWebsite', formData.brandWebsite);
    form.append('brandCountryAndEmirates', formData.countryEmiratesBrand);
    form.append('facebook', formData.facebook);
    form.append('instagram', formData.instagram);
    form.append('brandFormat', formData.multiBrand); // Should be "Single" or "Multi"
    form.append('terms', String(formData.terms));
    form.append('privacy', String(formData.privacy));




    const token = localStorage.getItem('brand_token');
    try {
      const response = await fetch('http://localhost:8080/Brand/business-info', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: form
      });

      const data = await response.json();
      if (response.ok) {
        alert('Business info submitted successfully!');
        navigate('/templates');
      } else {
        console.error(data);
        alert('Submission failed: ' + data.message);
      }
    } catch (error) {
      console.error(error); // <-- Yeh console mein actual error deta hai
      alert({ message: "Error saving info", error });
    }
    
  };


  return (
    <div className="w-[1440px] h-[1024px] relative bg-white overflow-hidden">
      {/* Logo */}
      <div className="flex items-center left-[62px] top-[51px] absolute">
        <img 
          src="/images/lock.svg" 
          alt="Lock Logo" 
          className="w-8 h-8"
        />
        <div className="text-zinc-800 text-4xl font-bold font-['Red_Hat_Display'] leading-[53px] ml-[15.64px]">
          neo
        </div>
      </div>

      {/* Header */}
      <div className="left-[68px] top-[177px] absolute justify-start text-zinc-800 text-2xl font-normal font-['Poppins']">
        Before setting up store, ask some basic Information about your brand!
      </div>

      {/* Business Information Section */}
      <div className="left-[68px] top-[251px] absolute justify-start text-zinc-800 text-xl font-normal font-['Poppins']">
        Business Information
      </div>

      {/* Primary Brand Information Section */}
      <div className="left-[730px] top-[251px] absolute justify-start text-zinc-800 text-xl font-normal font-['Poppins']">
        Primary Brand Information
      </div>

      {/* Company Name */}
      <div 
        data-leading-icon="false" 
        data-state="enabled" 
        data-style="outlined" 
        data-supporting-text="false" 
        data-text-configurations="input-text" 
        data-trailing-icon="false" 
        className="w-[512px] left-[68px] top-[309px] absolute rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm inline-flex flex-col justify-start items-start"
      >
        <div className="self-stretch bg-white border border-zinc-500 rounded-sm flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.companyName}
                onChange={handleInputChange('companyName')}
                className="w-full h-10 outline-none text-zinc-900 text-base font-normal font-['Poppins'] border-none"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Company Name (As Per License)</div>
              </div>
            </div>
          </div>
        </div>
        {errors.companyName && (
          <p className="text-red-600 text-sm mt-1 font-normal font-['Poppins']">*{errors.companyName}</p>
        )}
      </div>

      {/* Upload Trade License */}
      <div 
        data-leading-icon="false" 
        data-state="enabled" 
        data-style="outlined" 
        data-supporting-text="false" 
        data-text-configurations="input-text" 
        data-trailing-icon="false" 
        className="w-[512px] left-[68px] top-[387px] absolute rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm inline-flex flex-col justify-start items-start"
      >
        <div className="self-stretch bg-white border border-zinc-500 rounded-sm flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="file"
                id="tradeLicense"
                onChange={handleFileChange('tradeLicense')}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Upload Trade License</div>
              </div>
              <div className="h-10 flex items-center justify-between w-full pr-4">
                <span className="text-zinc-900 text-base font-normal font-['Poppins']">
                  {formData.tradeLicense ? formData.tradeLicense.name : 'No file chosen'}
                </span>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V16M12 16L8 12M12 16L16 12" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                  <path d="M4 20H20" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        {errors.tradeLicense && (
          <p className="text-red-600 text-sm mt-1 font-normal font-['Poppins']">*{errors.tradeLicense}</p>
        )}
      </div>

      {/* Country & Emirates of Registration (Business) */}
      <div 
        data-leading-icon="false" 
        data-state="enabled" 
        data-style="outlined" 
        data-supporting-text="false" 
        data-text-configurations="input-text" 
        data-trailing-icon="false" 
        className="w-[512px] left-[68px] top-[465px] absolute rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm inline-flex flex-col justify-start items-start"
        onClick={() => setIsCountryBusinessOpen(!isCountryBusinessOpen)}
        style={{ cursor: 'pointer' }}
      >
        <div className="self-stretch bg-white border border-zinc-500 rounded-sm flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.countryEmiratesBusiness}
                readOnly
                className="w-full h-10 outline-none text-zinc-900 text-base font-normal font-['Poppins'] border-none bg-transparent"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Country & Emirates of Registration</div>
              </div>
              <div className="h-10 flex items-center justify-end">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }}>
                  <path d="M1.5 1.5L12 12L22.5 1.5" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                </svg>
              </div>
            </div>
          </div>
          {isCountryBusinessOpen && (
            <div className="absolute z-10 w-full bg-white border border-zinc-500 rounded-sm mt-1">
              {countryOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleDropdownChange('countryEmiratesBusiness')(option)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        {errors.countryEmiratesBusiness && (
          <p className="text-red-600 text-sm mt-1 font-normal font-['Poppins']">*{errors.countryEmiratesBusiness}</p>
        )}
      </div>

      {/* Your Profile at Company */}
      <div 
        data-leading-icon="false" 
        data-state="enabled" 
        data-style="outlined" 
        data-supporting-text="false" 
        data-text-configurations="input-text" 
        data-trailing-icon="false" 
        className="w-[512px] left-[68px] top-[540px] absolute rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm inline-flex flex-col justify-start items-start"
      >
        <div className="self-stretch bg-white border border-zinc-500 rounded-sm flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.profileAtCompany}
                onChange={handleInputChange('profileAtCompany')}
                className="w-full h-10 outline-none text-zinc-900 text-base font-normal font-['Poppins'] border-none"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Your Profile at Company</div>
              </div>
            </div>
          </div>
        </div>
        {errors.profileAtCompany && (
          <p className="text-red-600 text-sm mt-1 font-normal font-['Poppins']">*{errors.profileAtCompany}</p>
        )}
      </div>

      {/* Primary Contact Name */}
      <div 
        data-leading-icon="false" 
        data-state="enabled" 
        data-style="outlined" 
        data-supporting-text="false" 
        data-text-configurations="input-text" 
        data-trailing-icon="false" 
        className="w-72 left-[68px] top-[610px] absolute rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm inline-flex flex-col justify-start items-start"
      >
        <div className="self-stretch bg-white border border-zinc-500 rounded-sm flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.primaryContactName}
                onChange={handleInputChange('primaryContactName')}
                className="w-full h-10 outline-none text-zinc-900 text-base font-normal font-['Poppins'] border-none"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Primary Contact Name</div>
              </div>
            </div>
          </div>
        </div>
        {errors.primaryContactName && (
          <p className="text-red-600 text-sm mt-1 font-normal font-['Poppins']">*{errors.primaryContactName}</p>
        )}
      </div>

      {/* Primary Contact Phone */}
      <div 
        data-leading-icon="false" 
        data-state="enabled" 
        data-style="outlined" 
        data-supporting-text="false" 
        data-text-configurations="input-text" 
        data-trailing-icon="false" 
        className="w-[214px] h-10 left-[366px] top-[610px] absolute rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm inline-flex flex-col justify-start items-start"
      >
        <div className="self-stretch bg-white border border-zinc-500 rounded-sm flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="tel"
                value={formData.primaryContactPhone}
                onChange={handleInputChange('primaryContactPhone')}
                className="w-full h-10 outline-none text-zinc-900 text-base font-normal font-['Poppins'] border-none"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Primary Contact Phone</div>
              </div>
            </div>
          </div>
        </div>
        {errors.primaryContactPhone && (
          <p className="text-red-600 text-sm mt-1 font-normal font-['Poppins']">*{errors.primaryContactPhone}</p>
        )}
        {warnings.primaryContactPhone && (
          <p className="text-yellow-600 text-sm mt-1 font-normal font-['Poppins']">! {warnings.primaryContactPhone}</p>
        )}
      </div>

      {/* Business Phone */}
      <div 
        data-leading-icon="false" 
        data-state="enabled" 
        data-style="outlined" 
        data-supporting-text="false" 
        data-text-configurations="input-text" 
        data-trailing-icon="false" 
        className="w-[512px] left-[68px] top-[688px] absolute rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm inline-flex flex-col justify-start items-start"
      >
        <div className="self-stretch bg-white border border-zinc-500 rounded-sm flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="tel"
                value={formData.businessPhone}
                onChange={handleInputChange('businessPhone')}
                className="w-full h-10 outline-none text-zinc-900 text-base font-normal font-['Poppins'] border-none"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Business Phone</div>
              </div>
            </div>
          </div>
        </div>
        {errors.businessPhone && (
          <p className="text-red-600 text-sm mt-1 font-normal font-['Poppins']">*{errors.businessPhone}</p>
        )}
        {warnings.businessPhone && (
          <p className="text-yellow-600 text-sm mt-1 font-normal font-['Poppins']">! {warnings.businessPhone}</p>
        )}
      </div>

      {/* VAT Registration Number */}
      <div 
        data-leading-icon="false" 
        data-state="enabled" 
        data-style="outlined" 
        data-supporting-text="false" 
        data-text-configurations="input-text" 
        data-trailing-icon="false" 
        className="w-[512px] left-[68px] top-[766px] absolute rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm inline-flex flex-col justify-start items-start"
      >
        <div className="self-stretch bg-white border border-zinc-500 rounded-sm flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.vatRegistrationNumber}
                onChange={handleInputChange('vatRegistrationNumber')}
                className="w-full h-10 outline-none text-zinc-900 text-base font-normal font-['Poppins'] border-none"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Vat Registration Number (Optional if under threshold)</div>
              </div>
            </div>
          </div>
        </div>
        {warnings.vatRegistrationNumber && (
          <p className="text-yellow-600 text-sm mt-1 font-normal font-['Poppins']">! {warnings.vatRegistrationNumber}</p>
        )}
      </div>

      {/* Upload Brand Logo */}
      <div 
        data-leading-icon="false" 
        data-state="enabled" 
        data-style="outlined" 
        data-supporting-text="false" 
        data-text-configurations="input-text" 
        data-trailing-icon="false" 
        className="w-[512px] left-[70px] top-[844px] absolute rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm inline-flex flex-col justify-start items-start"
      >
        <div className="self-stretch bg-white border border-zinc-500 rounded-sm flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="file"
                id="brandLogo"
                onChange={handleFileChange('brandLogo')}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Upload Brand Logo</div>
              </div>
              <div className="h-10 flex items-center justify-between w-full pr-4">
                <span className="text-zinc-900 text-base font-normal font-['Poppins']">
                  {formData.brandLogo ? formData.brandLogo.name : 'No file chosen'}
                </span>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V16M12 16L8 12M12 16L16 12" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                  <path d="M4 20H20" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Name */}
      <div 
        data-leading-icon="false" 
        data-state="enabled" 
        data-style="outlined" 
        data-supporting-text="false" 
        data-text-configurations="input-text" 
        data-trailing-icon="false" 
        className="w-[512px] left-[730px] top-[308px] absolute rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm inline-flex flex-col justify-start items-start"
      >
        <div className="self-stretch bg-white border border-zinc-500 rounded-sm flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.brandName}
                onChange={handleInputChange('brandName')}
                className="w-full h-10 outline-none text-zinc-900 text-base font-normal font-['Poppins'] border-none"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Brand Name (If differs from store name)</div>
              </div>
            </div>
          </div>
        </div>
        {errors.brandName && (
          <p className="text-red-600 text-sm mt-1 font-normal font-['Poppins']">*{errors.brandName}</p>
        )}
      </div>

      {/* Brand Website */}
      <div 
        data-leading-icon="false" 
        data-state="enabled" 
        data-style="outlined" 
        data-supporting-text="false" 
        data-text-configurations="input-text" 
        data-trailing-icon="false" 
        className="w-[512px] left-[730px] top-[386px] absolute rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm inline-flex flex-col justify-start items-start"
      >
        <div className="self-stretch bg-white border border-zinc-500 rounded-sm flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.brandWebsite}
                onChange={handleInputChange('brandWebsite')}
                className="w-full h-10 outline-none text-zinc-900 text-base font-normal font-['Poppins'] border-none"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Brand Website (Optional)</div>
              </div>
            </div>
          </div>
        </div>
        {errors.brandWebsite && (
          <p className="text-red-600 text-sm mt-1 font-normal font-['Poppins']">*{errors.brandWebsite}</p>
        )}
        {warnings.brandWebsite && (
          <p className="text-yellow-600 text-sm mt-1 font-normal font-['Poppins']">! {warnings.brandWebsite}</p>
        )}
      </div>

      {/* Country & Emirates of Registration (Brand) */}
      <div 
        data-leading-icon="false" 
        data-state="enabled" 
        data-style="outlined" 
        data-supporting-text="false" 
        data-text-configurations="input-text" 
        data-trailing-icon="false" 
        className="w-[512px] left-[730px] top-[464px] absolute rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm inline-flex flex-col justify-start items-start"
        onClick={() => setIsCountryBrandOpen(!isCountryBrandOpen)}
        style={{ cursor: 'pointer' }}
      >
        <div className="self-stretch bg-white border border-zinc-500 rounded-sm flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.countryEmiratesBrand}
                readOnly
                className="w-full h-10 outline-none text-zinc-900 text-base font-normal font-['Poppins'] border-none bg-transparent"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Country & Emirates of Registration</div>
              </div>
              <div className="h-10 flex items-center justify-end">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }}>
                  <path d="M1.5 1.5L12 12L22.5 1.5" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                </svg>
              </div>
            </div>
          </div>
          {isCountryBrandOpen && (
            <div className="absolute z-10 w-full bg-white border border-zinc-500 rounded-sm mt-1">
              {countryOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleDropdownChange('countryEmiratesBrand')(option)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        {errors.countryEmiratesBrand && (
          <p className="text-red-600 text-sm mt-1 font-normal font-['Poppins']">*{errors.countryEmiratesBrand}</p>
        )}
      </div>

      {/* Facebook */}
      <div 
        data-leading-icon="false" 
        data-state="enabled" 
        data-style="outlined" 
        data-supporting-text="false" 
        data-text-configurations="input-text" 
        data-trailing-icon="false" 
        className="w-60 h-14 left-[730px] top-[540px] absolute rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm inline-flex flex-col justify-start items-start"
      >
        <div className="self-stretch bg-white border border-zinc-500 rounded-sm flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.facebook}
                onChange={handleInputChange('facebook')}
                className="w-full h-10 outline-none text-zinc-900 text-base font-normal font-['Poppins'] border-none"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Facebook</div>
              </div>
            </div>
          </div>
        </div>
        {errors.facebook && (
          <p className="text-red-600 text-sm mt-1 font-normal font-['Poppins']">*{errors.facebook}</p>
        )}
      </div>

      {/* Instagram */}
      <div 
        data-leading-icon="false" 
        data-state="enabled" 
        data-style="outlined" 
        data-supporting-text="false" 
        data-text-configurations="input-text" 
        data-trailing-icon="false" 
        className="w-60 h-14 left-[1000px] top-[540px] absolute rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm inline-flex flex-col justify-start items-start"
      >
        <div className="self-stretch bg-white border border-zinc-500 rounded-sm flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.instagram}
                onChange={handleInputChange('instagram')}
                className="w-full h-10 outline-none text-zinc-900 text-base font-normal font-['Poppins'] border-none"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Instagram</div>
              </div>
            </div>
          </div>
        </div>
        {errors.instagram && (
          <p className="text-red-600 text-sm mt-1 font-normal font-['Poppins']">*{errors.instagram}</p>
        )}
      </div>

      {/* Multi-Brand / Single Brand Format */}
      <div 
        data-leading-icon="false" 
        data-state="enabled" 
        data-style="outlined" 
        data-supporting-text="false" 
        data-text-configurations="input-text" 
        data-trailing-icon="false" 
        className="w-[512px] left-[730px] top-[618px] absolute rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm inline-flex flex-col justify-start items-start"
        onClick={() => setIsMultiBrandOpen(!isMultiBrandOpen)}
        style={{ cursor: 'pointer' }}
      >
        <div className="self-stretch bg-white border border-zinc-500 rounded-sm flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.multiBrand}
                readOnly
                className="w-full h-10 outline-none text-zinc-900 text-base font-normal font-['Poppins'] border-none bg-transparent"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Multi-Brand / Single Brand Format</div>
              </div>
              <div className="h-10 flex items-center justify-end">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }}>
                  <path d="M1.5 1.5L12 12L22.5 1.5" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                </svg>
              </div>
            </div>
          </div>
          {isMultiBrandOpen && (
            <div className="absolute z-10 w-full bg-white border border-zinc-500 rounded-sm mt-1">
              {multiBrandOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleDropdownChange('multiBrand')(option)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        {errors.multiBrand && (
          <p className="text-red-600 text-sm mt-1 font-normal font-['Poppins']">*{errors.multiBrand}</p>
        )}
      </div>

      {/* Terms & Conditions */}
      <div className="left-[524px] top-[940px] absolute inline-flex justify-start items-center gap-[5px]">
        <input
          type="checkbox"
          checked={formData.terms}
          onChange={handleCheckboxChange('terms')}
          className="size-6 rounded-md border border-neutral-400"
        />
        <div className="justify-start text-zinc-800 text-base font-normal font-['Roboto'] leading-snug">
          Terms & Conditions
        </div>
        {errors.terms && (
          <p className="text-red-600 text-sm mt-1 absolute left-0 top-8">*{errors.terms}</p>
        )}
      </div>

      {/* Privacy Policy */}
      <div className="left-[723px] top-[941px] absolute inline-flex justify-start items-center gap-[5px]">
        <input
          type="checkbox"
          checked={formData.privacy}
          onChange={handleCheckboxChange('privacy')}
          className="size-6 rounded-md border border-neutral-400"
        />
        <div className="justify-start text-zinc-800 text-base font-normal font-['Roboto'] leading-snug">
          Privacy Policy
        </div>
        {errors.privacy && (
          <p className="text-red-600 text-sm mt-1 absolute left-0 top-8">*{errors.privacy}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="size-6 left-[1200px] top-[941px] absolute cursor-pointer" onClick={handleSubmit}>
        <svg className="w-4 h-3.5 left-[3px] top-[5px] absolute" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 7H14M14 7L8 1M14 7L8 13" stroke="black" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

export default BrandInformation;