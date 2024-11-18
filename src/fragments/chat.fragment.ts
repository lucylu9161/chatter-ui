import { graphql } from "../gql";

export const ChatFragment = graphql(`
  fragment ChatFragment on Chat {
    _id
    userId
    isPrivate
    userIds
    name
  }
`);

// export const ChatFragment = graphql(`
//   fragment ChatFragment on Chat {
//     _id
//     userId
//     isPrivate
//     userIds
//     name
//   }
// `);

// export const ChatFragment = graphql(`
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
