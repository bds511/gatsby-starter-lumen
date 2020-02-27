// @flow strict
import React from "react";
import Author from "./Author";
import Contacts from "./Contacts";
import Copyright from "./Copyright";
import Menu from "./Menu";
import styles from "./Sidebar.module.scss";
import { useSiteMetadata } from "../../hooks";
import Search from "../Algolia";

type Props = {
  isIndex?: boolean,
  open?: boolean
};

const searchIndices = [
  // { name: `Pages`, title: `Pages`, hitComp: `PageHit` },
  { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` }
];
const Sidebar = ({ isIndex, open }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();

  return (
    <div className={styles["sidebar"]}>
      <div className={styles["sidebar__inner"]}>
        <Author author={author} isIndex={isIndex} />
        <Search collapse indices={searchIndices} />
        <Menu menu={menu} open={open} />
        <Contacts contacts={author.contacts} />
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
};

export default Sidebar;
