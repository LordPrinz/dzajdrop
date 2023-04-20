import { useEffect, useState } from "react";
import LinkCopier from "../Copier";

export default ({ link }) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => (dots + 1) % 4);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <li className="file2 bg-main-lighterGrey ">
      {!link ? (
        <div className="py-6 px-5 tablet:py-3 tablet:px-3 tablet:text-xs">
          Generating link{Array.from({ length: dots }).map((_, i) => ".")}
        </div>
      ) : (
        <div>
          <LinkCopier url={link} />
        </div>
      )}
    </li>
  );
};
