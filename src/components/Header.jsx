import { Link } from "react-router-dom";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { setCurrency } from "../reduxStore/currencySlice";

const Header = () => {
  const dispatch = useDispatch();

  const currencyOptions = [
    { value: "inr", label: "INR" },
    { value: "usd", label: "USD" },
  ];

  const handleCurrencyChange = (selectedOption) => {
    dispatch(setCurrency(selectedOption.value));
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#1e1e1e", // dropdown bg
      borderColor: "#555", // border color
      color: "#fff", // text color
      boxShadow: "none",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#00BFFF", // selected text color
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#1e1e1e",
      color: "#fff",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#2d2d2d" : "#1e1e1e",
      color: state.isSelected ? "#00BFFF" : "#fff",
      cursor: "pointer",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#00BFFF",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <header className="bg-[#14161a] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-y-3">
        {/* Logo & Select Dropdown */}
        <div className="flex items-center justify-between w-full">
          <Link
            to="/"
            className="text-sky-400 text-2xl sm:text-3xl font-bold tracking-wide"
          >
            Crypto360.
          </Link>

          <div className="w-28 sm:w-36">
            <Select
              options={currencyOptions}
              defaultValue={currencyOptions[0]}
              onChange={handleCurrencyChange}
              styles={customStyles}
              isSearchable={false}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
