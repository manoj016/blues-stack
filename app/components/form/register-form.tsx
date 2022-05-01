import * as React from "react";
import { Stack, Text } from "@chakra-ui/react";
import { withZod } from "@remix-validated-form/with-zod";
import * as z from "zod";
import {
  ValidatedForm,
  ValidationErrorResponseData,
} from "remix-validated-form";

import { FormInput } from "~/components/form/input";
import { PasswordField } from "~/components/form/password-field";
import { SubmitButton } from "~/components/form/submit-button";
import { useSearchParams } from "@remix-run/react";

export interface ActionData extends ValidationErrorResponseData {
  formError?: string;
}

const registerSchema = z
  .object({
    redirectTo: z.string(),
    email: z
      .string()
      .email("Email is invalid")
      .nonempty("username can't be empty"),
    password: z.string().nonempty("Password can't be empty"),
    confirm: z.string().nonempty("Confirm Password can't be empty"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

export const registerFormValidator = withZod(registerSchema);

export function RegisterForm({
  actionData,
}: {
  actionData: { formError?: string } | undefined;
}) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;

  return (
    <Stack spacing={6}>
      {actionData?.formError ? (
        <Text color="red" fontSize="sm">
          {actionData?.formError}
        </Text>
      ) : null}
      <ValidatedForm
        formRef={formRef}
        validator={registerFormValidator}
        method="post"
        noValidate
        defaultValues={{
          redirectTo,
        }}
      >
        <Stack spacing={3}>
          <FormInput name="redirectTo" type="hidden" />
          <FormInput
            label="Email"
            name="email"
            placeholder="Email"
            type="email"
            isRequired
            focusBorderColor="teal.300"
          />
          <PasswordField placeholder="Password" focusBorderColor="teal.300" />
          <PasswordField
            name="confirm"
            label="Confirm Password"
            placeholder="Confirm Password"
            focusBorderColor="teal.300"
          />
        </Stack>
        <Stack spacing={6} pt={6}>
          <SubmitButton
            type="submit"
            bg="teal.300"
            color="white"
            fontWeight="bold"
            w="100%"
            h="45"
            mb="24px"
            _hover={{
              bg: "teal.200",
            }}
            _active={{
              bg: "teal.400",
            }}
            text="Register"
          />
        </Stack>
      </ValidatedForm>
    </Stack>
  );
}
