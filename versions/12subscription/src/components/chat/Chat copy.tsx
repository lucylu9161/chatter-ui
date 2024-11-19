import { useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import { Divider, IconButton, InputBase, Paper, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
//import { Chat as chatIetm } from "../../gql/graphql";

const Chat = () => {
  const params = useParams();
  const { data } = useGetChat({ _id: params._id! });
  console.log("data from chat component");
  console.log(data?.chat);
  //const deepCopy = JSON.parse(JSON.stringify(data?.chat));
  //console.log(deepCopy as any);
  console.log((data?.chat as any)?.name);

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{(data?.chat as any)?.name}</h1>
      {/* <h1>{(data?.chat as any).name}</h1> */}
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          placeholder="Message"
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
