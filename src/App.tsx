import { Flex } from "@chakra-ui/react";

import { AutoComplete } from "./components/auto-complete";

const options = [{ key: 0, value: "William" }];

export default function App() {
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <AutoComplete options={options} />
    </Flex>
  );
}
