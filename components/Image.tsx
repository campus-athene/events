import NextImage from "next/image";
import { CSSProperties } from "react";

const Image = (props: {
  src: string;
  width: number;
  alt?: string;
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <img
      src={`/api/image/${props.width}/${props.src}`}
      className={props.className}
      style={props.style}
      alt={props.alt}
    />
  );
};

export default Image;
