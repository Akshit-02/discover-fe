const USER_FIELDS = /* GraphQL */ `
  id
  email
  name
  phone
  jobTitle
  companyName
  companyWebsite
  industry
  companySize
  monthlyBudget
  city
  country
  marketingOptIn
  createdAt
  updatedAt
`;

export const getUserById = /* GraphQL */ `
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      ${USER_FIELDS}
    }
  }
`;

export const updateMyProfile = /* GraphQL */ `
  mutation UpdateMyProfile($input: UpdateProfileInput!) {
    updateMyProfile(input: $input) {
      ${USER_FIELDS}
    }
  }
`;

const CREATOR_FIELDS = /* GraphQL */ `
  id
  name
  username
  hasEmail
  hasPhone
  followers
  following
  totalPosts
  avgLikes
  avgViews
  avgComments
  avgEngagementRate
  postingFrequency
  gender
  city
  state
  country
  niches
  languages
  isVerified
  collaborationTypes
  currency
  reelPrice
  storyPrice
  shortVideoPrice
  longVideoPrice
  mid
  createdAt
  updatedAt
`;

const CREDIT_FIELDS = /* GraphQL */ `
  balance
  freeBalance
  paidBalance
  expiresAt
  expired
  costs {
    advancedFilter
    revealEmail
    revealPhone
    openProfile
  }
`;

export const myCredits = /* GraphQL */ `
  query MyCredits {
    myCredits {
      ${CREDIT_FIELDS}
    }
  }
`;

export const openCreatorProfile = /* GraphQL */ `
  mutation OpenCreatorProfile($id: ID!) {
    openCreatorProfile(id: $id) {
      creator {
        ${CREATOR_FIELDS}
      }
      email
      phone
      emailRevealed
      phoneRevealed
      charged
      credits {
        ${CREDIT_FIELDS}
      }
    }
  }
`;

export const revealCreatorContact = /* GraphQL */ `
  mutation RevealCreatorContact($creatorId: ID!, $field: ContactField!) {
    revealCreatorContact(creatorId: $creatorId, field: $field) {
      creatorId
      field
      available
      value
      charged
      credits {
        ${CREDIT_FIELDS}
      }
    }
  }
`;

const LIST_FIELDS = /* GraphQL */ `
  id
  name
  description
  creatorCount
  createdAt
  updatedAt
`;

export const listCreators = /* GraphQL */ `
  query ListCreators($filter: CreatorFilterInput, $sort: CreatorSort, $limit: Int, $nextToken: String) {
    listCreators(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken) {
      items {
        ${CREATOR_FIELDS}
      }
      nextToken
      totalCount
      stats {
        totalReach
        avgEngagementRate
        verifiedCount
      }
      creditsCharged
      credits {
        ${CREDIT_FIELDS}
      }
    }
  }
`;

const FACET = "value count";

export const creatorFilterOptions = /* GraphQL */ `
  query CreatorFilterOptions {
    creatorFilterOptions {
      niches { ${FACET} }
      countries { ${FACET} }
      states { ${FACET} }
      cities { ${FACET} }
      languages { ${FACET} }
      genders { ${FACET} }
    }
  }
`;

export const listMyLists = /* GraphQL */ `
  query ListMyLists {
    listMyLists {
      ${LIST_FIELDS}
    }
  }
`;

export const listCreatorsInList = /* GraphQL */ `
  query ListCreatorsInList($listId: ID!, $limit: Int, $nextToken: String) {
    listCreatorsInList(listId: $listId, limit: $limit, nextToken: $nextToken) {
      items {
        ${CREATOR_FIELDS}
      }
      nextToken
    }
  }
`;

export const getCreatorListIds = /* GraphQL */ `
  query GetCreatorListIds($creatorId: ID!) {
    getCreatorListIds(creatorId: $creatorId)
  }
`;

export const createUserList = /* GraphQL */ `
  mutation CreateUserList($input: CreateUserListInput!) {
    createUserList(input: $input) {
      ${LIST_FIELDS}
    }
  }
`;

export const updateUserList = /* GraphQL */ `
  mutation UpdateUserList($id: ID!, $input: UpdateUserListInput!) {
    updateUserList(id: $id, input: $input) {
      ${LIST_FIELDS}
    }
  }
`;

export const deleteUserList = /* GraphQL */ `
  mutation DeleteUserList($id: ID!) {
    deleteUserList(id: $id)
  }
`;

export const addCreatorToList = /* GraphQL */ `
  mutation AddCreatorToList($listId: ID!, $creatorId: ID!) {
    addCreatorToList(listId: $listId, creatorId: $creatorId) {
      ${LIST_FIELDS}
    }
  }
`;

export const removeCreatorFromList = /* GraphQL */ `
  mutation RemoveCreatorFromList($listId: ID!, $creatorId: ID!) {
    removeCreatorFromList(listId: $listId, creatorId: $creatorId) {
      ${LIST_FIELDS}
    }
  }
`;

const SUPPORT_FIELDS = /* GraphQL */ `
  id
  type
  subject
  message
  status
  createdAt
  updatedAt
`;

export const listMySupportMessages = /* GraphQL */ `
  query ListMySupportMessages {
    listMySupportMessages {
      ${SUPPORT_FIELDS}
    }
  }
`;

export const submitSupportMessage = /* GraphQL */ `
  mutation SubmitSupportMessage($input: SupportMessageInput!) {
    submitSupportMessage(input: $input) {
      ${SUPPORT_FIELDS}
    }
  }
`;

export const createCreditOrder = /* GraphQL */ `
  mutation CreateCreditOrder($packId: String!) {
    createCreditOrder(packId: $packId) {
      orderId
      amount
      currency
      keyId
      packId
      packName
      credits
      prefillName
      prefillEmail
      prefillContact
    }
  }
`;

export const verifyCreditPayment = /* GraphQL */ `
  mutation VerifyCreditPayment($orderId: ID!, $paymentId: String!, $signature: String!) {
    verifyCreditPayment(orderId: $orderId, paymentId: $paymentId, signature: $signature) {
      orderId
      packId
      packName
      creditsAdded
      alreadyProcessed
      credits {
        ${CREDIT_FIELDS}
      }
    }
  }
`;
