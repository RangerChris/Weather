import React from "react";

const AboutPage: React.FC = () => {
  return (
    <>
      <div className="hero bg-base-200 w-6/12 mx-auto">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">About</h1>
            <p className="py-6">
              This is a test application that uses data from{" "}
              <a
                href="https://www.weatherapi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                WeatherAPI
              </a>{" "}
              to provide weather information.
            </p>
            <p>This project was created for fun as a learning exercise.</p>
            <p></p>
            <p className="py-6">Technologies Used:</p>
            <ul>
              <li>React</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>DaisyUI</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
