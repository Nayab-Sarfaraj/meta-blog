import React from "react";

const DropDownInput = ({ data, setProfession, defaultVal }) => {
  const handleChange = (profession) => {
    setProfession(profession);
  };
  return (
    <select
      name="cars"
      id="cars"
      className="w-full dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA]"
      defaultVal={defaultVal}
      onChange={(e) => handleChange(e.target.value)}
    >
      {Object.values(data).map((item) => (
        <option
          value={item}
          className=" hover:bg-[#4B6BFB]"
          selected={item === defaultVal ? true : false}
        >
          {" "}
          {item}
        </option>
      ))}
    </select>
  );
};

export default DropDownInput;
