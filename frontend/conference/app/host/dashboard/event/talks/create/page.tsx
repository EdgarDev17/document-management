/*
body = {
  "name": "string",
  "description": "string",
  "location": "string",
  "startHour": "2024-08-26T22:29:09.755Z",
  "startEnd": "2024-08-26T22:29:09.755Z",
  "conferenceID": 0,
  "totalSpeakers": 0,
  "totalAttendees": 0,
  "topicsID": 0,
  "nameSpeaker": "string"
}
*/

import { AddTalkForm } from "@/app/components/form/add-talk";

export default async function Page() {
  return (
    <div>
      <AddTalkForm />
    </div>
  );
}
