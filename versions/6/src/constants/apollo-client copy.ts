import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { API_URL } from "./urls";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";
//import router from "../components/Routes";

const logoutLink = onError((error) => {
  if (
    error.graphQLErrors &&
    error.graphQLErrors.length > 0 &&
    (error.graphQLErrors[0].extensions?.originalError as any).statusCode === 401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
      // try {
      //   router.navigate("/");
      //   window.location.reload();
      // } catch (error) {}
    }
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});

export default client;
