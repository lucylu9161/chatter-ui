import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { onError } from "@apollo/client/link/error";
import { API_URL } from "./urls";
import excludedRoutes from "./excluded-routes";
import router from "../components/Routes";
import { useState } from "react";

// const logoutLink = onError((error) => {
//   if (
//     error.graphQLErrors?.length &&
//     (error.graphQLErrors[0].extensions.originalError as any).statusCode === 401
//   ) {
//     if (!excludedRoutes.includes(window.location.pathname)) {
//       router.navigate("/login");
//       client.resetStore();
//     }
//   }
// });

interface OriginalError {
  statusCode?: number; // Make it optional if it might not always be present
  // Add other properties as needed
}

let loading = true; // Global loading state

const logoutLink = onError((error) => {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const firstError = error.graphQLErrors[0];
    const originalError = firstError.extensions?.originalError as OriginalError; // Type assertion

    if (originalError.statusCode === 401) {
      if (!excludedRoutes.includes(window.location.pathname)) {
        loading = false; // Set loading to false before redirecting
        router.navigate("/login");
        client.resetStore();
      }
    }
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});

// Custom hook to manage loading state
export const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState(loading);

  const setLoading = (value: boolean) => {
    loading = value; // Update global loading state
    setIsLoading(value); // Update local state
  };

  return { isLoading, setLoading };
};

export default client;
