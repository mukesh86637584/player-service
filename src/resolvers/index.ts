import { fetchPlayers } from '../services/playerService';
import { Player } from '../types/playerTypes';
import { CustomError } from '../../utils/customError';
import logger from '../../utils/logger';

export const resolvers = {
  Query: {
    players: async (): Promise<Player[]> => {
      try {
        logger.info('Fetching players list...');
        const players = await fetchPlayers();
        logger.info('Players list fetched successfully');
        return players;
      } catch (error) {
        throw new CustomError('Error fetching players', 500, error);
      }
    },

    player: async (_: unknown, { id }: { id: number }): Promise<Player | null> => {
      logger.info(`Fetching player with ID: ${id}`);

      if (!id) {
        logger.error('Player ID not provided');
        throw new CustomError('ID is not provided by user', 400);
      }

      try {
        const players = await fetchPlayers();
        const player = players.find((p) => p.id === id) || null;

        if (!player) {
          logger.error(`Player not found with ID: ${id}`);
          throw new CustomError('Player not found', 404);
        }

        logger.info(`Player found: ${player.id}`);
        return player;
      } catch (error) {
        throw new CustomError('Error fetching player data', 500, error);
      }
    },
  },
};
