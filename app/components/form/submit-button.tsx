import * as React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useIsSubmitting } from "remix-validated-form";
import { HTMLChakraProps } from "@chakra-ui/system";

interface SubmitButtonProps {
  text: string;
}

export const SubmitButton = React.forwardRef<
  HTMLChakraProps<"button">,
  SubmitButtonProps & ButtonProps
>(({ text, ...rest }: SubmitButtonProps & ButtonProps, ref) => {
  const isSubmitting = useIsSubmitting();
  return (
    <Button
      // @ts-ignore
      ref={ref}
      type="submit"
      disabled={isSubmitting}
      isLoading={isSubmitting}
      {...rest}
    >
      {text}
    </Button>
  );
});

SubmitButton.displayName = "SubmitButton";
