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
        : user && children}
    </>
  );
};

export default Guard;
