export interface UserCardItem {
  cardId: number;
  digitalStock: number;
  analogStock: number;
  level: number;
  maxLevel: number;
  exp: number;
  printCount: number;
  useCount: number;
  isNew: boolean;
  kaikaDate: Date | undefined;
  choKaikaDate: Date | undefined;
  skillId: number;
  isAcquired: boolean;
  created: Date;
}
