import Button from "@mui/material/Button";
import { useLogout } from "../../hooks/useLogout";
import { onLogout } from "../../utils/logout";
import router from "../Routes";

const Settings = () => {
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
    router.navigate("/");
    window.location.reload();

    //onLogout();
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Settings;
