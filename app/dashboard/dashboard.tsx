import { useNavigate } from "react-router";

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`; 
};

export function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteCookie("authToken");
    navigate("/");
  };

  return (
    <div>
      <button type="button" onClick={handleLogout}>
        Déconnexion
      </button>
      <div>Dashboard</div>
    </div>
  );
}
