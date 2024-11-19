import { useQuery, gql } from "@apollo/client";
import { graphql } from "../gql";

export const getChatsDocument = graphql(`
  query Chats {
    chats {
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

const useGetChats = () => {
  return useQuery(getChatsDocument);
};

export { useGetChats };
