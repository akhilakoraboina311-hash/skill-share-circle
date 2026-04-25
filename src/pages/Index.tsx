import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "@/lib/auth";

const Index = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const u = getUser();
    if (!u) navigate("/login", { replace: true });
    else if (!u.role) navigate("/role", { replace: true });
    else navigate(u.role === "student" ? "/dashboard" : "/professor", { replace: true });
  }, [navigate]);
  return null;
};

export default Index;
