export interface TwitterTokenResponse {
  access_token: string;
  refresh_token: string;
  twitter_id: string;
  expires_at: number;
  token_type: string;
}
