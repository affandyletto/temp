// utils/navigation.js (optional)

import { useNavigate } from "react-router-dom";

export function useGoToDetailPage(basePath = "/projects") {
  const navigate = useNavigate();
  return (id) => {
    navigate(`${basePath}/${id}`);
  };
}
