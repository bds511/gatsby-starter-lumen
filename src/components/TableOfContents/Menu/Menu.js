// @flow strict
import React, { useState } from "react";
import { Link } from "gatsby";
import styles from "./Menu.module.scss";
import kebabCase from "lodash/kebabCase";
import { useCategoriesList } from "../../../hooks";
import Scrollspy from "react-scrollspy";
import styled from "styled-components";
type Props = {
  menu: string
};

const NavItem = styled.div`
  margin: 0 0.75em;
  a {
    text-decoration: none;
    opacity: 1;
  }
  &.active {
    a {
      color:black;
      font-weight:bold;
      opacity: 1;
    }
  }
`;

const Menu = ({ menu }: Props) => {
  const strippedMenu = menu.replace(`<ul>`, "").replace(`</ul>`, "");
  const rawItems = strippedMenu.match(/"#.*">/g);
  const slicedItems = rawItems.map(item => item.slice(2, item.length - 2));

  console.log(slicedItems);
  return (
    <nav className={styles["menu"]}>
      <Scrollspy currentClassName="active" items={slicedItems} offset={-64}>
        {strippedMenu
          .replace(/<li>/g, "")
          .split("</li>")
          .map(item => (
            <NavItem dangerouslySetInnerHTML={{ __html: item }} />
          ))}
      </Scrollspy>
    </nav>
  );
};

export default Menu;
