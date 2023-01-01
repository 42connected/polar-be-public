export interface ReservationMessage {
  mentorEmail: string;
  mentorSlackId: string;
  cadetEmail: string;
  cadetSlackId: string;
  topic: string;
  reservationTime1: Date[];
  reservationTime2?: Date[];
  reservationTime3?: Date[];
  isCommon: boolean;
}
