import { Flex } from "@chakra-ui/react";

import { onMapNamesToOptions } from "./utils/mappers";

import { getPaginatedMembers } from "./services/balde";

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
        service={getPaginatedMembers}
        onMapToOptions={(names) => onMapNamesToOptions(names)}
        onLoading={() => console.log("onLoading")}
        onSuccess={(response) =>
          console.log(`onSuccess: ${JSON.stringify(response)}`)
        }
        onFailure={(e) => console.log(`onFailure: ${e}`)}
      />
    </Flex>
  );
}
