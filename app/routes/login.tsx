import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useSearchParams, Link } from "@remix-run/react";
import * as React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  Link as CLink,
} from "@chakra-ui/react";

import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/models/user.server";
import signInImage from "~/assets/img/signInImage.png";
import {
  LoginForm,
  loginFormValidator,
  ActionData,
} from "~/components/form/login-form";
import { validationError } from "remix-validated-form";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  const fieldValues = await loginFormValidator.validate(
    await request.formData()
  );
  if (fieldValues.error) return validationError(fieldValues.error);

  const { phone, password, redirectTo, remember } = fieldValues.data;

  // const user = await verifyLogin(email, password);

  return json({})

  if (!user) {
    return validationError({
      ...fieldValues,
      fieldErrors: {
        email: "Invalid email or password",
        password: "Invalid email or password",
      },
    });
  }

  return createUserSession({
    request,
    userId: user.id,
    remember,
    redirectTo: typeof redirectTo === "string" ? redirectTo : "/",
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  // Chakra color mode
  const titleColor = useColorModeValue<string, string>("teal.300", "teal.200");
  const textColor = useColorModeValue<string, string>("gray.400", "white");

  React.useEffect(() => {
    if (actionData?.fieldErrors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.fieldErrors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Welcome Back
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Enter your email and password to sign in
            </Text>

            <LoginForm actionData={actionData} />

            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="10px"
            >
              <Text color={textColor} fontWeight="medium">
                Don't have an account?
                <CLink
                  to={{
                    pathname: "/register",
                    search: searchParams.toString(),
                  }}
                  color={titleColor}
                  as={Link}
                  ms="5px"
                  fontWeight="bold"
                >
                  Sign Up
                </CLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          />
        </Box>
      </Flex>
    </Flex>
  );
}
