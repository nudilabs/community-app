export type Community = {
  id: string;
  name: string;
  list: string;
  banner_url: string;
  profile_url: string;
  token?: { symbol: string };
  condition: {
    type: string;
    value?: string | number;
  };
  events: CommunityEvent[];
};

export type CommunityEvent = {
  id: string;
  title: string;
  hashtags: string[];
  date: {
    from: string;
    to: string;
  };
};
