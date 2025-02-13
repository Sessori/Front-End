import React from "react";

const ButtonSalvar = ({ onClick }) => {
  return (
    <button
      className="bg-[#6FA57F] text-white text-lg font-semibold py-2 px-6 rounded-md w-full hover:bg-[#5B8D6A] transition duration-200"
      onClick={onClick}
    >
      SALVAR
    </button>
  );
};

export default ButtonSalvar;
