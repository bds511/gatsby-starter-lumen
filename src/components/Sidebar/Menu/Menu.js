// @flow strict
import React, { useState } from "react";
import { Link } from "gatsby";
import styles from "./Menu.module.scss";
import kebabCase from "lodash/kebabCase";
import { useCategoriesList } from "../../../hooks";

type Props = {
  menu: {
    label: string,
    path: string
  }[]
};

const Menu = ({ menu }: Props) => {
  const categories = useCategoriesList();
  const [opened, setOpend] = useState(true);

  return (
    <nav className={styles["menu"]}>
      <ul className={styles["menu__list"]}>
        <li className={styles["menu__list-item"]}>
          <Link
            onClick={() => setOpend(!opened)}
            to="/"
            className={styles["menu__list-item-link"]}
            activeClassName={styles["menu__list-item-link--active"]}
            state={{}}
          >
            Post ({categories.map(el => el.totalCount).reduce((a, b) => a + b)}) {opened?"▲":"▼"}
          </Link>
        </li>
        {opened ? (
          <ul>
            {categories.map(category => (
              <li key={category.fieldValue}>
                <Link
                  to={`/category/${kebabCase(category.fieldValue)}/`}
                  className={styles["menu__list-item-link"]}
                  activeClassName={styles["menu__list-item-link--active"]}
                >
                  {category.fieldValue} ({category.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        {menu.map(item => (
          <li className={styles["menu__list-item"]} key={item.path}>
            <Link
              to={item.path}
              className={styles["menu__list-item-link"]}
              activeClassName={styles["menu__list-item-link--active"]}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
