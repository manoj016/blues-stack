import * as React from "react";
import { Stack, Text, HStack } from "@chakra-ui/react";
import { withZod } from "@remix-validated-form/with-zod";
import * as z from "zod";
import {
  ValidatedForm,
  ValidationErrorResponseData,
} from "remix-validated-form";
import { useSearchParams } from "@remix-run/react";

import { FormInput, Switch } from "~/components/form/input";
import { PasswordField } from "~/components/form/password-field";
import { SubmitButton } from "~/components/form/submit-button";

export interface ActionData extends ValidationErrorResponseData {
  formError?: string;
}

type LoginProps = {
  actionData: ActionData;
};

const loginSchema = z.object({
  phone: z.string().nonempty("username can't be empty"),
  password: z.string().nonempty("Password can't be empty"),
  redirectTo: z.string(),
  remember: z.boolean().default(false),
});

export const loginFormValidator = withZod(loginSchema);

export function LoginForm({ actionData }: LoginProps) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  return (
    <Stack spacing={6} pt={4}>
      {actionData?.formError ? (
        <Text color="red" fontSize="sm">
          {actionData?.formError}
        </Text>
      ) : null}
      <ValidatedForm
        formRef={formRef}
        validator={loginFormValidator}
        method="post"
        noValidate
        defaultValues={{
          redirectTo,
          remember: false,
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

          <Switch
            label="Remember me"
            name="remember"
            colorScheme="teal"
            formControlProps={{
              as: HStack,
              align: "center",
              justify: "flex-start",
              spacing: 4,
            }}
          />
        </Stack>
        <Stack spacing={6} pt={6}>
          <SubmitButton
            bg="teal.300"
            w="full"
            h="45"
            color="white"
            _hover={{
              bg: "teal.200",
            }}
            _active={{
              bg: "teal.400",
            }}
            text="Login"
          />
        </Stack>
      </ValidatedForm>
    </Stack>
  );
}
