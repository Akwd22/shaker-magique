import React, { useEffect } from "react";
import axiosInstance from "../../Axios/Axios";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const history = useHistory();

  useEffect(() => {
    const response = axiosInstance.post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    history.push("/");
  });
  return <div>Logout</div>;
}
