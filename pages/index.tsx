import { initializeApollo } from "../apollo/client";
import IndexPageComponent from "../src/components/pages";

const Index = () => {
  return <IndexPageComponent />;
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
