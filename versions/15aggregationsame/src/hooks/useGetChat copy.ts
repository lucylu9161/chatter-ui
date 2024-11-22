import { DocumentNode, useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { ChatQueryVariables } from "../gql/graphql";

const getChatDocument2 = graphql(`
  query Chat($_id: String!) {
    chat(_id: $_id) {
      _id
      userId
      isPrivate
      userIds
      name
    }
  }
`);

const getChatDocument5 = graphql(`
  query Chat($_id: String!) {
    chat(_id: $_id) {
      _id
      userId
      isPrivate
      userIds
      name
    }
  }
`);

const getChatDocument = graphql(`
  query Chat($_id: String!) {
    chat(_id: $_id) {
      ...ChatFragment
    }
  }
`);

// export const getChatsDocument = gql(`
//   query Chats {
//     chats {
//       _id
//       userId
//       isPrivate
//       userIds
//       name
//     }
//   }
// `);

const useGetChat = (variables: ChatQueryVariables) => {
  return useQuery(getChatDocument as DocumentNode, { variables });
};

export { useGetChat };
