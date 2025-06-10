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
      className={classNames("mx-auto h-auto w-60 max-w-full", className)}
      {...props}
    >
      <div className="rounded-3xl bg-gray-800 p-1.5 shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(45_55_75_/_20%),_0_2rem_4rem_-2rem_rgb(45_55_75_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(45_55_75_/_20%)] dark:bg-neutral-600 dark:shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(0_0_0_/_20%),_0_2rem_4rem_-2rem_rgb(0_0_0_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(0_0_0_/_20%)]">
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
        "relative z-1 ms-auto me-20 h-auto w-3xl max-w-full rounded-b-lg shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)]",
        className,
      )}
      {...props}
    >
      <div className="relative flex max-w-3xl items-center rounded-t-lg bg-gray-800 px-24 py-2 dark:bg-neutral-700">
        <div className="absolute start-4 top-2/4 flex -translate-y-1 gap-x-1">
          <span className="size-2 rounded-full bg-gray-600 dark:bg-neutral-600"></span>
          <span className="size-2 rounded-full bg-gray-600 dark:bg-neutral-600"></span>
          <span className="size-2 rounded-full bg-gray-600 dark:bg-neutral-600"></span>
        </div>
        <div className="flex size-full items-center justify-center rounded-sm bg-gray-700 text-[.25rem] text-gray-400 sm:text-[.5rem] dark:bg-neutral-600 dark:text-neutral-400">
          {url}
        </div>
      </div>

      <div className="rounded-b-lg bg-gray-800">{children}</div>
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
