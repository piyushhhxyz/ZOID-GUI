// import React from 'react';

// export default function Display() {
//   const getImageFiles1 = require.context('../../public/Assets1', false, /\.(jpg|jpeg|png|gif)$/);
//   const getImageFiles2 = require.context('../../public/Assets2', false, /\.(jpg|jpeg|png|gif)$/);
//   const getImageFiles3 = require.context('../../public/Assets3', false, /\.(jpg|jpeg|png|gif)$/);
//   const getImageFiles4 = require.context('../../public/Assets4', false, /\.(jpg|jpeg|png|gif)$/);
//   const getImageFiles5 = require.context('../../public/Assets5', false, /\.(jpg|jpeg|png|gif)$/);

//   const parseImageName = (imageName) => {
//     const parts = imageName.split('_');
//     if (parts.length >= 3) {
//       return {
//         folderName: parts[0],
//         imageName: parts[1],
//         date: parts[2].split('.')[0],
//       };
//     } else {
//       return {
//         folderName: 'Unknown',
//         imageName: 'Unknown',
//         date: 'Unknown',
//       };
//     }
//   };

//   const renderImageBox = (image, index) => {
//     const metadata = parseImageName(image.name);

//     return (
//       <div className="image-container">
//           <div key={index} className="image-item">
//             <div className="image-box">
//               <img src={image.src} alt={image.name} />
//               <div className="image-metadata">
//                 <div>TIMESTAMPS : {metadata.date}</div>
//                 <div>Name:{metadata.imageName}</div>
//               </div>
//             </div>
//           </div>
//       </div>
//     );
//   };

//   const images1 = getImageFiles1.keys().map((fileName) => ({
//     name: fileName.replace('./', ''),
//     src: `/Assets1/${fileName}`,
//   })).reverse(); 

//   const images2 = getImageFiles2.keys().map((fileName) => ({
//     name: fileName.replace('./', ''),
//     src: `/Assets2/${fileName}`,
//   })).reverse();

//   const images3 = getImageFiles3.keys().map((fileName) => ({
//     name: fileName.replace('./', ''),
//     src: `/Assets3/${fileName}`,
//   })).reverse(); 

//   const images4 = getImageFiles4.keys().map((fileName) => ({
//     name: fileName.replace('./', ''),
//     src: `/Assets4/${fileName}`,
//   })).reverse(); 

//   const images5 = getImageFiles5.keys().map((fileName) => ({
//     name: fileName.replace('./', ''),
//     src: `/Assets5/${fileName}`,
//   })).reverse();

//   return (
//     <div className="container">
//       <div className="headings">
//         <div>cam1</div>
//         <div>cam2</div>
//         <div>cam3</div>
//         <div>cam4</div>
//         <div>cam5</div>
//       </div>
//       <div className="columns">
//         <div className="column">
//           {images1.map((image, index) => renderImageBox(image, index))}
//         </div>

//         <div className="column">
//           {images2.map((image, index) => renderImageBox(image, index))}
//         </div>

//         <div className="column">
//           {images3.map((image, index) => renderImageBox(image, index))}
//         </div>

//         <div className="column">
//           {images4.map((image, index) => renderImageBox(image, index))}
//         </div>

//         <div className="column">
//           {images5.map((image, index) => renderImageBox(image, index))}
//         </div>
//       </div>
//     </div>
//   );
// }
                


                                            // FUNCTIONALITIESS


import React, { useState } from 'react';

