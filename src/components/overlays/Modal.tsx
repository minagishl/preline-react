import {
  cloneElement,
  createContext,
  FC,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/classNames";

type OverlayChildProps = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & Record<string, unknown>;

export type ModalSize = "sm" | "md" | "lg" | "xl";
export type ModalAnimation = "scale" | "slide-down" | "slide-up" | "none";

interface ModalContextValue {
  modalId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("Modal components must be used within <Modal>.");
  return context;
};

const focusableSelector =
  'a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Header: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "border-overlay-header flex items-center justify-between border-b px-4 py-3",
      className,
    )}
    {...props}
  />
);
Header.displayName = "Modal.Header";

const Title: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h3 className={cn("text-foreground font-semibold", className)} {...props} />
);
Title.displayName = "Modal.Title";

const Body: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("overflow-y-auto p-4", className)} {...props} />
);
Body.displayName = "Modal.Body";

const Footer: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "border-overlay-header flex items-center justify-end gap-x-2 border-t px-4 py-3",
      className,
    )}
    {...props}
  />
);
Footer.displayName = "Modal.Footer";

const CloseButton: FC<HTMLAttributes<HTMLButtonElement>> = ({
  className,
  onClick,
  ...props
}) => {
  const { modalId, setOpen } = useModalContext();
  return (
    <button
      type="button"
      aria-label="Close"
      data-hs-overlay={`#${modalId}`}
      className={cn(
        "border-surface-line bg-surface text-surface-foreground hover:bg-surface-hover focus:bg-surface-focus inline-flex size-8 items-center justify-center rounded-full border focus:outline-hidden disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(false);
      }}
      {...props}
    >
      <span className="sr-only">Close</span>
      <X className="size-4 shrink-0" aria-hidden="true" />
    </button>
  );
};
CloseButton.displayName = "Modal.CloseButton";

const Trigger: FC<{
  children: ReactElement<OverlayChildProps>;
  asChild?: boolean;
}> = ({ children, asChild = true }) => {
  const { modalId, open, setOpen } = useModalContext();
  const child = cloneElement(children, {
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": modalId,
    "data-hs-overlay": `#${modalId}`,
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      children.props.onClick?.(event);
      if (!event.defaultPrevented) setOpen(true);
    },
  });
  return asChild ? child : <button type="button">{child}</button>;
};
Trigger.displayName = "Modal.Trigger";

const Close: FC<{
  children: ReactElement<OverlayChildProps>;
  asChild?: boolean;
}> = ({ children, asChild = true }) => {
  const { modalId, setOpen } = useModalContext();
  const child = cloneElement(children, {
    "data-hs-overlay": `#${modalId}`,
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      children.props.onClick?.(event);
      if (!event.defaultPrevented) setOpen(false);
    },
  });
  return asChild ? child : <button type="button">{child}</button>;
};
Close.displayName = "Modal.Close";

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  size?: ModalSize;
  animation?: ModalAnimation;
  centered?: boolean;
  scroll?: "inside" | "outside";
  /** Prevents closing from Escape and backdrop clicks. */
  staticBackdrop?: boolean;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  bodyScroll?: boolean;
  autoFocus?: boolean;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "sm:max-w-lg sm:w-full",
  md: "md:max-w-2xl md:w-full",
  lg: "lg:max-w-4xl lg:w-full",
  xl: "lg:max-w-6xl lg:w-full",
};

const Content: FC<ModalContentProps> = ({
  children,
  className,
  size = "sm",
  animation = "none",
  centered = false,
  scroll = "outside",
  staticBackdrop = false,
  closeOnEscape = !staticBackdrop,
  closeOnOutsideClick = !staticBackdrop,
  bodyScroll = false,
  autoFocus = true,
  ...props
}) => {
  const { modalId, open, setOpen } = useModalContext();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    if (!bodyScroll) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [bodyScroll, open]);

  useEffect(() => {
    if (!open) {
      restoreFocusRef.current?.focus();
      return;
    }
    const panel = panelRef.current;
    if (autoFocus && panel) {
      const first = panel.querySelector<HTMLElement>(focusableSelector);
      (first ?? panel).focus();
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(focusableSelector),
      );
      if (!focusable.length) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [autoFocus, closeOnEscape, open, setOpen]);

  if (!open) return null;

  const animationClass =
    animation === "scale"
      ? "scale-100 opacity-100"
      : animation === "slide-up"
        ? "mt-7 opacity-100"
        : animation === "slide-down"
          ? "mt-7 opacity-100"
          : "opacity-100";

  return (
    <div
      id={modalId}
      className="hs-overlay fixed inset-s-0 top-0 z-80 size-full overflow-x-hidden overflow-y-auto bg-black/30 p-3 transition-opacity duration-200"
      role="dialog"
      aria-modal={!bodyScroll}
      tabIndex={-1}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && closeOnOutsideClick)
          setOpen(false);
      }}
      {...props}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "bg-overlay border-overlay-line pointer-events-auto mx-auto flex w-full flex-col rounded-xl border shadow-2xs transition-all duration-200",
          sizeClasses[size],
          centered
            ? "min-h-[calc(100%-24px)] items-stretch justify-center"
            : "my-4",
          scroll === "inside" && "max-h-[calc(100vh-24px)] overflow-hidden",
          animationClass,
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
Content.displayName = "Modal.Content";

export interface ModalProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

type ModalComponent = FC<ModalProps> & {
  Trigger: typeof Trigger;
  Content: typeof Content;
  Header: typeof Header;
  Title: typeof Title;
  Body: typeof Body;
  Footer: typeof Footer;
  CloseButton: typeof CloseButton;
  Close: typeof Close;
};

const Modal: ModalComponent = ({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
}) => {
  const modalId = useId().replace(/:/g, "");
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    if (open === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <ModalContext.Provider value={{ modalId, open: isOpen, setOpen }}>
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
