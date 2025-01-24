import { treaty } from "@elysiajs/eden";
import type { App } from "@camellia/backend/type";

export const getClient = ({
  url,
  getUserToken,
}: {
  url: string;
  getUserToken: () => Promise<string | null>;
}) => {
  const client = treaty<App>(url, {
    async onRequest() {
      const token = await getUserToken();

      if (!token) {
        return {};
      }
      return {
        headers: {
          authorization: token,
        },
      };
    },
  }).web;

  return client;
};
