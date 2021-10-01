import { useRef, RefObject } from "react";
import {
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  BoxProps,
  CircularProgress,
} from "@chakra-ui/react";
import { ChevronDownIcon, CloseIcon, WarningIcon } from "@chakra-ui/icons";

import { useAutoCompleteState } from "../hooks/use-autocomplete-state";

import { Option } from "../@types/option";

import { DEFAULT_ICON_SIZE, SMALL_ICON_SIZE } from "../constants/icon";

import { Menu } from "./menu";
import { ConnectivityState } from "../@types/connectivity";

export interface AutoCompleteProps extends BoxProps {
  connectivityState?: ConnectivityState;
  options: Option<number, string>[];
}

export function AutoComplete({
  connectivityState = "IDLE",
  options,
  ...rest
}: AutoCompleteProps) {
  const ref = useRef() as RefObject<HTMLDivElement>;

  const { value, isMenuOpen, reset, onChange, onSelectOption } =
    useAutoCompleteState({ ref });

  return (
    <Box position="relative" {...rest}>
      <InputGroup>
        {["LOADING", "FAILURE"].includes(connectivityState) && (
          <InputLeftElement>
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
          </InputLeftElement>
        )}
        <Input value={value} onChange={onChange} />
        <InputRightElement>
          {!value ? (
            <ChevronDownIcon {...SMALL_ICON_SIZE} />
          ) : (
            <CloseIcon {...SMALL_ICON_SIZE} cursor="pointer" onClick={reset} />
          )}
        </InputRightElement>
      </InputGroup>
      <Menu
        ref={ref}
        options={options}
        isOpen={isMenuOpen}
        onSelectOption={onSelectOption}
      />
    </Box>
  );
}
