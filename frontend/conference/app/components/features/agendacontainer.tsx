"use client";
import { ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const AgendaContainer = ({ agenda }: { agenda: [] }) => {
  return (
    <ol className="relative px-3 border-l border-gray-200 dark:border-gray-700">
      {agenda.map((item, index) => (
        <li key={index} className="mb-10 ml-6 cursor-pointer">
          <Link
            href={`/dashboard/events/marketplace/event/talk/${item.topicsID}`}
          >
            <span className="absolute flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <ClockIcon className="w-5 h-5 text-blue-800 dark:text-blue-300" />
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              {item.name}
              {item.ponente && (
                <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
                  Edgardo Antonio Rodriguez
                </span>
              )}
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {item.startHour}
            </time>

            {/*
          {item.ponentes && (
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Ponentes: {item.ponentes.join(", ")}
            </p>
          )}
          */}
          </Link>
        </li>
      ))}
    </ol>
  );
};

export { AgendaContainer };
