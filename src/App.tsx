import { Flex } from "@chakra-ui/react";

import { useService } from "./hooks/use-service";

import { wait } from "./utils/promise";

import { AutoComplete } from "./components/auto-complete";

export default function App() {
  const { connectivityState, options } = useService(
    () => wait(["William", "Juliano"]),
    {
      toOptions: (names) => names.map((it) => ({ key: it, value: it })),
    }
  );

  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <AutoComplete connectivityState={connectivityState} options={options} />
    </Flex>
  );
}
