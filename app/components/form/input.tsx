import * as React from "react";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  StackProps,
  Switch as CSwitch,
  SwitchProps,
} from "@chakra-ui/react";
import { useField } from "remix-validated-form";

interface FormInputProps {
  label?: string;
  name: string;
  isRequired?: boolean;
}

export const FormInput = React.forwardRef<
  HTMLInputElement,
  FormInputProps & InputProps
>(({ label, name, isRequired = false, ...rest }, ref) => {
  const { getInputProps, error } = useField(name);

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        {...getInputProps({
          // @ts-ignore
          id: name,
          ...rest,
        })}
        ref={ref}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
});

FormInput.displayName = "FormInput";

interface ISwitchProps extends SwitchProps {
  label: string;
  name: string;
  formControlProps?: FormControlProps & StackProps;
}

export const Switch = React.forwardRef<HTMLInputElement, ISwitchProps>(
  ({ label, name, formControlProps, ...rest }, ref) => {
    const { getInputProps } = useField(name);

    return (
      <FormControl {...formControlProps}>
        <CSwitch
          {...getInputProps({
            // @ts-ignore
            id: name,
            ...rest,
          })}
          ref={ref}
        />
        <FormLabel htmlFor={name}>{label}</FormLabel>
      </FormControl>
    );
  }
);

Switch.displayName = "Switch";
