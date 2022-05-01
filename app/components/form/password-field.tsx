import * as React from "react";
import { InputProps } from "@chakra-ui/input";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useField } from "remix-validated-form";

interface PasswordFieldProps extends InputProps {
  name?: string;
  label?: string;
  isRequired?: boolean;
}

export const PasswordField = React.forwardRef<
  HTMLInputElement,
  PasswordFieldProps
>(
  (
    { name = "password", label = "Password", isRequired = true, ...props },
    ref
  ) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const mergeRef = useMergeRefs(inputRef, ref);
    const { getInputProps, error } = useField(name);

    const onClickReveal = () => {
      onToggle();
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    };

    return (
      <FormControl isInvalid={!!error} isRequired={isRequired}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <InputGroup>
          <Input
            {...getInputProps({
              // @ts-ignore
              id: name,
              ...props,
            })}
            ref={mergeRef}
            type={isOpen ? "text" : "password"}
          />
          <InputRightElement>
            <IconButton
              variant="link"
              aria-label={isOpen ? "Mask password" : "Reveal password"}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
        </InputGroup>
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    );
  }
);

PasswordField.displayName = "PasswordField";
