import React from "react";
import { Link } from "react-router-dom";

import Header from "../../components/header";

import "./styles.css";

const LandingPage = () => {
  return (
    <>
      <Header title="Timeline" />

      <section>
        <h2>About</h2>
        <p>
          Timeline is a project about projects: It will display your project
          timeline on GitHub.
        </p>
        <div className="center">
          <Link to="/login" className="login">
            Login
          </Link>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
