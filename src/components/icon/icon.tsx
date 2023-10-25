import styles from "./icon.module.css";

export enum IconType {
  ExternalLink = "external-link",
  Video = "video-thumbnail",
  Mail = "mail",
}

const sizeOverrides = {
  [IconType.Mail.toString()]: [1024, 1024],
};

export type IconProps = {
  type: IconType;
  className?: string;
  onClick?: any;
};

export function Icon({ type, className, ...rest }: IconProps) {
  if (className) {
    className += ` ${styles.icon}`;
  } else {
    className = styles.icon;
  }

  let size = "48 48";
  if (type in sizeOverrides) {
    size = `${sizeOverrides[type].join(" ")}`;
  }

  return (
    <svg
      {...rest}
      className={className}
      viewBox={`0 0 ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href={`image/icons.svg#${type}`} />
    </svg>
  );
}
