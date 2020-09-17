import { UserChargeJson } from "../proto/userCharge";
export interface UpsertUserChargelogApiRequest {
    userId: string;

    userChargelog: {
        chargeId: string,
        price: string,
        purchaseDate: Date,
        playCount: string,
        playerRating: string,
        placeId: string,
        regionId: string,
        clientId: string
    };
    userCharge: UserChargeJson;
}
