import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-eu-west-2.hygraph.com/v2/cl73cyrz03boo01ul17p8gm5a/master",
  cache: new InMemoryCache(),
});
