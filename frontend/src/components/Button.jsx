import React from "react";
import { Link } from "react-router-dom";

const Button = ({ class_name, content, action, path }) => {
  return (
    <Link to={path} onClick={action} className={class_name}>
      {content}
    </Link>
  );
};

export default Button;
