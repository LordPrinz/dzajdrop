import { useEffect, useState } from "react";
import { IoCloseSharp, IoPause } from "react-icons/io5";
import SuccessIcon from "./SuccessIcon";
export default ({ progress }) => {
  const [isEndAnimation, setIsEndAnimation] = useState(false);
  const [text, setText] = useState("Uploading...");
  const [icon, setIcon] = useState(null);
  const [isIconVisible, setIsIconVisible] = useState(true);
  const fadeOutStyle = {
    transform: `translateY(${isEndAnimation ? 10 : 0}px)`,
    opacity: `${isEndAnimation ? 0 : 1}`,
    transitionDuration: "0.3s",
    transitionDelay: "0.4s",
  };

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsEndAnimation(true);
      }, 50);

      setTimeout(() => {
        setText("Completed");
        setIcon(<SuccessIcon />);
        setIsIconVisible(false);
      }, 460);
    }
  }, [progress]);

  return (
    <li className="file">
      <div
        className="absolute top-0 -left-full w-full h-full bg-main-lighterGrey -z-10 transition"
        style={{
          transform: `translateX(${progress}%)`,
        }}
      ></div>
      <div className="flex justify-between items-center relative overflow-hidden pb-3">
        <div>
          <div
            className="text-sm mb-1 font-bold"
            style={{
              transform: `translateY(${isEndAnimation ? 17 : 0}px)`,
              transitionDuration: "0.3s",
              transitionDelay: "0.4s",
              fontSize: isEndAnimation ? "16px" : "",
            }}
          >
            {text}
          </div>
          <div
            className="text-xs font-normal text-main-grey"
            style={fadeOutStyle}
          >
            {progress}% &#183; 4 seconds left
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isIconVisible ? (
            <div
              className="bg-[#eaeff5] rounded-full p-2 text-[#869aaf]"
              style={fadeOutStyle}
            >
              <IoPause />
            </div>
          ) : (
            ""
          )}
          {isIconVisible ? (
            <div
              className="bg-[#f8e4ea] rounded-full p-2 text-[#fd274a] "
              style={fadeOutStyle}
            >
              <IoCloseSharp />
            </div>
          ) : (
            ""
          )}
          {icon}
        </div>
        <div
          className="absolute bg-main-blue w-full bottom-1 -left-[110%] h-0.5 transition"
          style={{
            transform: `translateX(${
              isEndAnimation
                ? "210"
                : progress < 30
                ? progress * 1.1
                : progress * 1.1
            }%)`,
            transitionDuration: "0.4s",
          }}
        ></div>
      </div>
    </li>
  );
};
