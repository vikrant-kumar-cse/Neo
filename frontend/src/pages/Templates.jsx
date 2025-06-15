import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Templates() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState({ id: 1, image: '/images/close-store.png', title: 'Close Store' });
  const [selectedThemes, setSelectedThemes] = useState([]);
  const templates = [
    { id: 1, image: '/images/close-store.png', title: 'Close Store' },
    { id: 2, image: '/images/open-store.png', title: 'Open Store' },
  ];
  const themes = [
    { id: 1, image: '/images/fast\.png', title: 'Theme 1' },
    { id: 2, image: '/images/theme-2.png', title: 'Theme 2' },
    { id: 3, image: '/images/theme-3.png', title: 'Theme 3' },
    { id: 4, image: '/images/theme-4.png', title: 'Theme 4' },
    { id: 5, image: '/images/theme-5.png', title: 'Theme 5' },
    { id: 6, image: '/images/theme-6.png', title: 'Theme 6' },
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setSelectedThemes([]);
  };

  const handleThemeSelect = (theme) => {
    setSelectedThemes((prev) =>
      prev.some((t) => t.id === theme.id) ? prev.filter((t) => t.id !== theme.id) : [...prev, theme]
    );
  };

  const handleNext = () => {
    if (selectedTemplate && selectedThemes.length > 0) navigate('/store-preference');
  };

  return (
    <div className="w-[1440px] h-[1024px] relative bg-white overflow-hidden">
      <div className="pt-12 mb-12 pl-16 flex items-center">
        <img src="/images/lock.svg" alt="Lock Logo" className="w-8 h-8" />
        <div className="text-zinc-800 text-4xl font-bold font-['Red_Hat_Display'] leading-[53px] ml-3">Neo</div>
      </div>
      <div className="left-[111px] top-[163px] absolute justify-start text-zinc-800 text-3xl font-semibold font-['Figtree']">Select Few templates</div>
      <div className="size-6 left-[1360px] top-[941px] absolute cursor-pointer" onClick={handleNext}>
        <svg className="w-4 h-3.5 left-[3px] top-[5px] absolute" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 7H14M14 7L8 1M14 7L8 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
      <div className="size-6 left-[1292px] top-[941px] absolute cursor-pointer" onClick={() => navigate(-1)}>
        <svg className="w-4 h-3.5 left-[3px] top-[5px] absolute" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 7H1M1 7L7 13M1 7L7 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
      <img className="w-80 h-48 left-[109px] top-[293px] absolute rounded-[20px] border" src={templates[0].image} alt={templates[0].title} onClick={() => handleTemplateSelect(templates[0])} />
      <img className="w-80 h-48 left-[109px] top-[611px] absolute rounded-[20px] border" src={templates[1].image} alt={templates[1].title} onClick={() => handleTemplateSelect(templates[1])} />
      <div className="left-[174px] top-[485px] absolute justify-start text-black text-2xl font-medium font-['Poppins']">{templates[0].title}</div>
      <div className="left-[171px] top-[803px] absolute justify-start text-black text-2xl font-medium font-['Poppins']">{templates[1].title}</div>
      {selectedTemplate && (
        <>
          <div className="left-[624px] top-[214px] absolute justify-start text-black text-2xl font-medium font-['Poppins']">Theme Details</div>
          <img className={`w-80 h-48 left-[619px] top-[294px] absolute rounded-[20px] border ${selectedThemes.some((t) => t.id === 1) ? 'outline outline-4 outline-blue-500' : 'border'}`} src={themes[0].image} alt={themes[0].title} onClick={() => handleThemeSelect(themes[0])} />
          <img className={`w-80 h-48 left-[994px] top-[294px] absolute rounded-[20px] border ${selectedThemes.some((t) => t.id === 2) ? 'outline outline-4 outline-blue-500' : 'border'}`} src={themes[1].image} alt={themes[1].title} onClick={() => handleThemeSelect(themes[1])} />
          <img className={`w-80 h-48 left-[619px] top-[500px] absolute rounded-[20px] border ${selectedThemes.some((t) => t.id === 3) ? 'outline outline-4 outline-blue-500' : 'border'}`} src={themes[2].image} alt={themes[2].title} onClick={() => handleThemeSelect(themes[2])} />
          <img className={`w-80 h-48 left-[994px] top-[500px] absolute rounded-[20px] border ${selectedThemes.some((t) => t.id === 4) ? 'outline outline-4 outline-blue-500' : 'border'}`} src={themes[3].image} alt={themes[3].title} onClick={() => handleThemeSelect(themes[3])} />
          <img className={`w-80 h-48 left-[619px] top-[706px] absolute rounded-[20px] border ${selectedThemes.some((t) => t.id === 5) ? 'outline outline-4 outline-blue-500' : 'border'}`} src={themes[4].image} alt={themes[4].title} onClick={() => handleThemeSelect(themes[4])} />
          <img className={`w-80 h-48 left-[994px] top-[705px] absolute rounded-[20px] border ${selectedThemes.some((t) => t.id === 6) ? 'outline outline-4 outline-blue-500' : 'border'}`} src={themes[5].image} alt={themes[5].title} onClick={() => handleThemeSelect(themes[5])} />
        </>
      )}
      <div className="w-3 h-[596px] left-[1405px] top-[258px] absolute bg-zinc-300 rounded-xl" />
      <div className="w-3 h-28 left-[1405px] top-[256px] absolute bg-indigo-500 rounded-xl" />
      <div data-type="Disable - Check" className="size-10 left-[132px] top-[307px] absolute inline-flex justify-start items-center gap-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedTemplate?.id === 1}
            onChange={() => handleTemplateSelect(templates[0])}
            className="hidden"
          />
          <div className={`size-9 rounded-lg inline-flex justify-center items-center gap-4 ${selectedTemplate?.id === 1 ? 'bg-stone-300' : 'bg-white outline outline-1 outline-offset-[-1px] outline-stone-300'}`}>
            {selectedTemplate?.id === 1 && (
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </label>
      </div>
      <div data-type="Disable - Check" className="size-10 left-[129px] top-[623px] absolute inline-flex justify-start items-center gap-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedTemplate?.id === 2}
            onChange={() => handleTemplateSelect(templates[1])}
            className="hidden"
          />
          <div className={`size-9 rounded-lg inline-flex justify-center items-center gap-4 ${selectedTemplate?.id === 2 ? 'bg-stone-300' : 'bg-white outline outline-1 outline-offset-[-1px] outline-stone-300'}`}>
            {selectedTemplate?.id === 2 && (
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </label>
      </div>
    </div>
  );
}

export default Templates;