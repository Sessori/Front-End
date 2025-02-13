import React from "react";

const ButtonEntrar = ({ onClick }) => {
  return (
    <button
      className="bg-[#23AAB2] text-white text-sm font-semibold py-2 px-6 rounded-md w-full hover:bg-[#1B8890] transition duration-200"
      onClick={onClick}
    >
      ENTRAR
    </button>
  );
};

export default ButtonEntrar;
