import {
  useRef,
  RefObject,
  forwardRef,
  ForwardedRef,
  FunctionComponent,
} from "react";
import {
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  BoxProps,
} from "@chakra-ui/react";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";

import { useAutoCompleteState } from "../hooks/use-autocomplete-state";

import { Option } from "../@types/option";

import { SMALL_ICON_SIZE } from "../constants/icon";

import { Menu } from "./menu";

export interface RightComponentProps {
  value: string;
}

export interface AutoCompleteProps extends BoxProps {
  options: Option<any>[];
  LeftComponent?: FunctionComponent;
  RightComponent?: FunctionComponent<RightComponentProps>;
}

function AutoCompleteComponent(
  { LeftComponent, RightComponent, options, ...rest }: AutoCompleteProps,
  inputRef: ForwardedRef<HTMLInputElement>
) {
  const menuRef = useRef() as RefObject<HTMLDivElement>;

  const { value, isMenuOpen, reset, onFocus, onChange, onSelectOption } =
    useAutoCompleteState({
      ref: menuRef,
    });

  return (
    <Box position="relative" {...rest}>
      <InputGroup>
        <InputLeftElement>
          {LeftComponent && <LeftComponent />}
        </InputLeftElement>
        <Input
          ref={inputRef}
          value={value}
          onFocus={onFocus}
          onChange={onChange}
        />
        <InputRightElement>
          {RightComponent ? (
            <RightComponent value={value} />
          ) : !value ? (
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
