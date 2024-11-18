import { DocumentNode, gql, useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { ChatFragment } from "../fragments/chat.fragment";

const createChatDocument = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      ...ChatFragment
    }
  }
`);

// const createChatDocument = gql(`
//   mutation CreateChat($createChatInput: CreateChatInput!) {
//     createChat(createChatInput: $createChatInput) {
//       _id
//     userId
//     isPrivate
//     userIds
//     name
//     }
//   }
// `);

const useCreateChat = () => {
  return useMutation(createChatDocument as DocumentNode, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          chats(existingChats = []) {
            const newChatRef = cache.writeFragment({
              data: data?.createChat,
              fragment: ChatFragment,
            });
            return [...existingChats, newChatRef];
          },
        },
      });
    },
  });
};

// const useCreateChat = () => {
//   return useMutation(createChatDocument);
// };

// const useCreateChat = () => {
//   return useMutation(createChatDocument, {
//     update(cache, { data }) {
//       cache.modify({
//         fields: {
//           chats(existingChats = []) {
//             const newChatRef = cache.writeFragment({
//               data: data?.createChat,
//               fragment: ChatFragment,
//             });
//             return [...existingChats, newChatRef];
//           },
//         },
//       });
//     },
//   });
// };

export { useCreateChat };
