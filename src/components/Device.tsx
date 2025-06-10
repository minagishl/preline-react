import { FC, HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

// --- Sub-components ---

const Mobile: FC<HTMLAttributes<HTMLElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <figure
      className={classNames("mx-auto max-w-full w-60 h-auto", className)}
      {...props}
    >
      <div className="p-1.5 bg-gray-800 shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(45_55_75_/_20%),_0_2rem_4rem_-2rem_rgb(45_55_75_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(45_55_75_/_20%)] dark:bg-neutral-600 dark:shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(0_0_0_/_20%),_0_2rem_4rem_-2rem_rgb(0_0_0_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(0_0_0_/_20%)] rounded-3xl">
        {children}
      </div>
    </figure>
  );
};
Mobile.displayName = "Device.Mobile";

interface BrowserProps extends HTMLAttributes<HTMLElement> {
  url?: string;
}

const Browser: FC<BrowserProps> = ({
  className,
  children,
  url = "www.preline.co",
  ...props
}) => {
  return (
    <figure
      className={classNames(
        "ms-auto me-20 relative z-1 max-w-full w-3xl h-auto shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)] rounded-b-lg",
        className
      )}
      {...props}
    >
      <div className="relative flex items-center max-w-3xl bg-gray-800 rounded-t-lg py-2 px-24 dark:bg-neutral-700">
        <div className="flex gap-x-1 absolute top-2/4 start-4 -translate-y-1">
          <span className="size-2 bg-gray-600 rounded-full dark:bg-neutral-600"></span>
          <span className="size-2 bg-gray-600 rounded-full dark:bg-neutral-600"></span>
          <span className="size-2 bg-gray-600 rounded-full dark:bg-neutral-600"></span>
        </div>
        <div className="flex justify-center items-center size-full bg-gray-700 text-[.25rem] text-gray-400 rounded-sm sm:text-[.5rem] dark:bg-neutral-600 dark:text-neutral-400">
          {url}
        </div>
      </div>

      <div className="bg-gray-800 rounded-b-lg">{children}</div>
    </figure>
  );
};
Browser.displayName = "Device.Browser";

// --- Main Device component ---

export interface DeviceProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

type DeviceComponent = FC<DeviceProps> & {
  Mobile: FC<HTMLAttributes<HTMLElement>>;
  Browser: FC<BrowserProps>;
};

const Device: DeviceComponent = ({ children, className, ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

Device.Mobile = Mobile;
Device.Browser = Browser;

export default Device;
