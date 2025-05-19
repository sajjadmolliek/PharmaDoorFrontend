import { Link, useNavigate } from "react-router-dom";

const SecondNavbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <select
                  className="select select-sm w-full mt-1"
                  defaultValue=""
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) navigate(`/medicines/${value}`);
                  }}
                >
                  <option disabled value="">
                    Medicines
                  </option>
                  <option value="napa">Napa</option>
                  <option value="seclo">Seclo</option>
                </select>
              </li>

              <li>
                <select
                  className="select select-sm w-full mt-1"
                  defaultValue=""
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) navigate(`/equipments/${value}`);
                  }}
                >
                  <option disabled value="">
                    Equipments
                  </option>
                  <option value="stethoscope">Stethoscope</option>
                  <option value="thermometer">Thermometer</option>
                </select>
              </li>
              <li>
                <Link to="/products/all-products">All-Products</Link>
              </li>
              <li>
                <Link to="/online-doctor">Online Doctor</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-3">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <select
                className="select select-sm"
                defaultValue=""
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) navigate(`/medicines/${value}`);
                }}
              >
                <option disabled value="">
                  Medicines
                </option>
                <option value="napa">Napa</option>
                <option value="seclo">Seclo</option>
              </select>
            </li>

            <li>
              <select
                className="select select-sm"
                defaultValue=""
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) navigate(`/equipments/${value}`);
                }}
              >
                <option disabled value="">
                  Equipments
                </option>
                <option value="stethoscope">Stethoscope</option>
                <option value="thermometer">Thermometer</option>
              </select>
            </li>
            <li>
              <Link to="/products/all-products">All-Products</Link>
            </li>
            <li>
              <Link to="/online-doctor">Online Doctor</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end"></div>
      </div>
    </div>
  );
};

export default SecondNavbar;
