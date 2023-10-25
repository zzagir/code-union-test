import { Link } from "react-router-dom";
import styles from "./LeftSide.module.scss";
import { menu } from "./menu.data";
import cn from "clsx";
import { useState } from "react";
import { SlMenu } from "react-icons/sl";
import { useClickAway } from "@uidotdev/usehooks";
import profile from "../../../assets/icons/profile.png";
import logo from "../../../assets/icons/logo.png";

const LeftSide = () => {
  const [isActive, setIsActive] = useState(false);

  const ref = useClickAway(() => {
    setIsActive(false);
  });

  const handleMenuClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      ref={ref}
      className={cn(styles.leftside, {
        [styles.leftsideActive]: isActive,
      })}
    >
      <div className={styles.sticky}>
        <button
          onClick={handleMenuClick}
          className={cn(styles.activeButton, {
            [styles.isActiveButton]: isActive,
          })}
        >
          <SlMenu fontSize={24} />
        </button>

        <Link to={"/"} className={styles.logo}>
          <img src={logo} alt="logo" />
        </Link>

        <Link to={"/"} className={styles.profile}>
          <img src={profile} alt="logo" />
          {isActive && (
            <div className={styles.logoText}>
              <span>Артем Иванов</span>
              <span>Собственник</span>
            </div>
          )}
        </Link>

        {menu.map((el) => (
          <Link key={el.icon} className={styles.nav}>
            <img src={el.icon} alt={el.icon} />
            {isActive && <div>{el.name}</div>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSide;
