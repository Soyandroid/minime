export interface AimeRequestBase {
  gameId: string;
  keychipId: string;
}

export interface RegisterRequest extends AimeRequestBase {
  type: "register";
  luid: string;
}

export interface LogRequest extends AimeRequestBase {
  type: "log";
  field20: number;
  field24: number;
  field28: number;
  field2C: number;
  field30: number;
  field34: number;
  field38: number;
  field3C: number;
}

export interface CampaignRequest extends AimeRequestBase {
  type: "campaign";
}

export interface LookupRequest extends AimeRequestBase {
  type: "lookup";
  luid: string;
}

export interface HelloRequest extends AimeRequestBase {
  type: "hello";
}

export interface GoodbyeRequest extends AimeRequestBase {
  type: "goodbye";
}

export type AimeRequest =
  | CampaignRequest
  | GoodbyeRequest
  | HelloRequest
  | LogRequest
  | LookupRequest
  | RegisterRequest;