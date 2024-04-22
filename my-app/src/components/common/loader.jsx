import React from "react";

import "../../styles/common/loader.css";

const Loader = ({ width, borderWidth }) => {
    return (
        <div className="loader" style={{ width: width, height: width, borderWidth: borderWidth }}></div>
    );
};

export default Loader;
