import { Fragment } from "react";
import { CircularProgress } from "@chakra-ui/react";
import { WarningIcon, EditIcon } from "@chakra-ui/icons";

import { ConnectivityState } from "../@types/connectivity";

import { DEFAULT_ICON_SIZE } from "../constants/icon";

export interface ConnectivityStatusProps {
  connectivityState: ConnectivityState;
}

export function ConnectivityStatus({
  connectivityState,
}: ConnectivityStatusProps) {
  return (
    <Fragment>
      {["IDLE", "SUCCESSFUL"].includes(connectivityState) && (
        <EditIcon {...DEFAULT_ICON_SIZE} />
      )}

      {connectivityState === "LOADING" && (
        <CircularProgress
          isIndeterminate
          size={DEFAULT_ICON_SIZE.w}
          trackColor="transparent"
          color="blue.300"
        />
      )}
      {connectivityState === "FAILURE" && (
        <WarningIcon {...DEFAULT_ICON_SIZE} color="red.300" />
      )}
    </Fragment>
  );
}
