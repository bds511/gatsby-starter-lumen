const pageQuery = `{
  pages: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/pages/" }
    }
  ) {
    edges {
      node {
        frontmatter {
          title
        }
        field{slug}
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;

const postQuery = `{
  posts: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/posts/" } }
  ) {
    edges {
      node {
        frontmatter {
          title
          tags
        }
        field{slug}
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest
  }));
const settings = { attributesToSnippet: [`excerpt:20`] };

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName: `Pages`,
    settings
  },
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings
  }
];

module.exports = queries;
