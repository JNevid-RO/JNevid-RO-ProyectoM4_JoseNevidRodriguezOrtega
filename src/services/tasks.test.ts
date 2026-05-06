import { describe, it, expect, vi, beforeEach } from 'vitest';
import { addDoc, collection } from 'firebase/firestore';
import { createTask } from '../services/tasks';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  addDoc: vi.fn(),
  collection: vi.fn(),
  serverTimestamp: vi.fn(() => 'mock-timestamp')
}));

describe('tasks service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createTask', () => {
    it('creates a task with correct data', async () => {
      const mockAddDoc = vi.mocked(addDoc);
      const mockCollection = vi.mocked(collection);

      mockAddDoc.mockResolvedValue({ id: 'task-id' } as any);
      mockCollection.mockReturnValue('mock-collection' as any);

      const result = await createTask('user123', {
        title: 'Test Task',
        description: 'Test Description'
      });

      expect(mockCollection).toHaveBeenCalledWith(undefined, 'tasks');
      expect(mockAddDoc).toHaveBeenCalledWith('mock-collection', {
        userId: 'user123',
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        createdAt: 'mock-timestamp',
        updatedAt: 'mock-timestamp'
      });
    });
  });
});