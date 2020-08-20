import { RepositoryN } from "./_defs";
import { UserDeckItem } from "../model/userDeck";
import { Id } from "../../model";

export interface UserDeckRepository extends RepositoryN<UserDeckItem> {
}
