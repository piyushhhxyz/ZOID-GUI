import React, { useState, useEffect } from 'react';
import './speed_test.css';

function Display() {
  const getImageFiles = require.context('../../public/Assets1', false, /\.(jpg|jpeg|png|gif)$/);

  const images = getImageFiles.keys().map((fileName) => ({
    name: fileName.replace('./', ''),
    src: `/Assets1/${fileName}`,
  }));

  return (
    <div className="container">
      <h1>Images Will Be Displayed Here</h1>
      <div className="image-container">
        {images.map((image, index) => (
          <div key={index}>
            <div>
              <img src={image.src} alt={image.name} />
              <div>
                <strong>{image.name}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Display;
