import gql from "graphql-tag";
import { initializeApollo } from "../apollo/client";
import IndexPageComponent from "../src/components/pages";

export const GetToDosQuery = gql`
  query {
    getToDos {
      id
      description
      title
    }
  }
`;

const Index = () => {
  return <IndexPageComponent />;
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GetToDosQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
