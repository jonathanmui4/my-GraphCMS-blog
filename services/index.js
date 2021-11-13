import {request, gql} from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export async function getPosts() {
    const query = gql`
        query getPosts {
          postsConnection {
            edges {
              node {
                author {
                  bio
                  name
                  id
                  photo {
                    url
                  }
                }
                createdAt
                slug
                title
                excerpt
                image {
                  url
                }
                categories {
                  name
                  slug
                }
              }
            }
          }
        }
    `;

    const result = await request(graphqlAPI, query);

    return result.postsConnection.edges;
}

export async function getPostDetails(slug) {
    const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        image {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

    const result = await request(graphqlAPI, query, {slug});

    return result.post;
}

export async function getRecentPosts() {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC 
                last: 3
            ) {
                title
                image {
                    url
                }
                createdAt
                slug
            }
        }
    `;

    const result = await request(graphqlAPI, query);

    return result.posts;
}

export async function getSimilarPosts(categories, slug) {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: { slug_not: $slug, AND: {categories_some: { slug_in: $categories } } }
                last: 3
            ) {
                title
                image {
                    url
                }
                createdAt
                slug
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug, categories});

    return result.posts;
}

export async function getCategories() {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `;

    const result = await request(graphqlAPI, query);

    return result.categories;
}

