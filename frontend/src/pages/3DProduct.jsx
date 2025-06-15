import React, { useState, useRef, useEffect } from 'react';

const ThreeDProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    sizeFit: '',
    trending: '',
    sku: '',
    price: '',
    other: ''
  });

  const [files, setFiles] = useState({
    productImage: null,
    productVideo: null
  });

  const [dropdownStates, setDropdownStates] = useState({
    sizeFit: false,
    price: false
  });

  const sizeFitRef = useRef(null);
  const priceRef = useRef(null);

  const sizeOptions = [
    { value: 'XS', label: 'XS - Extra Small' },
    { value: 'S', label: 'S - Small' },
    { value: 'M', label: 'M - Medium' },
    { value: 'L', label: 'L - Large' },
    { value: 'XL', label: 'XL - Extra Large' },
    { value: 'XXL', label: 'XXL - Double Extra Large' },
    { value: 'XXXL', label: 'XXXL - Triple Extra Large' },
    { value: 'One Size', label: 'One Size Fits All' },
    { value: 'Free Size', label: 'Free Size' },
    { value: 'Custom', label: 'Custom Size' }
  ];

  const priceOptions = [
    { 
      label: 'Saudi Riyal (SAR)', 
      options: [
        { value: 'SAR_50-100', label: 'SAR 50 - 100', currency: '🇸🇦' },
        { value: 'SAR_100-200', label: 'SAR 100 - 200', currency: '🇸🇦' },
        { value: 'SAR_200-500', label: 'SAR 200 - 500', currency: '🇸🇦' },
        { value: 'SAR_500-1000', label: 'SAR 500 - 1000', currency: '🇸🇦' },
        { value: 'SAR_1000+', label: 'SAR 1000+', currency: '🇸🇦' }
      ]
    },
    { 
      label: 'UAE Dirham (AED)', 
      options: [
        { value: 'AED_50-100', label: 'AED 50 - 100', currency: '🇦🇪' },
        { value: 'AED_100-200', label: 'AED 100 - 200', currency: '🇦🇪' },
        { value: 'AED_200-500', label: 'AED 200 - 500', currency: '🇦🇪' },
        { value: 'AED_500-1000', label: 'AED 500 - 1000', currency: '🇦🇪' },
        { value: 'AED_1000+', label: 'AED 1000+', currency: '🇦🇪' }
      ]
    },
    { 
      label: 'US Dollar (USD)', 
      options: [
        { value: 'USD_10-25', label: 'USD $10 - $25', currency: '🇺🇸' },
        { value: 'USD_25-50', label: 'USD $25 - $50', currency: '🇺🇸' },
        { value: 'USD_50-100', label: 'USD $50 - $100', currency: '🇺🇸' },
        { value: 'USD_100-250', label: 'USD $100 - $250', currency: '🇺🇸' },
        { value: 'USD_250+', label: 'USD $250+', currency: '🇺🇸' }
      ]
    },
    { 
      label: 'British Pound (GBP)', 
      options: [
        { value: 'GBP_10-25', label: 'GBP £10 - £25', currency: '🇬🇧' },
        { value: 'GBP_25-50', label: 'GBP £25 - £50', currency: '🇬🇧' },
        { value: 'GBP_50-100', label: 'GBP £50 - £100', currency: '🇬🇧' },
        { value: 'GBP_100-200', label: 'GBP £100 - £200', currency: '🇬🇧' },
        { value: 'GBP_200+', label: 'GBP £200+', currency: '🇬🇧' }
      ]
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sizeFitRef.current && !sizeFitRef.current.contains(event.target)) {
        setDropdownStates(prev => ({ ...prev, sizeFit: false }));
      }
      if (priceRef.current && !priceRef.current.contains(event.target)) {
        setDropdownStates(prev => ({ ...prev, price: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];
    setFiles(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const toggleDropdown = (field) => {
    setDropdownStates(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const selectOption = (field, value) => {
    handleInputChange(field, value);
    setDropdownStates(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = () => {
    const submitData = {
      ...formData,
      files: files
    };
    console.log('Form submitted:', submitData);
    alert('Product information saved! Check console for details.');
  };

  const getSelectedLabel = (field, options) => {
    if (field === 'sizeFit') {
      const selected = options.find(opt => opt.value === formData.sizeFit);
      return selected ? selected.label : 'Select Size/Fit';
    } else if (field === 'price') {
      for (const group of options) {
        const selected = group.options.find(opt => opt.value === formData.price);
        if (selected) return selected.label;
      }
      return 'Select Currency & Price Range';
    }
  };

  return (
    <div className="w-[1440px] h-[1024px] relative bg-white overflow-hidden">
      <div className="pt-12 mb-12 pl-16 flex items-center">
        <img src="/images/lock.svg" alt="Lock Logo" className="w-8 h-8" />
        <div className="text-zinc-800 text-4xl font-bold font-['Red_Hat_Display'] leading-[53px] ml-3">neo</div>
      </div>
      <div className="left-[68px] top-[177px] absolute justify-start text-zinc-800 text-2xl font-normal font-['Poppins']">Please provide some basic information about the product before adding it.</div>
      <div className="left-[68px] top-[251px] absolute justify-start text-zinc-800 text-xl font-normal font-['Poppins']">Product Information</div>
      
      {/* Product Name Input */}
      <div className="w-[512px] left-[68px] top-[309px] absolute rounded-tl-sm rounded-tr-sm inline-flex flex-col justify-start items-start">
        <div className="self-stretch bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-zinc-500 flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                className="w-full h-full bg-transparent border-none outline-none text-zinc-800 text-base font-normal font-['Poppins']"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Product Name</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description/Details Input */}
      <div className="w-[512px] left-[747px] top-[312px] absolute rounded-tl-sm rounded-tr-sm inline-flex flex-col justify-start items-start">
        <div className="self-stretch bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-zinc-500 flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full h-full bg-transparent border-none outline-none text-zinc-800 text-base font-normal font-['Poppins']"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Description/Details</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size/Fit Select with Custom Dropdown */}
      <div ref={sizeFitRef} className="w-[512px] left-[68px] top-[396px] absolute rounded-tl-sm rounded-tr-sm inline-flex flex-col justify-start items-start">
        <div className="self-stretch bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-zinc-500 flex flex-col justify-start items-start gap-2.5 relative">
          <div 
            className="self-stretch pl-4 py-2 pr-4 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleDropdown('sizeFit')}
          >
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <div className="w-full h-full flex items-center text-zinc-800 text-base font-normal font-['Poppins']">
                {getSelectedLabel('sizeFit', sizeOptions)}
              </div>
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Size / Fit</div>
              </div>
            </div>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transform transition-transform duration-300 ${dropdownStates.sizeFit ? 'rotate-180' : ''}`}>
                <path d="M4 6L8 10L12 6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {/* Custom Dropdown Menu */}
          {dropdownStates.sizeFit && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto">
              <div className="py-2">
                {sizeOptions.map((option, index) => (
                  <div
                    key={option.value}
                    className="px-4 py-3 hover:bg-indigo-50 cursor-pointer transition-colors duration-200 flex items-center justify-between group"
                    onClick={() => selectOption('sizeFit', option.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-lg font-medium text-gray-600">
                        {option.value.charAt(0)}
                      </div>
                      <span className="text-gray-800 font-medium">{option.label}</span>
                    </div>
                    {formData.sizeFit === option.value && (
                      <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Price Select with Custom Dropdown */}
      <div ref={priceRef} className="w-[512px] left-[68px] top-[680px] absolute rounded-tl-sm rounded-tr-sm inline-flex flex-col justify-start items-start">
        <div className="self-stretch bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-zinc-500 flex flex-col justify-start items-start gap-2.5 relative">
          <div 
            className="self-stretch pl-4 py-2 pr-4 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center relative cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleDropdown('price')}
          >
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <div className="w-full h-full flex items-center text-zinc-800 text-base font-normal font-['Poppins']">
                {getSelectedLabel('price', priceOptions)}
              </div>
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Price ( Riyal Dirham. Dollar & Pound)</div>
              </div>
            </div>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transform transition-transform duration-300 ${dropdownStates.price ? 'rotate-180' : ''}`}>
                <path d="M4 6L8 10L12 6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {/* Custom Price Dropdown Menu */}
          {dropdownStates.price && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto">
              <div className="py-2">
                {priceOptions.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                      {group.label}
                    </div>
                    {group.options.map((option, optionIndex) => (
                      <div
                        key={option.value}
                        className="px-4 py-3 hover:bg-green-50 cursor-pointer transition-colors duration-200 flex items-center justify-between group"
                        onClick={() => selectOption('price', option.value)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">{option.currency}</div>
                          <div className="flex flex-col">
                            <span className="text-gray-800 font-medium">{option.label}</span>
                          </div>
                        </div>
                        {formData.price === option.value && (
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    ))}
                    {groupIndex < priceOptions.length - 1 && <div className="border-b border-gray-100 my-1"></div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trending/Sale/New Stock Input */}
      <div className="w-[512px] left-[68px] top-[494px] absolute rounded-tl-sm rounded-tr-sm inline-flex flex-col justify-start items-start">
        <div className="self-stretch bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-zinc-500 flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.trending}
                onChange={(e) => handleInputChange('trending', e.target.value)}
                className="w-full h-full bg-transparent border-none outline-none text-zinc-800 text-base font-normal font-['Poppins']"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Trending /Sale/ New stock</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SKU Input */}
      <div className="w-[512px] left-[68px] top-[584px] absolute rounded-tl-sm rounded-tr-sm inline-flex flex-col justify-start items-start">
        <div className="self-stretch bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-zinc-500 flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                className="w-full h-full bg-transparent border-none outline-none text-zinc-800 text-base font-normal font-['Poppins']"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">SKU</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-1 left-[747px] top-[483px] absolute bg-white inline-flex justify-start items-center">
        <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Upload product image</div>
      </div>

      {/* Other Input */}
      <div className="w-[512px] left-[747px] top-[396px] absolute rounded-tl-sm rounded-tr-sm inline-flex flex-col justify-start items-start">
        <div className="self-stretch bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-zinc-500 flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch pl-4 py-2 rounded-tl-sm rounded-tr-sm inline-flex justify-start items-center">
            <div className="flex-1 h-10 relative inline-flex flex-col justify-center items-start">
              <input
                type="text"
                value={formData.other}
                onChange={(e) => handleInputChange('other', e.target.value)}
                className="w-full h-full bg-transparent border-none outline-none text-zinc-800 text-base font-normal font-['Poppins']"
              />
              <div className="px-1 left-[-4px] top-[-16px] absolute bg-white inline-flex justify-start items-center">
                <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Other</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Preview Button */}
      <button 
        onClick={handleSubmit}
        className="w-52 h-16 left-[601px] top-[842px] absolute bg-indigo-500 rounded-xl overflow-hidden hover:bg-indigo-600 transition-colors cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
      >
        <div className="w-32 h-5 left-[41px] top-[22px] absolute overflow-hidden">
          <div className="w-40 left-[-20px] top-0 absolute text-center justify-start text-white text-xl font-normal font-['Figtree'] leading-tight">Store Preview</div>
        </div>
      </button>

      {/* Product Image Upload */}
      <div className="w-28 h-9 left-[759px] top-[515px] absolute bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-black overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange('productImage', e)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="w-20 h-7 left-[15px] top-[4px] absolute" />
        <div className="w-24 left-[8px] top-[7px] absolute text-center justify-start text-black text-base font-normal font-['Figtree'] leading-tight">Choose file</div>
      </div>
      <div className="left-[874px] top-[523px] absolute opacity-80 text-center justify-start text-black text-xs font-light font-['Figtree'] leading-tight">
        {files.productImage ? files.productImage.name : 'No file selected'}
      </div>

      <div className="px-1 left-[747px] top-[584px] absolute bg-white inline-flex justify-start items-center">
        <div className="justify-start text-zinc-900 text-sm font-normal font-['Poppins']">Upload product video</div>
      </div>

      {/* Product Video Upload */}
      <div className="w-28 h-9 left-[759px] top-[616px] absolute bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-black overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors">
        <input
          type="file"
          accept="video/*"
          onChange={(e) => handleFileChange('productVideo', e)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="w-20 h-7 left-[15px] top-[4px] absolute" />
        <div className="w-24 left-[8px] top-[7px] absolute text-center justify-start text-black text-base font-normal font-['Figtree'] leading-tight">Choose file</div>
      </div>
      <div className="left-[874px] top-[624px] absolute opacity-80 text-center justify-start text-black text-xs font-light font-['Figtree'] leading-tight">
        {files.productVideo ? files.productVideo.name : 'No file selected'}
      </div>
    </div>
  );
};

export default ThreeDProduct;