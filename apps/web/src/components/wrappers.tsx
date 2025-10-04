import { cva } from "class-variance-authority";

/**
 * Wrapper/container utility for consistent page structure.
 * Adjusts spacing based on usage context (page, individual sections, header, footer).
 */
export const wrapperVariants = cva("container mx-auto max-w-[1380px] px-4", {
  variants: {
    context: {
      page: "pt-24 pb-24",
      section: "pt-18 pb-18",
      header: "h-18",
      footer: "",
    },
  },
  defaultVariants: {
    context: "page",
  },
});
