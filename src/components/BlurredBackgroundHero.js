import React, { useEffect, useState } from 'react'

function BlurredBackgroundHero() {
    const NUM_OF_PHOTOS = 47; // indicies 0-46
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {
            setImageIndex((imageIndex) => {
                let nextIndex = imageIndex + 1;
                if (nextIndex >= NUM_OF_PHOTOS) {
                    nextIndex = 0;
                }
                return nextIndex
            });
        }, 30000)

        return () => clearInterval(interval);

    },[]);

    let backgroundImage = `url(./images/photos/${imageIndex}.jpg)`;
    const heroStyle = {
      "backgroundImage": backgroundImage,
      "backgroundSize": "cover",
      "backgroundPosition": "center",
      "height": "100%",
      "width": "100%",
      "position":"absolute",
      "opacity": 0.75,
      "top": 0,
      "left":0,
      "zIndex": -2,
      "transition": "background-image 1s ease-in-out",
  
      "filter": "blur(2px)",
      "WebkitFilter": "blur(2px)",
      "WebkitBackfaceVisibility": "hidden"
    };

    return <div style={heroStyle}></div>
}

export default BlurredBackgroundHero;