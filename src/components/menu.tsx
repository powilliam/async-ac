import { forwardRef, ForwardedRef } from "react";
import { Box, Button, BoxProps } from "@chakra-ui/react";

import { Option } from "../@types/option";

export interface MenuProps extends BoxProps {
  isOpen?: boolean;
  options?: Option<number, string>[];
  onSelectOption?(option: Option<number, string>): void;
}

function MenuComponent(
  {
    isOpen = false,
    options = [],
    onSelectOption = () => {},
    ...rest
  }: MenuProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <>
      {isOpen && (
        <Box
          ref={ref}
          position="absolute"
          top="100%"
          my="6px"
          width="100%"
          boxSizing="border-box"
          borderRadius="6px"
          boxShadow="0 0 0 1px hsl(0deg 0% 0% / 10%), 0 4px 11px hsl(0deg 0% 0% / 10%)"
          background="gray.700"
          as="ul"
          listStyleType="none"
          zIndex="3"
          overflow="auto"
          {...rest}
        >
          {options.map((it) => (
            <Button
              key={it.key}
              variant="ghost"
              width="100%"
              justifyContent="start"
              onClick={() => onSelectOption(it)}
            >
              {it.value}
            </Button>
          ))}
        </Box>
      )}
    </>
  );
}

export const Menu = forwardRef(MenuComponent);
