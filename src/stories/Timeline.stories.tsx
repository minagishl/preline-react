import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Timeline from "../components/Timeline";
import usePreline from "../hooks/usePreline";

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => {
      usePreline();
      const StoryComponent = Story as React.ComponentType;
      return <StoryComponent />;
    },
  ],
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Timeline>;

const FileIcon = () => (
  <svg
    className="mt-1 size-4 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" x2="8" y1="13" y2="13"></line>
    <line x1="16" x2="8" y1="17" y2="17"></line>
    <line x1="10" x2="8" y1="9" y2="9"></line>
  </svg>
);

interface Event {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  author?: {
    name: string;
    avatar?: string;
    initials?: string;
  };
}

interface Day {
  date: string;
  events: Event[];
}

const timelineData: Day[] = [
  {
    date: "1 Aug, 2023",
    events: [
      {
        title: 'Created "Preline in React" task',
        icon: <FileIcon />,
        description: "Find more detailed insctructions here.",
        author: {
          name: "James Collins",
          avatar:
            "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8auto=format&fit=facearea&facepad=3&w=320&h=320&q=80",
        },
      },
      {
        title: "Release v5.2.0 quick bug fix 🐞",
        author: {
          name: "Alex Gregarov",
          initials: "A",
        },
      },
      {
        title: 'Marked "Install Charts" completed',
        description: "Finally! You can check it out here.",
        author: {
          name: "James Collins",
          avatar:
            "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80",
        },
      },
    ],
  },
  {
    date: "31 Jul, 2023",
    events: [
      {
        title: "Take a break ⛳️",
        description: "Just chill for now... 😉",
      },
    ],
  },
];

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Timeline>
        {timelineData.map((day) => (
          <React.Fragment key={day.date}>
            <Timeline.Heading>{day.date}</Timeline.Heading>
            {day.events.map((event) => (
              <Timeline.Item key={event.title}>
                <Timeline.Icon />
                <Timeline.Body>
                  <Timeline.Title>
                    {event.icon}
                    {event.title}
                  </Timeline.Title>
                  {event.description && (
                    <Timeline.Text>{event.description}</Timeline.Text>
                  )}
                  {event.author && (
                    <button
                      type="button"
                      className="-ms-1 mt-1 inline-flex items-center gap-x-2 rounded-lg border border-transparent p-1 text-xs text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
                      {event.author.avatar ? (
                        <img
                          className="size-4 shrink-0 rounded-full"
                          src={event.author.avatar}
                          alt="Avatar"
                        />
                      ) : (
                        <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-[10px] font-semibold text-gray-600 uppercase dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                          {event.author.initials}
                        </span>
                      )}
                      {event.author.name}
                    </button>
                  )}
                </Timeline.Body>
              </Timeline.Item>
            ))}
          </React.Fragment>
        ))}
      </Timeline>
    </div>
  ),
};

const olderData: Day = {
  date: "30 Jul, 2023",
  events: [
    {
      title: "Final touch ups",
      description: "Double check everything and make sure we're ready to go.",
    },
  ],
};

export const Collapsible: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Timeline>
        {timelineData.map((day) => (
          <React.Fragment key={day.date}>
            <Timeline.Heading>{day.date}</Timeline.Heading>
            {day.events.map((event) => (
              <Timeline.Item key={event.title}>
                <Timeline.Icon />
                <Timeline.Body>
                  <Timeline.Title>
                    {event.icon}
                    {event.title}
                  </Timeline.Title>
                  {event.description && (
                    <Timeline.Text>{event.description}</Timeline.Text>
                  )}
                  {event.author && (
                    <button
                      type="button"
                      className="-ms-1 mt-1 inline-flex items-center gap-x-2 rounded-lg border border-transparent p-1 text-xs text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
                      {event.author.avatar ? (
                        <img
                          className="size-4 shrink-0 rounded-full"
                          src={event.author.avatar}
                          alt="Avatar"
                        />
                      ) : (
                        <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-[10px] font-semibold text-gray-600 uppercase dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                          {event.author.initials}
                        </span>
                      )}
                      {event.author.name}
                    </button>
                  )}
                </Timeline.Body>
              </Timeline.Item>
            ))}
          </React.Fragment>
        ))}

        <Timeline.Collapse id="hs-timeline-collapse">
          <Timeline.Heading>{olderData.date}</Timeline.Heading>
          {olderData.events.map((event) => (
            <Timeline.Item key={event.title}>
              <Timeline.Icon />
              <Timeline.Body>
                <Timeline.Title>{event.title}</Timeline.Title>
                <Timeline.Text>{event.description}</Timeline.Text>
              </Timeline.Body>
            </Timeline.Item>
          ))}
        </Timeline.Collapse>

        <Timeline.CollapseButton target="#hs-timeline-collapse">
          Show older
        </Timeline.CollapseButton>
      </Timeline>
    </div>
  ),
};
