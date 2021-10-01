import { Flex } from "@chakra-ui/react";

import { useService } from "./hooks/use-service";

import { wait } from "./utils/promise";

import { AsyncAutoComplete } from "./components/async-auto-complete";

export default function App() {
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <AsyncAutoComplete
        service={() => wait(["William", "Juliano"])}
        toOptions={(names) => names.map((it) => ({ key: it, value: it }))}
      />
    </Flex>
  );
}
