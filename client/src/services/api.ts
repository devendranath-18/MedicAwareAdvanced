const API_URL = "http://localhost:5000";

export async function getHealthCheck() {
  const response = await fetch(API_URL);

  return response.json();
}