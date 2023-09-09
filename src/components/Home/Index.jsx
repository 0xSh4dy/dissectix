import React from "react";
import "./Home.css"; // Import your CSS file

export default function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <h1 className="title">Welcome to Dissectix</h1>
        <p className="subtitle">
          Your Journey into the Art of Reverse Engineering
        </p>
      </header>
      <main className="main-content">
        <p className="description">
          Dissectix is a reverse engineering platform inspired by{" "}
          <a
            href="https://decompetition.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Decompetition
          </a>
          , with a mission to empower everyone to master the art of reverse
          engineering.
        </p>
        <p className="upcoming-features">
          Our upcoming versions will include a powerful static analyzer and
          symbolic execution engine for efficient reverse engineering and binary
          analysis. Currently, Dissectix supports three programming languages:
          C, C++, and Rust.
        </p>
      </main>
    </div>
  );
}
