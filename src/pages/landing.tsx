import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/header";

const LandingPage = () => {
  return (
    <>
      <Header title="Timeline" />
      <Link to="/login">Login</Link>
    </>
  );
};

export default LandingPage;
