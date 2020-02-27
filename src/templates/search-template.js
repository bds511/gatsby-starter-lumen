// @flow strict
import React from "react";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Page from "../components/Page";
import Search from "../components/Search";

import { StaticQuery, graphql } from "gatsby";

const SearchTemplate = () => {
  return (
    <Layout title="Search Page" description="검색하고 싶은내용을 입력하세요">
      <Sidebar />
      <Page title="Search">
        <StaticQuery
          query={graphql`
            query SearchIndexQuery {
              siteSearchIndex {
                index
              }
            }
          `}
          render={data => (
            <header>
              ... header stuff...
              <Search searchIndex={data.siteSearchIndex.index} />
            </header>
          )}
        />
        
      </Page>
    </Layout>
  );
};

export default SearchTemplate;
