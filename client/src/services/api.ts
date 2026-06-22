const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export async function getHealthCheck() {
  const response = await fetch(API_URL);

  return response.json();
}
