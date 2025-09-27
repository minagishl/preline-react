import React, { useState, useRef, useEffect } from "react";

export interface AccordionItemProps {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  alwaysOpen?: boolean;
  noArrow?: boolean;
  durationMs?: number;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  alwaysOpen = false,
  noArrow = false,
  durationMs = 300,
}) => {
  // Manage which id is open in the state
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const init = new Set<string>();
    items.forEach((item) => {
      if (item.defaultOpen) init.add(item.id);
    });
    return init;
  });

  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!alwaysOpen) newSet.clear();
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    openItems.forEach((id) => {
      const el = contentRefs.current[id];
      if (el) {
        const full = el.scrollHeight;
        el.style.height = full + "px";
      }
    });

    // Close setting
    items.forEach(({ id }) => {
      if (!openItems.has(id)) {
        const el = contentRefs.current[id];
        if (el) {
          el.style.height = "0px";
        }
      }
    });
  }, [openItems, items]);

  return (
    <div className="hs-accordion-group">
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div
            key={item.id}
            className={`hs-accordion ${isOpen ? "active" : ""}`}
            id={`hs-basic-heading-${item.id}`}
          >
            <button
              className="hs-accordion-toggle hs-accordion-active:text-blue-600 dark:hs-accordion-active:text-blue-500 inline-flex w-full items-center justify-between rounded-lg py-3 text-start font-semibold text-gray-800 hover:text-gray-500 focus:text-gray-500 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
              aria-controls={`hs-basic-collapse-${item.id}`}
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              type="button"
            >
              <span className="flex items-center gap-x-3">
                {!noArrow && (
                  <>
                    <svg
                      className={`${isOpen ? "hidden" : "block"} size-3.5`}
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
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    <svg
                      className={`${isOpen ? "block" : "hidden"} size-3.5`}
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
                      <path d="M5 12h14" />
                    </svg>
                  </>
                )}
                {item.title}
              </span>
            </button>
            <div
              id={`hs-basic-collapse-${item.id}`}
              ref={(el) => {
                contentRefs.current[item.id] = el;
              }}
              className="hs-accordion-content overflow-hidden"
              aria-labelledby={`hs-basic-heading-${item.id}`}
              style={{
                height: isOpen
                  ? `${contentRefs.current[item.id]?.scrollHeight}px`
                  : "0px",
                transition: `height ${durationMs}ms ease`,
              }}
            >
              <div className="p-5">
                <p className="text-gray-800 dark:text-neutral-200">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
