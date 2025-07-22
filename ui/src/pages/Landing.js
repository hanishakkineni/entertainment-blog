/* eslint-disable jsx-a11y/no-distracting-elements */
import React from "react";
import "../styles/landing.css";
import Logo from "../assets/logo.png";
import Land from "../assets/land.jpg";

function Landing() {

  return (
    <>
      <div className="header-container-l">
        <div className="logo-container">
          <img src={Logo} alt="logo" />
        </div>
        <div className="links-container">
            <a href="/about" className="about">
                About Us
            </a>
          <a href="/login" className="login">
            Sign In
          </a>
          <a href="/register" className="register" style={{ color: "white", backgroundColor: "black" }}>
            Get Started
          </a>
        </div>
      </div>
      <div className="hero">
        <div className="text-container">
            <marquee behavior="scroll" direction="left" scrollamount="10">
                <h5> Music • Movies • TV Shows • Reviews • Pop Culture • Books </h5>
            </marquee>
            <h1>Entertainment<br /> just got interesting..</h1>
            <br />
            <h3>Write, Share & Connect with the world</h3>
            <br />
            <a href="/register" className="register">
                Start Writing
            </a>
            <br /> <br />  <br />
            <marquee behavior="scroll" direction="right" scrollamount="10">
    <h5> Celebrity News • Streaming • Festivals • Concerts • Interviews • Drama </h5>
</marquee>

        </div>
        <div className="image-container">
            <img src={Land} alt="entertainment" />
        </div>
       
      </div>
    </>
  );
}

export default Landing;
