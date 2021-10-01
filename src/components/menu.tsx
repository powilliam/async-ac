import { forwardRef, ForwardedRef, useMemo, Fragment } from "react";
import { Box, Button, BoxProps } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

import { SMALL_ICON_SIZE } from "../constants/icon";

import { Option } from "../@types/option";

export interface MenuProps extends BoxProps {
  isOpen?: boolean;
  selected?: Option<any>;
  options?: Option<any>[];
  onSelectOption?(option: Option<any>): void;
}

function MenuComponent(
  {
    isOpen = false,
    selected,
    options = [],
    onSelectOption = () => {},
    ...rest
  }: MenuProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const shouldAppear = useMemo(
    () => isOpen && options.length > 0,
    [isOpen, options]
  );

  return (
    <Fragment>
      {shouldAppear && (
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
              justifyContent="space-between"
              onClick={() => onSelectOption(it)}
            >
              {it.value}
              {selected === it && <CheckIcon {...SMALL_ICON_SIZE} />}
            </Button>
          ))}
        </Box>
      )}
    </Fragment>
  );
}

export const Menu = forwardRef(MenuComponent);
