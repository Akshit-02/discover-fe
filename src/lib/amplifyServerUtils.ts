import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import awsExports from "@/aws-export";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: awsExports,
});
