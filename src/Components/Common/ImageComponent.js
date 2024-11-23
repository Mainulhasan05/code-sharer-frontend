"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./ImageComponent.module.css"; // Adjust path if needed

const ImageComponent = ({
  src = "/assets/logo.png",
  alt = "default image",
  width = 300,
  height = 300,
  className = "max-w-full h-auto",
  ...props
}) => {
  const [error, setError] = useState(false);

  return (
    <Image
      src={error ? "/assets/images/default-image.png" : src}
      alt={alt}
      width={width}
      height={height}
      className={`${styles.customImage} ${className}`}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default ImageComponent;
