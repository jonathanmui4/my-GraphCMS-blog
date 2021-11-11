import {request, gql} from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export async function getPosts() {
    const query = gql`
        query MyQuery {
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

    const result = await request(graphqlAPI, query);

    return result.posts;
}