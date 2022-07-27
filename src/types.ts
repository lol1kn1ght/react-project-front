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

export type storage_type = {
  user?: api_user_data_type;
};
