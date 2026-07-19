import { mainNavigation } from "./navigation.config";
import { NavigationLink } from "./NavigationLink";

import styles from "./Navbar.module.css";

export function DesktopNavigation() {
  return (
    <ul className={styles.navList}>
      {mainNavigation.map((item) => (
        <li key={item.href}>
          <NavigationLink href={item.href} label={item.label} />
        </li>
      ))}
    </ul>
  );
}
