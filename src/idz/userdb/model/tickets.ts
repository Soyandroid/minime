export interface Tickets {
  freeCar?: {
    validFrom: Date;
    // Valid To cannot be controlled, it is always 14 days after issue date.
  };
  freeContinue?: {
    validFrom: Date;
    validTo: Date;
  };
  freeExPart?: {
    validFrom: Date;
    ticketAmount: number;
    // Valid To cannot be controlled, it is always 14 days after issue date.
    // Gaining a new ticket increases the ticket amount, but also
    // extends the validFrom by another 14 days
  };
}
