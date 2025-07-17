export type Transporter = {
  id: string;
  name: string;
  api_token: string;
  api_url: string;
  status: "active" | "inactive";
};
