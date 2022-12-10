import React, { useMemo, useState } from "react";
import classNames from "classnames";
import CollapseBtn from "./icons/CollapseBtn";
import Logo from "./icons/Logo";
import HomeIcon from "./icons/HomeIcon";
import DataIcon from "./icons/DataIcon";
import AirtimeIcon from "./icons/AirtimeIcon";
import FundWalletIcon from "./icons/FundWalletIcon";
import Airtime2Cash from "./icons/Airtime2Cash";
import LogoutIcon from "./icons/LogoutIcon";
import ProfileIcon from "./icons/ProfileIcon";
import { useRouter } from "next/router";
import { removeUserSession } from "../Utils/Common";
import Link from "next/link";

// Using array for nav items
const menuItems = [
  { id: 1, label: "Dashboard", icon: HomeIcon, link: "/dashboard" },
  { id: 2, label: "Buy Data", icon: DataIcon, link: "/buyData" },
  { id: 3, label: "Buy Airtime", icon: AirtimeIcon, link: "/buyAirtime" },
  { id: 4, label: "Fund Wallet", icon: FundWalletIcon, link: "/fundWallet" },
  {
    id: 5,
    label: "Airtime to Cash",
    icon: Airtime2Cash,
    link: "/airtime-cash",
  },
  {
    id: 6,
    label: "Profile",
    icon: ProfileIcon,
    link: "/profile",
  },
];

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();

  const wrapperClasses = classNames(
    " h-screen xl:w-10 text-slate-800 bg-white px-4 pt-3 flex flex-col text-text ",
    {
      ["w-20 color-slate-20"]: !toggle,
      ["w-15 bg-secondary"]: toggle,
    }
  );

  const logoutHandler = () => {
    removeUserSession();
    router.push("/login");
  };

  const collapseBtnClasses = classNames(
    "rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": !toggle,
    }
  );

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSideBarToggle = () => {
    setToggle(!toggle);
  };

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center py-4 px-3 h-full cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: menu.id === activeMenu.id,
      }
    );
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-beizer(0.2, 0, 0, 1) 9s" }}
    >
      <div className="flex flex-col">
        {/* Logo Container */}
        <div className="flex item-center justify-between relative">
          <div className="flex items-center pl-1 gap-4 ">
            <Logo />
            <span
              className={classNames("mt-1 text-sm font-medium text-text", {
                hidden: !toggle,
              })}
            >
              Logo
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseBtnClasses}
              onClick={handleSideBarToggle}
            >
              <CollapseBtn />
            </button>
          )}
        </div>

        {/* SideBar Content container */}
        <div className="flex flex-col w-full items-start mt-10">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={menu.id} className={classes}>
                <Link href={menu.link}>
                  <a
                    className={classNames(
                      "text-md flex font-medium text-text-light"
                    )}
                  >
                    <div style={{ width: "2.5rem" }}>
                      <Icon />
                    </div>
                    <span
                      className={classNames(
                        "text-md font-medium text-text-light"
                      )}
                    >
                      {menu.label}
                    </span>
                    {/* {toggle && <Icon />} */}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {/* `${getNavItemClasses({})} px-4 py-3` */}

      {/* Logout Container */}
      <button
        onClick={logoutHandler}
        className={
          "flex items-center py-4 px-3 cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap"
        }
      >
        {toggle && (
          <a className={classNames("flex gap-5 text-md font-medium text-text-light")}>
            <span>
              <LogoutIcon />
            </span>
            Logout
          </a>
        )}
        {!toggle && <LogoutIcon />}
      </button>
    </div>
  );
};

export default Sidebar;
