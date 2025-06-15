import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductInstructionVideo = () => {
  const navigate = useNavigate();

  const handleReadyClick = () => {
    navigate('/3DProduct');
  };

  return (
    <div className="w-[1440px] h-[1024px] relative bg-white overflow-hidden">
      <div className="pt-12 mb-12 pl-16 flex items-center">
        <img src="/images/lock.svg" alt="Lock Logo" className="w-8 h-8" />
        <div className="text-zinc-800 text-4xl font-bold font-['Red_Hat_Display'] leading-[53px] ml-3">neo</div>
      </div>
      <div className="left-[832px] top-[409px] absolute justify-start text-black text-5xl font-normal font-['Poppins'] whitespace-pre-line">Ready to design <br/>your first store!</div>
      <div
        className="px-5 py-4 left-[897px] top-[579px] absolute bg-indigo-500 rounded-[78.89px] outline outline-[1.58px] outline-offset-[-1.58px] outline-indigo-500 inline-flex justify-start items-center gap-4 cursor-pointer"
        onClick={handleReadyClick}
      >
        <div className="justify-start text-white text-3xl font-normal font-['Roboto']">I Am Ready</div>
      </div>
      <img className="w-[567px] h-96 left-[161px] top-[326px] absolute" src="/images/video.png" alt="Store Design" />
    </div>
  );
};

export default ProductInstructionVideo;