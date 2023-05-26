import React from "react";

import { TailSpin } from "react-loader-spinner";

const Spinner = () => {
  return (
    <TailSpin
      height="100"
      width="100"
      color="#1976D2"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{ justifyContent: "center" }}
      visible={true}
    />
  );
};

export default Spinner;
