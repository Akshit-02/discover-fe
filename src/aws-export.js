import {
  AWS_API_URL,
  AWS_REGION,
  AWS_USER_POOLS_ID,
  AWS_USER_POOLS_WEB_CLIENT_ID,
} from "./config/envConfig";

const awsmobile = {
  aws_project_region: AWS_REGION,
  aws_appsync_graphqlEndpoint: AWS_API_URL,
  aws_appsync_region: AWS_REGION,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_cognito_region: AWS_REGION,
  aws_user_pools_id: AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: AWS_USER_POOLS_WEB_CLIENT_ID,
};

export default awsmobile;