export default function Display() {
  const getImageFiles1 = require.context('../../public/Assets1', false, /\.(jpg|jpeg|png|gif)$/);
  const getImageFiles2 = require.context('../../public/Assets2', false, /\.(jpg|jpeg|png|gif)$/);
  const getImageFiles3 = require.context('../../public/Assets3', false, /\.(jpg|jpeg|png|gif)$/);
  const getImageFiles4 = require.context('../../public/Assets4', false, /\.(jpg|jpeg|png|gif)$/);
  const getImageFiles5 = require.context('../../public/Assets5', false, /\.(jpg|jpeg|png|gif)$/);

  const parseImageName = (imageName) => {
    const parts = imageName.split('_');
    if (parts.length >= 3) {
      return {
        folderName: parts[0],
        imageName: parts[1],
        date: parts[2].split('.')[0],
      };
    } else {
      return {
        folderName: 'Unknown',
        imageName: 'Unknown',
        date: 'Unknown',
      };
    }
  };

  const renderImageBox = (image, index) => {
    const metadata = parseImageName(image.name);
    return (
      <div className="image-container" key={index}>
        <div className="image-item" onClick={() => openFullscreen(image, metadata.folderName)}>
          <div className="image-box">
            <img src={image.src} alt={image.name} />
            <div className="image-metadata">
              <div>TIMESTAMPS: {metadata.date}</div>
              <div>Name: {metadata.imageName}</div>
              {/* <div>Name: {metadata.folderName}</div> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const images1 = getImageFiles1.keys().map((fileName) => ({
    name: fileName.replace('./', ''),
    src: `/Assets1/${fileName}`,
  })).reverse(); 

  const images2 = getImageFiles2.keys().map((fileName) => ({
    name: fileName.replace('./', ''),
    src: `/Assets2/${fileName}`,
  })).reverse();

  const images3 = getImageFiles3.keys().map((fileName) => ({
    name: fileName.replace('./', ''),
    src: `/Assets3/${fileName}`,
  })).reverse(); 

  const images4 = getImageFiles4.keys().map((fileName) => ({
    name: fileName.replace('./', ''),
    src: `/Assets4/${fileName}`,
  })).reverse(); 

  const images5 = getImageFiles5.keys().map((fileName) => ({
    name: fileName.replace('./', ''),
    src: `/Assets5/${fileName}`,
  })).reverse();


  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const navigateImageWithArrowKeys = (event) => {
    if (selectedImage && selectedFolder) {
      if (event.key === 'ArrowLeft') {
        navigateImage(-1); // Previous image
      } else if (event.key === 'ArrowRight') {
        navigateImage(1); // Next image
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', navigateImageWithArrowKeys);
    return () => {
      window.removeEventListener('keydown', navigateImageWithArrowKeys);
    };
  }, [selectedImage, selectedFolder]);

  const openFullscreen = (image, folderName) => {
    setSelectedImage(image);
    setSelectedFolder(folderName);
  };


  const closeFullscreen = () => {
    setSelectedImage(null);
    setSelectedFolder(null);
  };


  const navigateImage = (direction) => {
    if (selectedImage && selectedFolder) {
      let imageList = [];

      switch (selectedFolder) {
        case 'folder1':
          imageList = images1;
          break;
        case 'folder2':
          imageList = images2;
          break;
        case 'folder3':
          imageList = images3;
          break;
        case 'folder4':
          imageList = images4;
          break;
        case 'folder5':
          imageList = images5;
          break;
        default:
          break;
      }

      const currentIndex = imageList.findIndex((image) => image.name === selectedImage.name);
      console.log(currentIndex)
  
      if (currentIndex !== -1) {
        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = imageList.length - 1;
        else if (newIndex >= imageList.length) newIndex = 0;
  
        const newImage = imageList[newIndex];
        setSelectedImage(newImage);
      }
    }
  };
  


  return (
    <div className="container">
      <div className="headings">
        <div>cam1</div>
        <div>cam2</div>
        <div>cam3</div>
        <div>cam4</div>
        <div>cam5</div>
      </div>
      <div className="columns">
        <div className="column">
          {images1.map((image, index) => renderImageBox(image, index))}
        </div>

        <div className="column">
          {images2.map((image, index) => renderImageBox(image, index))}
        </div>

        <div className="column">
          {images3.map((image, index) => renderImageBox(image, index))}
        </div>

        <div className="column">
          {images4.map((image, index) => renderImageBox(image, index))}
        </div>

        <div className="column">
          {images5.map((image, index) => renderImageBox(image, index))}
        </div>
      </div>
      {selectedImage && (
  <div className="fullscreen">
    <div className="fullscreen-image">
      <img src={selectedImage.src} alt={selectedImage.name} />
      <div className="fullimage-metadata">
        <div>TIMESTAMPS: {parseImageName(selectedImage.name).date}</div>
        <div>Name: {parseImageName(selectedImage.name).imageName}</div>
        <div>Folder: {parseImageName(selectedImage.name).folderName}</div>
      </div>
    </div>
    <div className="fullscreen-controls">
      <button onClick={() => navigateImage(-1)}>Previous</button>
      <button onClick={() => navigateImage(1)}>Next</button>
      <button onClick={closeFullscreen}>Close</button>
    </div>
  </div>
)}
    </div>
  );
}
