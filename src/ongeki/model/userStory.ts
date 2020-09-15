export interface UserStoryItem {
  storyId: number;

  /** Added in Ongeki Summer */
  jewelCount: number | undefined;

  lastChapterId: number;

  /** Added in Ongeki Summer */
  lastPlayMusicId: number | undefined;
  lastPlayMusicCategory: number | undefined;
  lastPlayMusicLevel: number | undefined;
};
