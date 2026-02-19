import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This page is deprecated - redirect to home
const VideoPersonalizado = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
};

export default VideoPersonalizado;
