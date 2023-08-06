import styles from './icon.module.css';

export enum IconType {
  ExternalLink = 'external-link',
  Video = 'video-thumbnail',
};

export type IconProps = {
  type: IconType,
}

export function Icon({type, ...props}: IconProps & any) {
  if ('className' in props) {
    props.className += ` ${styles.icon}`;
  } else {
    props.className = styles.icon;
  }

  return (
    <svg {...props} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <use href={`image/icons.svg#${type}`}/>
    </svg>
  );
}