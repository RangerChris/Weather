import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/page/footerComponent";
import MainPage from "./pages/mainPage";
import CustomWeatherPage from "./pages/customWeather";
import HeaderComponent from "./components/page/headerComponent";
import AboutPage from "./pages/aboutPage";

function App() {
  return (
    <>
      <div data-theme="nord">
        <HeaderComponent></HeaderComponent>
        <Routes>
          <Route path="/" element={<MainPage></MainPage>} />
          <Route
            path="/weather/:city"
            element={<CustomWeatherPage></CustomWeatherPage>}
          />
          <Route
            path="/weather"
            element={<CustomWeatherPage></CustomWeatherPage>}
          />
          <Route path="/about" element={<AboutPage></AboutPage>} />
        </Routes>
        <br />
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
