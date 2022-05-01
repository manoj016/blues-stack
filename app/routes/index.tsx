import { Center } from "@chakra-ui/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { useOptionalUser } from "~/utils";
import { requireUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request, "/login");
  return json({});
};

export default function Index() {
  const user = useOptionalUser();
  return <Center>Remix run blue stacks using Chakra-UI</Center>;
}
