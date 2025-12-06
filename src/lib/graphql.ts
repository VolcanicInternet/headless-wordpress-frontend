import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL + '/graphql';

export const graphqlClient = new GraphQLClient(endpoint);

export const POST_FRAGMENT = `
  fragment PostFields on Post {
    id
    title
    slug
    date
    content
    excerpt
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
  }
`;

export const PAGE_FRAGMENT = `
  fragment PageFields on Page {
    id
    title
    content
    slug
    uri
    featuredImage {
        node {
            sourceUrl
            altText
        }
    }
  }
`;

export const GET_HOME_PAGE = `
  ${PAGE_FRAGMENT}
  ${POST_FRAGMENT}
  query GetHomePage {
    page(id: "/", idType: URI) {
        ...PageFields
    }
    posts(first: 3) {
        nodes {
            ...PostFields
        }
    }
}
`;

export const GET_PAGE_BY_SLUG = `
  ${PAGE_FRAGMENT}
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      ...PageFields
    }
  }
`; 

export const GET_ALL_POSTS = `
  ${POST_FRAGMENT}
  query GetAllPosts {
    posts(first: 100) {
      nodes {
        ...PostFields
      }
    }
  }
`; 

export const GET_POST_BY_SLUG = `
  ${POST_FRAGMENT}
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: URI) {
      ...PostFields
    }
  }
`;