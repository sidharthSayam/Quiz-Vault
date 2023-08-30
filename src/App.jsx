import { Stack } from "@mui/material";

import Questions from "./components/Questions";
import Particles from "./components/Particles";

function App() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "99vh", height: "100%" }}
    >
      <Questions />
      <Particles />
    </Stack>
  );
}

export default App;
