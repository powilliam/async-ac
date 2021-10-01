import { useRef, RefObject, forwardRef, ForwardedRef } from "react";
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
  options: Option<any>[];
}

function AutoCompleteComponent(
  { connectivityState = "IDLE", options, ...rest }: AutoCompleteProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const menuRef = useRef() as RefObject<HTMLDivElement>;

  const { value, isMenuOpen, reset, onChange, onSelectOption } =
    useAutoCompleteState({ ref: menuRef });

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
        <Input ref={ref} value={value} onChange={onChange} />
        <InputRightElement>
          {!value ? (
            <ChevronDownIcon {...SMALL_ICON_SIZE} />
          ) : (
            <CloseIcon {...SMALL_ICON_SIZE} cursor="pointer" onClick={reset} />
          )}
        </InputRightElement>
      </InputGroup>
      <Menu
        ref={menuRef}
        options={options}
        isOpen={isMenuOpen}
        onSelectOption={onSelectOption}
      />
    </Box>
  );
}

export const AutoComplete = forwardRef(AutoCompleteComponent);
