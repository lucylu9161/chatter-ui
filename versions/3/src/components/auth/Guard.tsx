// import excludedRoutes from "../../constants/excluded-routes";
// import { useGetMe } from "../../hooks/useGetMe";

// interface GuardProps {
//   children: JSX.Element;
// }

// const Guard = ({ children }: GuardProps) => {
//   const { data: user } = useGetMe();

//   return (
//     <>
//       {excludedRoutes.includes(window.location.pathname)
//         ? children
//         : user && children}
//     </>
//   );
// };

// export default Guard;

import excludedRoutes from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import { useEffect } from "react";
import router from "../Routes";

interface GuardProps {
  children: JSX.Element;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user } = useGetMe();

  useEffect(() => {
    if (!user && window.location.pathname === "/") {
      router.navigate("/login"); // Redirect to login if not authorized and on root
    }
  }, [user]);

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : window.location.pathname === "/" && !user
        ? // This part is handled in useEffect, so you can just return null or children
          null
        : user && children}
    </>
  );
};

export default Guard;
