import React from 'react';
import { NavLink } from 'react-router-dom';

const ModelImage = ({ url, src, alt }) => (
  <div className="model-list-item--image-container">
    <NavLink to={url}>
      <img
        className="model-list-image img-responsive"
        src={src}
        alt={alt}
      />
    </NavLink>
  </div>
);

export default ModelImage;
