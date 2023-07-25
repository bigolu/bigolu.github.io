import Image from 'next/image';

export type Image = {
  url: string,
  width: number,
  height: number
};

// TODO: The right type is both or light and dark, this way I don't have to assert that.
export type ImageProps = {
  both?: Image,
  light?: Image,
  dark?: Image,
  alt: string,
};

function getMetadata(image: Image) {
  if (image.width && image.height) {
    return {width: image.width, height: image.height};
  } else {
    throw new Error("Invalid image metadata");
  }
}

export function ImageComponent({both, light, dark, alt, ...props}: ImageProps & any) {
  if (both) {
    return <picture {...props}>
      <Image src={both.url} alt={alt} {...getMetadata(both)}/>
    </picture>
  }
  else if (light && dark) {
    return <picture {...props}>
      <source media="(prefers-color-scheme: dark)" srcSet={dark.url} {...getMetadata(dark)} />
      <Image src={light.url} alt={alt} {...getMetadata(light)}/>
    </picture>;
  }
  else {
    throw new Error("Invalid image type");
  }
}
