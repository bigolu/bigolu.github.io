import Image from 'next/image';

export type Image = {
  url: string,
  type: string,
  width?: number,
  height?: number
};

// TODO: The right type is both or light and dark, this way I don't have to assert that.
export type ImageProps = {
  both?: Image,
  light?: Image,
  dark?: Image,
  alt: string
};

function getMetadata(image: Image) {
  if (image.type === "svg") {
    return {fill: true};
  } else if (image.width && image.height) {
    return {width: image.width, height: image.height};
  } else {
    throw new Error("Invalid image metadata");
  }
}

export function ImageComponent(props: ImageProps) {
  if (props.both) {
    return <Image src={props.both.url} alt={props.alt} {...getMetadata(props.both)} />;
  }
  else if (props.light && props.dark) {
    return <picture>
      <source media="(prefers-color-scheme: dark)" srcSet={props.dark.url} {...getMetadata(props.dark)} />
      <Image src={props.light.url} alt={props.alt} {...getMetadata(props.light)} />
    </picture>;
  }
  else {
    throw new Error("Invalid image type");
  }
}
