import { getMockCampaign, getMockRoomEvaluation } from "../mocks/mockApi";
import type { campaignType } from "../types/campaign";
import type { RoomRecording } from "../types/room";

const API_URL = "/api/auth/recording/jobs";
const USE_MOCK_API =
  import.meta.env.VITE_USE_MOCK_API === "true" ||
  (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_API !== "false");

const getHeaders = () => ({
  "Content-Type": "application/json",
  MyAuthorizationx: import.meta.env.VITE_READIE_CUSTOM_AUTH,
  Authorization: `Basic ${import.meta.env.VITE_READIE_BASIC_TOKEN}`,
});

export async function getCampaign(campaignId: string): Promise<campaignType[]> {
  if (USE_MOCK_API) return getMockCampaign(campaignId);

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

export async function getRoomEvaluation(
  roomName: string,
): Promise<RoomRecording[]> {
  if (USE_MOCK_API) return getMockRoomEvaluation(roomName);

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
