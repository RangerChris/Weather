import "./App.css";
import Footer from "./components/page/footerComponent";

function App() {
  return (
    <>
      <div data-theme="nord">
        <div className="hero bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Weather app</h1>
              <p className="py-6">
                Welcome to the simple weather app. Like so many other similar
                applications, you can enter a city and get the weather data for
                the area.
              </p>
              <fieldset>
                <input type="text" className="input" placeholder="City name" />
                <button className="btn btn-primary ml-4">Go</button>
              </fieldset>
            </div>
          </div>
        </div>
        <br />
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
