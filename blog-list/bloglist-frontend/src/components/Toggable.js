import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Toggable = ({ children, label }) => {
  const [visible, setVisible] = useState(false);

  const showIfVisible = { display: visible ? '' : 'none' };
  const showIfNotVisible = { display: visible ? 'none' : '' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={showIfNotVisible}>
        <button onClick={toggleVisibility}>{label}</button>
      </div>
      <div style={showIfVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

Toggable.propTypes = {
  label: PropTypes.string.isRequired,
};

Toggable.displayName = 'Toggable';

export default Toggable;