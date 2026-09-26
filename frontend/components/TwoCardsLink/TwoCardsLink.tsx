"use client";

import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import LinkCard from "./LinkCard";
import { fetchTwoLinksCard } from "@/hooks/useApiEndpoint/api";
import { devClassName } from "@/lib/devClassName";
import type { TwoLinksCardData } from "@/types/api";

export type TwoCardsLinkVariant = "white" | "green";

const variantClasses: Record<
  TwoCardsLinkVariant,
  { section: string; card: string; button: string; spinner: string }
> = {
  // White cards on a green band (About Us `whiteCards`).
  white: {
    section: "bg-green",
    card: "bg-white",
    button: "bg-[#fdd021]!",
    spinner: "text-white/70!",
  },
  // Pale green cards on the page's white background (About Us `greenCards`).
  green: {
    section: "",
    card: "bg-[var(--color-green-pale)]",
    button: "bg-[var(--color-green-light)]!",
    spinner: "text-green!",
  },
};

export interface TwoCardsLinkProps {
  locale: string;
  /** API endpoint (e.g. "/api/about-uses") of the content type holding the CMS two-links-card component. */
  endpoint: string;
  /** Field name of the two-links-card component on that content type (e.g. "whiteCards"). */
  field: string;
  variant?: TwoCardsLinkVariant;
  className?: string;
}

export default function TwoCardsLink({
  locale,
  endpoint,
  field,
  variant = "white",
  className = "",
}: TwoCardsLinkProps) {
  // undefined = still loading; null = page has no cards block
  const [data, setData] = useState<TwoLinksCardData | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when inputs change before the refetch resolves
    setData(undefined);

    fetchTwoLinksCard(locale, endpoint, field)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale, endpoint, field]);

  const classes = variantClasses[variant];

  if (data === undefined) {
    return (
      <section
        className={`${devClassName("two-cards-link")}borderless bg-green flex justify-center py-5 lg:py-10 ${classes.section} ${className}`}
        role="status"
        aria-label="Loading"
      >
        <CircularProgress size={50} className={classes.spinner} />
      </section>
    );
  }

  const cards = [data?.leftCard, data?.rightCard].filter((card) => !!card);
  if (!cards.length) return null;

  return (
    <section
      className={`${devClassName("two-cards-link")}borderless bg-green py-5 lg:py-10 ${classes.section} ${className}`}
    >
      <div className="sectionContainer content-max-w flex-col gap-5 md:flex-row lg:max-w-[1440px] lg:gap-10">
        {cards.map((card) => (
          <LinkCard
            key={card.id}
            card={card}
            className={classes.card}
            buttonClassName={classes.button}
          />
        ))}
      </div>
    </section>
  );
}
