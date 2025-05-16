import { resolvers } from '../../resolvers';
import { fetchPlayers } from '../../services/playerService';
import logger from '../../../utils/logger';
import { CustomError } from '../../../utils/customError';

jest.mock('../../services/playerService');
jest.mock('../../../utils/logger');

const mockFetchPlayers = fetchPlayers as jest.Mock;
const mockLogger = logger as jest.Mocked<typeof logger>;

describe('Resolvers:', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query:', () => {
    it('should return list of players', async () => {
      const players = [
        { id: 1, firstname: 'John', lastname: 'Doe' } as any,
        { id: 2, firstname: 'Jane', lastname: 'Smith' } as any,
      ];
      mockFetchPlayers.mockResolvedValue(players);

      const result = await resolvers.Query.players();

      expect(mockLogger.info).toHaveBeenCalledWith('Fetching players list...');
      expect(mockLogger.info).toHaveBeenCalledWith('Players list fetched successfully');
      expect(result).toEqual(players);
    });

    it('should throw CustomError when fetchPlayers fails', async () => {
      mockFetchPlayers.mockRejectedValue(new Error('DB failure'));

      await expect(resolvers.Query.players()).rejects.toThrow(CustomError);
      expect(mockLogger.info).toHaveBeenCalledWith('Fetching players list...');
    });


    it('should throw error if id not provided', async () => {
      await expect(resolvers.Query.player(null, { id: 0 })).rejects.toThrow(CustomError);
      expect(mockLogger.error).toHaveBeenCalledWith('Player ID not provided');
    });

    it('should return player when found', async () => {
      const players = [
        { id: 1, firstname: 'John', lastname: 'Doe' } as any,
        { id: 2, firstname: 'Jane', lastname: 'Smith' } as any,
      ];
      mockFetchPlayers.mockResolvedValue(players);

      const result = await resolvers.Query.player(null, { id: 1 });

      expect(mockLogger.info).toHaveBeenCalledWith('Fetching player with ID: 1');
      expect(mockLogger.info).toHaveBeenCalledWith('Player found: 1');
      expect(result).toEqual(players[0]);
    });

    it('should throw error when player not found', async () => {
      const players = [
        { id: 1, firstname: 'John', lastname: 'Doe' } as any,
        { id: 2, firstname: 'Jane', lastname: 'Smith' } as any,
      ];
      mockFetchPlayers.mockResolvedValue(players);

      await expect(resolvers.Query.player(null, { id: 999 })).rejects.toThrow(CustomError);
      expect(mockLogger.error).toHaveBeenCalledWith('Player not found with ID: 999');
    });

    it('should throw CustomError when fetchPlayers fails', async () => {
      mockFetchPlayers.mockRejectedValue(new Error('DB failure'));

      await expect(resolvers.Query.player(null, { id: 1 })).rejects.toThrow(CustomError);
    });
  });
});
