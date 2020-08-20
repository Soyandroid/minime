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
  kaikaDate: Date;
  choKaikaDate: Date;
  skillId: number;
  isAcquired: boolean;
  created: Date;
}
