import React from "react";
import FilterComponent from "./FilterComponent/FilterComponent";
import Navbar from "./Navbar/Navbar";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <header>
        <div className="wave-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1938"
            height="471.408"
            /*viewBox="9 9 1920 471.408"*/
            viewBox= "9 9 1920 471.408"
            preserveAspectRatio="none"
            className="wave"
          >
            <defs>
              <linearGradient
                id="linear-gradient"
                y1="-0.205"
                x2="1"
                y2="0.774"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0" stop-color="#bd5075" />
                <stop offset="1" stop-color="#fd9b6c" />
              </linearGradient>
              <filter
                id="wave_2_"
                x="0"
                y="0"
                width="1938"
                height="471.408"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" input="SourceAlpha" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood flood-opacity="0.161" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#wave_2_)">
              <path
                id="wave_2_2"
                data-name="wave (2)"
                d="M0,150.975l106.667,25.163c106.667,25.163,320,88.111,533.333,88.111s426.667-34.839,640-26.5c213.333,8.964,426.667,46.906,533.333,81.033L1920,352.275V-101.133H0Z"
                transform="translate(9 107.13)"
                fill="url(#linear-gradient)"
              />
            </g>
          </svg>
        </div>
        <div className="header-component">
          <Navbar />
          <FilterComponent />
        </div>
      </header>
    </div>
  );
}

export default Header;
