import Head from 'next/head';
import { gql, useQuery, useMutation } from '@apollo/client';
import Link from 'next/link';

interface IPost {
  id?: string;
  title?: string;
  url?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
}

interface IPostData {
  posts: {
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
    edges: {
      cursor: string;
      node: IPost;
    }[];
  };
}

const AllPostsQuery = gql`
  query AllPostsQuery($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          imageUrl
          url
          title
          category
          description
        }
      }
    }
  }
`;

export default function Home() {
  const { data, loading, error, fetchMore } = useQuery<IPostData | undefined>(
    AllPostsQuery,
    {
      variables: { first: 2 },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto max-w-5xl my-20">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.posts?.edges?.map(({ node }) => (
            <li key={node.id} className="shadow  max-w-md  rounded">
              <img className="shadow-sm" src={node.imageUrl} />
              <div className="p-5 flex flex-col space-y-2">
                <p className="text-sm text-blue-500">{node.category}</p>
                <p className="text-lg font-medium">{node.title}</p>
                <p className="text-gray-600">{node.description}</p>
                <a href={node.url} className="flex hover:text-blue-500">
                  {node?.url?.replace(/(^\w+:|^)\/\//, '')}
                  <svg
                    className="w-4 h-4 my-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {data?.posts.pageInfo.hasNextPage ? (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded my-10"
          onClick={() => {
            fetchMore({
              variables: { after: data.posts.pageInfo.endCursor },

              updateQuery: (prevResult, { fetchMoreResult }) => {
                fetchMoreResult!.posts.edges = [
                  ...prevResult!.posts.edges,
                  ...fetchMoreResult!.posts.edges,
                ];
                return fetchMoreResult;
              },
            });
          }}
        >
          more
        </button>
      ) : (
        <p className="my-10 text-center font-medium">
          You&aposve reached the end!{' '}
        </p>
      )}
    </div>
  );
}
