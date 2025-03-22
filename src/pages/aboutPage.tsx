import React from "react";

const AboutPage: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">About</h1>
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
        to provide weather information. The application is built using React,
        TypeScript, and Tailwind CSS. This project was created for fun as a
        learning exercise.
      </p>

      <div className="justify-center items-center mt-16">
        <div className="card w-full max-w-sm bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Technologies Used</h2>
            <ul className="list-disc pl-5">
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
