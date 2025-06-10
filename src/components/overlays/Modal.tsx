import {
  cloneElement,
  createContext,
  FC,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useContext,
  useId,
} from "react";
import classNames from "classnames";

// --- Context ---
interface ModalContextProps {
  modalId: string;
}

const ModalContext = createContext<ModalContextProps | null>(null);

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a Modal provider");
  }
  return context;
};

// --- Sub-components ---

const Header: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={classNames(
      "flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-neutral-700",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
Header.displayName = "Modal.Header";

const Title: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h3
    className={classNames("font-bold text-gray-800 dark:text-white", className)}
    {...props}
  >
    {children}
  </h3>
);
Title.displayName = "Modal.Title";

const Body: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={classNames("overflow-y-auto p-4", className)} {...props}>
    {children}
  </div>
);
Body.displayName = "Modal.Body";

const Footer: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={classNames(
      "flex items-center justify-end gap-x-2 border-t border-gray-200 px-4 py-3 dark:border-neutral-700",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
Footer.displayName = "Modal.Footer";

const CloseButton: FC<HTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const { modalId } = useModal();
  return (
    <button
      type="button"
      className={classNames(
        "inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600",
        className,
      )}
      aria-label="Close"
      data-hs-overlay={`#${modalId}`}
      {...props}
    >
      <span className="sr-only">Close</span>
      <svg
        className="size-4 shrink-0"
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
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    </button>
  );
};
CloseButton.displayName = "Modal.CloseButton";

const Trigger: FC<{ children: ReactElement; asChild?: boolean }> = ({
  children,
  asChild = true,
}) => {
  const { modalId } = useModal();
  if (asChild) {
    return cloneElement(children, { "data-hs-overlay": `#${modalId}` });
  }
  return (
    <button type="button" data-hs-overlay={`#${modalId}`}>
      {children}
    </button>
  );
};
Trigger.displayName = "Modal.Trigger";

const Close: FC<{ children: ReactElement; asChild?: boolean }> = ({
  children,
  asChild = true,
}) => {
  const { modalId } = useModal();
  if (asChild) {
    return cloneElement(children, { "data-hs-overlay": `#${modalId}` });
  }
  return (
    <button type="button" data-hs-overlay={`#${modalId}`}>
      {children}
    </button>
  );
};
Close.displayName = "Modal.Close";

type ModalSize = "sm" | "md" | "lg" | "xl";

type Animation = "scale" | "slide-down" | "slide-up" | "none";

const sizeClasses: Record<ModalSize, string> = {
  sm: "sm:max-w-lg sm:w-full",
  md: "md:max-w-2xl md:w-full",
  lg: "lg:max-w-4xl lg:w-full",
  xl: "xl:max-w-6xl xl:w-full",
};

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  size?: ModalSize;
  animation?: Animation;
  centered?: boolean;
  scroll?: "inside" | "outside";
  staticBackdrop?: boolean;
}

const Content: FC<ContentProps> = ({
  children,
  className,
  size = "sm",
  animation = "none",
  centered = false,
  scroll = "outside",
  staticBackdrop = false,
  ...props
}) => {
  const { modalId } = useModal();
  const overlayClasses = classNames(
    "hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden transition-all overflow-y-auto pointer-events-none",
    {
      "[--overlay-backdrop:static]": staticBackdrop,
      "opacity-0 hs-overlay-open:opacity-100 hs-overlay-open:duration-500":
        animation === "none",
    },
  );

  const contentContainerClasses = classNames(
    "m-3 sm:mx-auto",
    sizeClasses[size],
    {
      "hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200":
        animation === "scale",
      "hs-overlay-animation-target hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all":
        animation === "slide-down",
      "hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 opacity-0 ease-out transition-all":
        animation === "slide-up",
      "min-h-[calc(100%-56px)] flex items-center": centered,
      "h-[calc(100%-56px)]": scroll === "inside",
    },
    className,
  );

  return (
    <div
      id={modalId}
      className={overlayClasses}
      data-hs-overlay-keyboard={!staticBackdrop}
      {...props}
    >
      <div className={contentContainerClasses}>
        <div
          className={classNames(
            "pointer-events-auto flex w-full flex-col rounded-xl border border-gray-200 bg-white shadow-2xs dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-700/70",
            { "max-h-full overflow-hidden": scroll === "inside" },
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
Content.displayName = "Modal.Content";

// --- Main component ---
interface ModalProps {
  children: ReactNode;
}

type ModalComponent = FC<ModalProps> & {
  Trigger: FC<{ children: ReactElement; asChild?: boolean }>;
  Content: FC<ContentProps>;
  Header: FC<HTMLAttributes<HTMLDivElement>>;
  Title: FC<HTMLAttributes<HTMLHeadingElement>>;
  Body: FC<HTMLAttributes<HTMLDivElement>>;
  Footer: FC<HTMLAttributes<HTMLDivElement>>;
  CloseButton: FC<HTMLAttributes<HTMLButtonElement>>;
  Close: FC<{ children: ReactElement; asChild?: boolean }>;
};

const Modal: ModalComponent = ({ children }) => {
  const modalId = useId().replace(/:/g, "");
  return (
    <ModalContext.Provider value={{ modalId }}>
      {children}
    </ModalContext.Provider>
  );
};

Modal.Trigger = Trigger;
Modal.Content = Content;
Modal.Header = Header;
Modal.Title = Title;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.CloseButton = CloseButton;
Modal.Close = Close;

export default Modal;
