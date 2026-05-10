import { Fragment, ReactNode } from "react";

/**
 * Render a string and color any ✓ in green, any ✗ in red.
 */
export const renderColoredMarks = (text: string): ReactNode => {
  const parts = text.split(/(✓|✗)/g);
  return parts.map((p, i) => {
    if (p === "✓") return <span key={i} className="text-green-600 font-bold">✓</span>;
    if (p === "✗") return <span key={i} className="text-red-600 font-bold">✗</span>;
    return <Fragment key={i}>{p}</Fragment>;
  });
};
