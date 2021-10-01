import { useRef, RefObject } from "react";
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  BoxProps,
} from "@chakra-ui/react";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";

import { useAutoCompleteState } from "../hooks/use-autocomplete-state";

import { Option } from "../@types/option";

import { Menu } from "./menu";

const defaultIconProps = {
  w: "12px",
  h: "12px",
};

export interface AutoCompleteProps extends BoxProps {
  options: Option<number, string>[];
}

export function AutoComplete({ options, ...rest }: AutoCompleteProps) {
  const ref = useRef() as RefObject<HTMLDivElement>;

  const { value, isMenuOpen, reset, onChange, onSelectOption } =
    useAutoCompleteState({ ref });

  return (
    <Box position="relative" {...rest}>
      <InputGroup>
        <Input value={value} onChange={onChange} />
        <InputRightElement>
          {!value ? (
            <ChevronDownIcon {...defaultIconProps} />
          ) : (
            <CloseIcon {...defaultIconProps} cursor="pointer" onClick={reset} />
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
