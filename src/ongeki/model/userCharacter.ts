export interface UserCharacterItem {
  characterId: number;
  playCount: number;
  intimateLevel: number;
  intimateCount: number;
  intimateCountRewarded: number;

  /** Added in Ongeki Plus */
  intimateCountDate: Date | undefined;

  isNew: boolean;
}
