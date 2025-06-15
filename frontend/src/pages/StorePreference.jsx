import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StorePreference = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  const handleNext = () => {
    const requiredCategories = [
      'Fixtures & Store Areas',
      'Decor & Lighting',
      'Walls & Floors',
      'Design Inspiration',
      'Store Features'
    ];
    const hasSelectedInAll = requiredCategories.every(category =>
      items[category].some(item => selectedItems.includes(item))
    );
    if (hasSelectedInAll) {
      setShowWarning(false);
      navigate('/ProductInstructionVideo');
    } else {
      setShowWarning(true);
    }
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  const toggleSelection = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
    setShowWarning(false);
  };

  const items = {
    'Fixtures & Store Areas': [
      'Gondola Displays', 'Display Cases', 'Slatwall Displays', 'Dump Bins', 'Display Rack',
      'Eyewear Stands', 'Pegboards', 'End Cap Displays', 'Racks', 'Shelf Talkers',
      'Acrylic Displays', 'Facade', 'Storytelling LEDs', 'Arch Gate', 'Tables', 'Shelving',
      'Lobby Area For Customers', 'Round Racks', 'Mannequins', 'Gridwall Displays', 'Apparel Fixtures'
    ],
    'Decor & Lighting': [
      'Artwork', 'Mirrors', 'Table Lamps', 'Posters', 'Photo frames', 'Rugs', 'Plants',
      'Floor Lamps', 'Mirror Art', 'Wall Branding'
    ],
    'Walls & Floors': [
      'Paint', 'Wooden Flooring', 'Hardwood Tiles', 'Wall Panel', 'Wall Shelf', 'Embedded Wall Displays'
    ],
    'Design Inspiration': [
      'Paint', 'Vintage', 'Retro', 'Ikea Style', 'A Store from The future', 'Luxury Store'
    ],
    'Store Features': [
      'Payment', 'Virtual Tryon', 'Seasonal Store ( e.g. Christmas )', 'Shipping'
    ]
  };

  return (
    <div className="w-[1440px] h-[1733px] relative bg-white overflow-hidden">
      {showWarning && (
        <div className="left-[71px] top-[150px] absolute text-red-600 text-xl font-normal font-['Poppins']">
          Please select at least one item from each category.
        </div>
      )}
      <div className="w-[1282px] h-96 left-[71px] top-[325px] absolute bg-neutral-50 rounded-[20px]" />
      <div className="w-[1282px] h-60 left-[72px] top-[747px] absolute bg-neutral-50 rounded-[20px]" />
      <div className="w-[1282px] h-44 left-[72px] top-[1066px] absolute bg-neutral-50 rounded-[20px]" />
      <div className="w-[1282px] h-44 left-[72px] top-[1285px] absolute bg-neutral-50 rounded-[20px]" />
      <div className="w-[1282px] h-44 left-[71px] top-[1492px] absolute bg-neutral-50 rounded-[20px]" />
      <div className="pt-12 mb-12 pl-16 flex items-center">
        <img src="/images/lock.svg" alt="Lock Logo" className="w-8 h-8" />
        <div className="text-zinc-800 text-4xl font-bold font-['Red_Hat_Display'] leading-[53px] ml-3">neo</div>
      </div>
      <div className="left-[68px] top-[177px] absolute text-zinc-800 text-2xl font-normal font-['Poppins']">Understanding Your Store Preference</div>
      <div className="left-[71px] top-[264px] absolute text-zinc-800 text-2xl font-normal font-['Poppins']">Lets Get Deeper so that we understand your brand better!</div>
      <div className="left-[114px] top-[770px] absolute text-zinc-800 text-2xl font-normal font-['Poppins']">Decor & Lighting</div>
      <div className="left-[113px] top-[348px] absolute text-zinc-800 text-2xl font-normal font-['Poppins']">Fixtures & Store Areas</div>
      <div className="left-[114px] top-[1308px] absolute text-zinc-800 text-2xl font-normal font-['Poppins']">Design Inspiration</div>
      <div className="left-[114px] top-[1089px] absolute text-zinc-800 text-2xl font-normal font-['Poppins']">Walls & Floors</div>
      <div className="left-[113px] top-[1515px] absolute text-zinc-800 text-2xl font-normal font-['Poppins']">Store Features</div>
      <div
        className={`px-3 py-2.5 left-[111px] top-[829px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Artwork') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Artwork')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Artwork</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[111px] top-[1367px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Paint') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Paint')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Paint</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[275px] top-[829px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Mirrors') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Mirrors')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Mirrors</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[111px] top-[1148px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Paint') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Paint')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Paint</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[110px] top-[1574px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Payment') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Payment')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Payment</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[110px] top-[407px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Gondola Displays') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Gondola Displays')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Gondola Displays</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[228px] top-[1367px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Vintage') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Vintage')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Vintage</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[114px] top-[895px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Table Lamps') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Table Lamps')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Table Lamps</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[228px] top-[1148px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Wooden Flooring') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Wooden Flooring')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Wooden Flooring</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[322px] top-[895px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Posters') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Posters')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Posters</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[528px] top-[1367px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Retro') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Retro')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Retro</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[244px] top-[1574px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Virtual Tryon') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Virtual Tryon')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Virtual Tryon</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[318px] top-[407px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Display Cases') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Display Cases')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Display Cases</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[592px] top-[828px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Photo frames') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Photo frames')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Photo frames</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[638px] top-[1147px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Wall Panel') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Wall Panel')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Wall Panel</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[561px] top-[1574px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Seasonal Store ( e.g. Christmas )') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Seasonal Store ( e.g. Christmas )')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Seasonal Store ( e.g. Christmas )</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[901px] top-[1574px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Seasonal Store ( e.g. Christmas )') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Seasonal Store ( e.g. Christmas )')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Seasonal Store ( e.g. Christmas )</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[113px] top-[473px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Slatwall Displays') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Slatwall Displays')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Slatwall Displays</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[321px] top-[473px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Dump Bins') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Dump Bins')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Dump Bins</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[701px] top-[406px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Display Rack') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Display Rack')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Display Rack</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[700px] top-[473px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Eyewear Stands') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Eyewear Stands')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Eyewear Stands</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[899px] top-[473px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Pegboards') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Pegboards')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Pegboards</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[1057px] top-[473px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('End Cap Displays') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('End Cap Displays')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">End Cap Displays</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[113px] top-[540px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Racks') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Racks')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Racks</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[221px] top-[540px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Shelf Talkers') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Shelf Talkers')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Shelf Talkers</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[113px] top-[615px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Acrylic Displays') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Acrylic Displays')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Acrylic Displays</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[333px] top-[615px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Facade') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Facade')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Facade</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[803px] top-[828px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Rugs') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Rugs')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Rugs</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[482px] top-[615px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Storytelling LEDs') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Storytelling LEDs')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Storytelling LEDs</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[446px] top-[829px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Plants') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Plants')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Plants</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[712px] top-[615px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Arch Gate') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Arch Gate')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Arch Gate</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[657px] top-[1367px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('A Store from The future') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('A Store from The future')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">A Store from The future</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[937px] top-[1366px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Luxury Store') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Luxury Store')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Luxury Store</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[477px] top-[895px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Mirror Art') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Mirror Art')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Mirror Art</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[636px] top-[895px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Wall Branding') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Wall Branding')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Wall Branding</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[367px] top-[1366px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Ikea Style') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Ikea Style')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Ikea Style</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[597px] top-[540px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Tables') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Tables')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Tables</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[803px] top-[1147px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Wall Shelf') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Wall Shelf')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Wall Shelf</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[975px] top-[1147px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Embedded Wall Displays') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Embedded Wall Displays')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Embedded Wall Displays</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[907px] top-[829px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Floor Lamps') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Floor Lamps')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Floor Lamps</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[433px] top-[1148px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Hardwood Tiles') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Hardwood Tiles')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Hardwood Tiles</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[417px] top-[1574px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Shipping') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Shipping')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Shipping</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[734px] top-[540px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Shelving') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Shelving')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Shelving</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[901px] top-[540px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Lobby Area For Customers') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Lobby Area For Customers')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Lobby Area For Customers</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[398px] top-[540px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Round Racks') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Round Racks')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Round Racks</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[870px] top-[407px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Mannequins') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Mannequins')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Mannequins</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[511px] top-[407px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Mannequins') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Mannequins')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Mannequins</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[476px] top-[473px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Gridwall Displays') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Gridwall Displays')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Gridwall Displays</div>
      </div>
      <div
        className={`px-3 py-2.5 left-[1043px] top-[406px] absolute rounded-[50px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-start items-center gap-2.5 cursor-pointer ${selectedItems.includes('Apparel Fixtures') ? 'bg-zinc-200' : ''}`}
        onClick={() => toggleSelection('Apparel Fixtures')}
      >
        <div className="text-zinc-800 text-xl font-normal font-['Roboto']">Apparel Fixtures</div>
      </div>
      <div className="size-6 left-[1360px] top-[1683px] absolute cursor-pointer" onClick={handleNext}>
        <svg className="w-4 h-3.5 left-[3px] top-[5px] absolute" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 7H14M14 7L8 1M14 7L8 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
      <div className="size-6 left-[1292px] top-[1683px] absolute cursor-pointer" onClick={handlePrevious}>
        <svg className="w-4 h-3.5 left-[3px] top-[5px] absolute" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 7H1M1 7L7 13M1 7L7 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
    </div>
  );
};

export default StorePreference;