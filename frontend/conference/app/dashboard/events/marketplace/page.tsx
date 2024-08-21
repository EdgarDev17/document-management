import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

import { auth } from "@/auth";
import { apiClient } from "@/lib/api-service";
import { Conference } from "@/app/host/dashboard/events/columns";
import { formatDateFromString } from "@/lib/utils";

async function getAllEvents(token: string) {
  try {
    const res = await apiClient.get("/conference/conferencesdetailsgeneral", {
      headers: {
        "Authorization-Token": token,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function Page() {
  const session = await auth();
  const events = await getAllEvents(session.accessToken);

  if (!session) {
    return "no auth";
  }

  return (
    <div className="w-full">
      <main className="w-11/12 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <p>Se encontraron: {events.conference.length} conferencias</p>

        <Card className="w-full">
          <CardContent className="w-full flex flex-col justify-center items-center gap-4 p-3">
            {events.conference.map((item: Conference) => {
              const { day: startDay, datetime } = formatDateFromString(
                item.beggingDate.toString(),
              );
              const { day: finishDay, month } = formatDateFromString(
                item.finishDate.toString(),
              );
              return (
                <Card
                  key={item.conferenceID}
                  className="w-full max-w-[800px]  lg:min-w-[700px] border-none "
                >
                  <CardContent className="flex max-h-32 min-h-28 justify-start items-center p-3">
                    <div className="w-[20%] h-full">
                      <div className="w-[120px] h-[100px] flex flex-col justify-center items-center  bg-red-50 rounded-lg">
                        <p className="text-sm text-center">
                          {startDay}-{finishDay} {month}
                        </p>
                        <p className="text-xl font-semibold">{datetime}</p>
                      </div>
                    </div>
                    <div className="w-[60%] bg-red-300 h-[100px] flex flex-col justify-center items-start">
                      <h2 className="font-semibold text-xl">
                        {item.conference_name}
                      </h2>
                      <p>{item.description}</p>
                    </div>
                    <div className="h-full"></div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
