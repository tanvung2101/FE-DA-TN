import React from "react";
import Helmet from "react-helmet";
import logo from '../../images/logo.png'

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <link rel="icon" href={logo} />
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;