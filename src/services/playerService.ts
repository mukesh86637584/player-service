import fetch from 'node-fetch';
import { DATA_URL } from '../config';
import { Player, ApiResponse } from '../types/playerTypes';

export async function fetchPlayers(): Promise<Player[]> {
  if (!DATA_URL) {
    throw new Error('Data URL is not defined');
  }
  const response = await fetch(DATA_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const data = (await response.json()) as unknown;

  if (typeof data === 'object' && data !== null && 'players' in data) {
    return (data as ApiResponse).players.sort((a, b) => a.id - b.id);
  }

  throw new Error('Invalid data format');
}