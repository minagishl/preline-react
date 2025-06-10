import {
  createContext,
  useContext,
  useState,
  useRef,
  FC,
  HTMLAttributes,
  ReactNode,
  ButtonHTMLAttributes,
  useEffect,
  cloneElement,
  isValidElement,
} from "react";
import classNames from "classnames";

interface CollapseContextProps {
  isOpen: boolean;
  toggle: () => void;
}

const CollapseContext = createContext<CollapseContextProps | null>(null);

const useCollapse = () => {
  const context = useContext(CollapseContext);
  if (!context) {
    throw new Error("useCollapse must be used within a Collapse provider");
  }
  return context;
};

// --- Sub-components ---

const Icon: FC<HTMLAttributes<SVGElement>> = ({ className, ...props }) => {
  const { isOpen } = useCollapse();
  return (
    <svg
      className={classNames(
        "size-4 shrink-0 transition-transform duration-300",
        { "rotate-180": isOpen },
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  );
};
Icon.displayName = "Collapse.Icon";

interface CollapseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

// Collapse.Button
const Button: FC<CollapseButtonProps> = ({
  className,
  children,
  asChild = false,
  ...props
}) => {
  const { toggle, isOpen } = useCollapse();

  const commonProps = {
    onClick: toggle,
    "data-state": isOpen ? "open" : "closed",
  };

  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return cloneElement(child, {
      ...props,
      ...commonProps,
      className: classNames(child.props.className, className),
    });
  }

  return (
    <button type="button" className={className} {...commonProps} {...props}>
      {children}
    </button>
  );
};
Button.displayName = "Collapse.Button";

// Collapse.Content
const Content: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  const { isOpen } = useCollapse();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    isOpen ? undefined : 0,
  );

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={classNames(
        "w-full overflow-hidden transition-[height] duration-300",
        className,
      )}
      style={{ height }}
      {...props}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
};
Content.displayName = "Collapse.Content";

interface TriggerLinkProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  openText: string;
  closedText: string;
}

const TriggerLink: FC<TriggerLinkProps> = ({
  openText,
  closedText,
  className,
  ...props
}) => {
  const { isOpen, toggle } = useCollapse();

  return (
    <button
      type="button"
      onClick={toggle}
      className={classNames(
        "inline-flex items-center gap-x-1 rounded-lg border border-transparent text-sm font-semibold text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:text-blue-700 focus:underline focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600",
        className,
      )}
      {...props}
    >
      <span>{isOpen ? openText : closedText}</span>
      <Icon />
    </button>
  );
};
TriggerLink.displayName = "Collapse.TriggerLink";

// --- Main Collapse component ---

export interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  children: ReactNode;
}

type CollapseComponent = FC<CollapseProps> & {
  Button: FC<CollapseButtonProps>;
  Content: FC<HTMLAttributes<HTMLDivElement>>;
  Icon: FC<HTMLAttributes<SVGElement>>;
  TriggerLink: FC<TriggerLinkProps>;
};

const Collapse: CollapseComponent = ({
  className,
  defaultOpen = false,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <CollapseContext.Provider value={{ isOpen, toggle }}>
      <div
        className={classNames("group", className)}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        {children}
      </div>
    </CollapseContext.Provider>
  );
};

Collapse.Button = Button;
Collapse.Content = Content;
Collapse.Icon = Icon;
Collapse.TriggerLink = TriggerLink;

export default Collapse;
