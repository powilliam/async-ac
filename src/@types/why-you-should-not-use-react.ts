import React from "react";

/**
 * Simplesmente a biblioteca do entretenimento.
 * https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
 */
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: ForwardedRef<T>) => ReactElement | null
  ): (props: P & RefAttributes<T>) => ReactElement | null;
}
