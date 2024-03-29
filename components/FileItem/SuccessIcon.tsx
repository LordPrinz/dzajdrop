import { useEffect, useState } from "react";

export default () => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 250);
  }, []);

  return (
    <div
      className="rounded-full bg-[#d9f0e6] p-2 text-[#e6f8f0] translate-y-2"
      style={{ opacity, transition: "0.3s" }}
    >
      <div className="w-5 h-5 border-2 border-[#53e685] rounded-full relative">
        <div className="w-0.5 h-3.5 bg-[#53e685] left-1/2 top-0 translate-x-1 -translate-y-0.5 absolute rotate-[35deg] z-10"></div>
        <div className="w-1.5 h-3.5 bg-[#d9f0e6] left-1/2 top-0.5 translate-x-[5px] -translate-y-[8px] absolute rotate-[35deg] z-0"></div>
        <div className="w-0.5 h-1.5 bg-[#53e685] left-1/2 top-1/2 -translate-x-[2px] -translate-y-1/2 absolute rotate-[125deg] z-0"></div>
      </div>
    </div>
  );
};
