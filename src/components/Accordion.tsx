import React, { useEffect } from "react";

declare global {
  interface Window {
    HSAccordion: {
      autoInit: () => void;
    };
  }
}

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
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  alwaysOpen = false,
  noArrow = false,
}) => {
  useEffect(() => {
    setTimeout(() => {
      if (window.HSAccordion) {
        window.HSAccordion.autoInit();
      }
    }, 100);
  }, [items, alwaysOpen]);

  const accordionGroupProps = {
    className: "hs-accordion-group",
    ...(alwaysOpen === true && { "data-hs-accordion-always-open": "" }),
  };

  return (
    <div {...accordionGroupProps}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`hs-accordion ${item.defaultOpen ? "active" : ""}`}
          id={`hs-basic-heading-${item.id}`}
        >
          <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 dark:hs-accordion-active:text-blue-500 inline-flex w-full items-center gap-x-3 rounded-lg py-3 text-start font-semibold text-gray-800 hover:text-gray-500 focus:text-gray-500 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
            aria-controls={`hs-basic-collapse-${item.id}`}
            aria-expanded={item.defaultOpen ? "true" : "false"}
          >
            {!noArrow && (
              <>
                <svg
                  className="hs-accordion-active:hidden block size-3.5"
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
                  className="hs-accordion-active:block hidden size-3.5"
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
          </button>
          <div
            id={`hs-basic-collapse-${item.id}`}
            className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
              !item.defaultOpen ? "hidden" : ""
            }`}
            aria-labelledby={`hs-basic-heading-${item.id}`}
          >
            <div className="p-5">
              <p className="text-gray-800 dark:text-neutral-200">
                {item.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
