import type { campaignType } from "../types/campaign";

const API_URL = "/api/auth/recording/jobs";

const getHeaders = () => ({
  "Content-Type": "application/json",
  MyAuthorizationx: import.meta.env.VITE_READIE_CUSTOM_AUTH,
  Authorization: `Basic ${import.meta.env.VITE_READIE_BASIC_TOKEN}`,
});

export async function getCampaign(campaignId: string): Promise<campaignType[]> {
  const response = await fetch(`${API_URL}/campaignHACKATHON/${campaignId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }

  return response.json();
}

export async function getRoomEvaluation(roomName: string) {
  const response = await fetch(`${API_URL}/roomsHACKATHON/${roomName}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }

  return response.json();
}
