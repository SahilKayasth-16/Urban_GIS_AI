import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Please login</p>;
  } 

  if (user.role === "admin") {
    return ;
  } 
  
  return ;
};

export default Dashboard;