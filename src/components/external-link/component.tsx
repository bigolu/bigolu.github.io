import { Icon, IconType } from "components/icon/icon";
import styles from "./component.module.css";

export function ExternalLink({ children, ...props }: any) {
  return (
    <a {...props} target="_blank">
      {children}
      <Icon
        type={IconType.ExternalLink}
        className={styles["external-link-icon"]}
      />
    </a>
  );
}
