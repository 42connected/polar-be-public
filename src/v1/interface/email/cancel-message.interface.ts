export interface CancelMessage {
  mentorEmail: string;
  mentorSlackId: string;
  cadetEmail: string;
  cadetSlackId: string;
  topic: string;
  rejectMessage: string;
}
