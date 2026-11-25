import { generateClient } from "aws-amplify/api";
import {
  ContactField,
  ContactReveal,
  CreatorProfile,
  CreditBalance,
  Creator,
  CreatorConnection,
  CreatorFilterOptions,
  CreatorSearchResult,
} from "@/lib/models/creator";
import { ProfileInput, User } from "@/lib/models/user";
import { UserList, UserListInput } from "@/lib/models/list";
import { SupportMessage, SupportMessageInput } from "@/lib/models/support";
import {
  addCreatorToList,
  createUserList,
  deleteUserList,
  getCreatorListIds,
  getUserById,
  creatorFilterOptions,
  listCreators,
  listCreatorsInList,
  listMyLists,
  listMySupportMessages,
  submitSupportMessage,
  myCredits,
  openCreatorProfile,
  revealCreatorContact,
  removeCreatorFromList,
  updateMyProfile,
  updateUserList,
} from "./api";

const client = generateClient();

interface GraphQLData<T> {
  data: T;
}

export const getUserByIdAPI = async (id: string): Promise<User | null> => {
  const response = (await client.graphql({
    query: getUserById,
    variables: { id },
    authMode: "userPool",
  })) as GraphQLData<{ getUserById: User | null }>;
  return response.data.getUserById;
};

const run = async <T>(query: string, variables?: Record<string, unknown>): Promise<T> => {
  const response = (await client.graphql({
    query,
    variables: variables as never,
    authMode: "userPool",
  })) as GraphQLData<T>;
  return response.data;
};

export const listMyListsAPI = async () =>
  (await run<{ listMyLists: UserList[] }>(listMyLists)).listMyLists;

export const listCreatorsAPI = async (args: {
  filter: Record<string, unknown>;
  sort: string;
  limit: number;
  nextToken?: string | null;
}) =>
  (
    await run<{ listCreators: CreatorSearchResult }>(listCreators, {
      ...args,
      nextToken: args.nextToken ?? null,
    })
  ).listCreators;

export const creatorFilterOptionsAPI = async () =>
  (await run<{ creatorFilterOptions: CreatorFilterOptions }>(creatorFilterOptions)).creatorFilterOptions;

export const listCreatorsInListAPI = async (listId: string, limit: number, nextToken?: string | null) =>
  (
    await run<{ listCreatorsInList: CreatorConnection }>(listCreatorsInList, {
      listId,
      limit,
      nextToken: nextToken ?? null,
    })
  ).listCreatorsInList;

export const getCreatorListIdsAPI = async (creatorId: string) =>
  (await run<{ getCreatorListIds: string[] }>(getCreatorListIds, { creatorId })).getCreatorListIds;

export const createUserListAPI = async (input: UserListInput) =>
  (await run<{ createUserList: UserList }>(createUserList, { input })).createUserList;

export const updateUserListAPI = async (id: string, input: UserListInput) =>
  (await run<{ updateUserList: UserList }>(updateUserList, { id, input })).updateUserList;

export const deleteUserListAPI = async (id: string) =>
  (await run<{ deleteUserList: boolean }>(deleteUserList, { id })).deleteUserList;

export const addCreatorToListAPI = async (listId: string, creatorId: string) =>
  (await run<{ addCreatorToList: UserList }>(addCreatorToList, { listId, creatorId })).addCreatorToList;

export const removeCreatorFromListAPI = async (listId: string, creatorId: string) =>
  (await run<{ removeCreatorFromList: UserList }>(removeCreatorFromList, { listId, creatorId }))
    .removeCreatorFromList;

export const myCreditsAPI = async () => (await run<{ myCredits: CreditBalance }>(myCredits)).myCredits;

export const openCreatorProfileAPI = async (id: string) =>
  (await run<{ openCreatorProfile: CreatorProfile }>(openCreatorProfile, { id })).openCreatorProfile;

export const revealCreatorContactAPI = async (creatorId: string, field: ContactField) =>
  (await run<{ revealCreatorContact: ContactReveal }>(revealCreatorContact, { creatorId, field }))
    .revealCreatorContact;

export const listMySupportMessagesAPI = async () =>
  (await run<{ listMySupportMessages: SupportMessage[] }>(listMySupportMessages)).listMySupportMessages;

export const submitSupportMessageAPI = async (input: SupportMessageInput) =>
  (await run<{ submitSupportMessage: SupportMessage }>(submitSupportMessage, { input })).submitSupportMessage;

export const updateMyProfileAPI = async (input: ProfileInput) =>
  (await run<{ updateMyProfile: User }>(updateMyProfile, { input })).updateMyProfile;

export const getErrorMessage = (error: unknown, fallback = "Something went wrong") => {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  const gqlErrors = (error as { errors?: { message?: string }[] }).errors;
  if (gqlErrors?.length) return gqlErrors[0].message || fallback;
  return (error as { message?: string }).message || fallback;
};

/** GraphQL errorType of the first error, e.g. "InsufficientCredits". */
export const getErrorType = (error: unknown): string | null => {
  const gqlErrors = (error as { errors?: { errorType?: string }[] } | null)?.errors;
  return gqlErrors?.[0]?.errorType ?? null;
};

export const INSUFFICIENT_CREDITS = "InsufficientCredits";
export const isInsufficientCredits = (error: unknown) => getErrorType(error) === INSUFFICIENT_CREDITS;
