const HeaderComponent: React.FC = () => {
  return (
    <>
      <ul className="menu menu-horizontal bg-base-200 justify-center w-full">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/weather">Weather</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </>
  );
};

export default HeaderComponent;
