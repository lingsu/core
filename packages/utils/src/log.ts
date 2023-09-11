export const log = async ({
  message,
  type,
  mention = false,
}: {
  message: string;
  type: "cron" | "links";
  mention?: boolean;
}) => {
  if (
    process.env.NODE_ENV === "development" ||
    !process.env.DUB_SLACK_HOOK_CRON ||
    !process.env.DUB_SLACK_HOOK_LINKS
  )
    console.log(message);
  /* Log a message to the console */

};
