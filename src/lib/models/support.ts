export type SupportMessageType = "SUGGESTION" | "FEEDBACK" | "QUERY" | "BUG";
export type SupportMessageStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED";

export interface SupportMessage {
  id: string;
  type: SupportMessageType;
  subject: string;
  message: string;
  status: SupportMessageStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SupportMessageInput {
  type: SupportMessageType;
  subject: string;
  message: string;
  page?: string;
}
