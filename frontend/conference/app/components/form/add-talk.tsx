"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  CalendarIcon,
  HashtagIcon,
  MapPinIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  startHour: z.string().datetime({ message: "Invalid start date and time" }),
  startEnd: z.string().datetime({ message: "Invalid end date and time" }),
  conferenceID: z.number().int().nonnegative(),
  totalSpeakers: z.number().int().nonnegative(),
  totalAttendees: z.number().int().nonnegative(),
  topicsID: z.number().int().nonnegative(),
  nameSpeaker: z.string().min(1, "Speaker name is required"),
});

type FormValues = z.infer<typeof formSchema>;

function AddTalkForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      startHour: "",
      startEnd: "",
      conferenceID: 0,
      totalSpeakers: 0,
      totalAttendees: 0,
      topicsID: 0,
      nameSpeaker: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    // Here you would typically send the data to your API
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create New Event</CardTitle>
        <CardDescription>
          Fill in the details for your upcoming event
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter event name"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter event description"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <MapPinIcon className="w-4 h-4 inline-block mr-1" />
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter event location"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startHour"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                          Start
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            {...field}
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startEnd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                          End
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            {...field}
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="totalSpeakers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <UserIcon className="w-4 h-4 inline-block mr-1" />
                          Speakers
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalAttendees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <UsersIcon className="w-4 h-4 inline-block mr-1" />
                          Attendees
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="topicsID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <HashtagIcon className="w-4 h-4 inline-block mr-1" />
                        Topics ID
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nameSpeaker"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <UserIcon className="w-4 h-4 inline-block mr-1" />
                        Speaker Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter speaker name"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <CardFooter className="px-0">
              <Button type="submit" className="w-full">
                Create Event
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { AddTalkForm };
