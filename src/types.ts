export type api_user_data_type = {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: boolean;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags: number;
  premium_type?: number;
  public_flags?: number;
};

export type login_data_type = {
  token: string;
  user: api_user_data_type;
};

export type storage_type = Partial<{
  api_user: api_user_data_type;
  db_user: db_user_type;
}>;

export type db_user_type = {
  login: string;
  session_id: string;
};

export type session_id_type = {
  token: string;
  expired_at: number;
  member_id: string;
};

export type login_response_type = Partial<{
  session_id: string;
  db_user_data: db_user_type;
  api_user_data: api_user_data_type;
}>;

export type api_login_type = {
  token_type: string;
  access_token: string;
};

export type api_guild_type = {
  id: string;
  name: string;
  icon?: string;
  owner?: boolean;
  parmissions?: string;
  owner_id: string;
};
