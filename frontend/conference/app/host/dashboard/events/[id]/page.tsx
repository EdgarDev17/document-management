import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import axios from "axios";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { urlConference } from "@/lib/endpoints";

async function fetchCurrentEvent() {
  return axios
    .get(`${urlConference}/ConferencesDetailsSpecific`, {
      params: {
        conferenceID: 1,
      },
      headers: {
        "Authorization-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiWTdLbVNCeTAxaFBPejQzRkhCVUVYQXpRR1dSS3pScWk1RFE2QSs5Z1pvaz0iLCJjb21wbGV0ZVByb2ZpbGUiOnRydWUsImNvdW50cnlJRCI6MSwiZXhwaXJhdGlvbkRhdGUiOiIyMDI0LTA4LTEzVDAwOjM0OjA2LjE5NjM2NDktMDY6MDAiLCJzdGF0ZSI6dHJ1ZX0.uEeVDHW2GpC3KhGINOu4TVsLV6LBWPGHD3d46lt90vE",
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    })
    .finally(function () {
      // always executed
    });
}

async function fetchTopicsById() {
  return axios
    .get(
      `${urlConference}/ConferencesListTopicsByConferenceID`,
      {
        params: {
          conferenceID: 1,
        },
        headers: {
          "Authorization-Token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiWTdLbVNCeTAxaFBPejQzRkhCVUVYQXpRR1dSS3pScWk1RFE2QSs5Z1pvaz0iLCJjb21wbGV0ZVByb2ZpbGUiOnRydWUsImNvdW50cnlJRCI6MSwiZXhwaXJhdGlvbkRhdGUiOiIyMDI0LTA4LTEzVDAwOjM0OjA2LjE5NjM2NDktMDY6MDAiLCJzdGF0ZSI6dHJ1ZX0.uEeVDHW2GpC3KhGINOu4TVsLV6LBWPGHD3d46lt90vE",
        },
      },
    )
    .then(function (response) {
      // console.log({ ropicsR: response.data.topics });
      return response.data.topics;
    })
    .catch(function (error) {
      console.log({ ropicsE: error });

      return error;
    });
}

export default async function Page({ params }: { params: { id: string } }) {
  const eventData = await fetchCurrentEvent();
  const topicsData = await fetchTopicsById();

  const [event, topics] = await Promise.all([eventData, topicsData]);

  if (topics.length === 0 || !topics) {
    return <p>Loading...</p>;
  }

  console.log(topics);
  return (
    <div>
      <div className="flex justify-between items-center">
        <Card className="w-[30%]">
          <CardHeader>
            <CardTitle>Participantes</CardTitle>
            <CardDescription>Numero de usuarios registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
        <Card className="w-[30%]">
          <CardHeader>
            <CardTitle>Charlas</CardTitle>
            <CardDescription>Numero de charlas creadas</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
        <Card className="w-[30%]">
          <CardHeader>
            <CardTitle>Fechas</CardTitle>
            <CardDescription>Fecha de inicio y finalización</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <DataTable columns={columns} data={topics} />
      </div>
    </div>
  );
}
