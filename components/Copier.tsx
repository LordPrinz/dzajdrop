import { FC, useCallback, useState } from "react";
import { AiOutlineCheck, AiOutlineCopy } from "react-icons/ai";
import copy from "../utils/copy";

type Props = {
  url: string;
};

const LinkCopier: FC<Props> = ({ url }) => {
  const [isClicked, setIsClicked] = useState(false);

  const copyHandler = useCallback(async () => {
    setIsClicked(true);
    await copy(`${window.location.href.replace("www.", "")}${url}`);
  }, []);

  const icon = isClicked ? (
    <AiOutlineCheck
      className={`notification-icon text-[#45b36a] hover:text-[#3d9c5d]`}
      onClick={copyHandler}
    />
  ) : (
    <AiOutlineCopy className={`notification-icon `} onClick={copyHandler} />
  );

  const link = `${window.location.href.replace("www.", "")}${url}`;

  return (
    <div className={`notification cursor-pointer`} onClick={copyHandler}>
      <div className="notification-link">{link}</div>
      {icon}
    </div>
  );
};

export default LinkCopier;
