import { fetchPlayers } from '../services/playerService';
import { Player } from '../types/playerTypes';

export const resolvers = {
  Query: {
    players: async (): Promise<Player[]> => await fetchPlayers(),
    player: async (_: unknown, { id }: { id: number }): Promise<Player | null> => {
      const players = await fetchPlayers();
      return players.find((player) => player.id === id) || null;
    },
  },
};