"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ChevronIcon from "@/components/icons/ChevronIcon";
import RouteSelectPanel from "../RouteSelectPanel/RouteSelectPanel";
import { ROUTES } from "@/consts/routes";
import type { Direction } from "@/consts";
import { devClassName } from "@/lib/devClassName";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface RouteSelectProps {
  direction: Direction;
  value: number | "all";
  onChange: (value: number | "all") => void;
}

export default function RouteSelect({
  direction,
  value,
  onChange,
}: RouteSelectProps) {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const { isLgUp } = useMediaQuery();

  useLockBodyScroll(open && !isLgUp);

  useEffect(() => {
    if (!open) {
      const hideTimeout = setTimeout(() => setVisible(false), 0);
      const unmountTimeout = setTimeout(() => setMounted(false), 300);
      return () => {
        clearTimeout(hideTimeout);
        clearTimeout(unmountTimeout);
      };
    }
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  const activeRoute =
    value === "all" ? null : ROUTES.find((r) => r.id === value);
  const label = activeRoute
    ? direction === "west"
      ? `${t(activeRoute.to)} → ${t(activeRoute.from)}`
      : `${t(activeRoute.from)} → ${t(activeRoute.to)}`
    : t("routeSelectAll");

  const handleOpen = () => {
    if (!open) setMounted(true);
    setOpen(true);
  };

  return (
    <div className={`${devClassName("route-select")}relative`}>
      <button
        type="button"
        onClick={handleOpen}
        className="text-green flex w-full cursor-pointer items-center justify-between gap-2 rounded-[18px] border-2 border-[#CCCCCC66] bg-white p-[15px] px-5 text-[14px] font-bold tracking-[0.02em]"
      >
        <span className="truncate">{label}</span>
        <ChevronIcon className="h-4 w-4 shrink-0" />
      </button>

      <div
        className={`fixed inset-0 z-[1010] bg-black/80 transition-opacity duration-300 ease-in-out lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      {open && (
        <div
          className="fixed inset-0 z-[1010] hidden lg:block"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      {mounted && (
        <div
          className={`fixed right-5 bottom-5 left-5 z-[1011] max-h-[80dvh] overflow-y-auto transition-[transform,opacity] duration-300 ease-in-out lg:absolute lg:inset-x-0 lg:top-full lg:right-auto lg:bottom-auto lg:left-0 lg:mt-2 lg:max-h-none lg:translate-y-0 lg:overflow-visible ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-[calc(100%+20px)] opacity-0 lg:translate-y-0"
          }`}
          role="dialog"
          aria-modal="true"
          aria-hidden={!open}
        >
          <RouteSelectPanel
            title={t("routeSelectAll")}
            onClose={() => setOpen(false)}
            activeId={value}
            onSelect={(id) => {
              onChange(id);
              setOpen(false);
            }}
            allLabel={t("routeSelectAll")}
            direction={direction}
            className="bg-white"
          />
        </div>
      )}
    </div>
  );
}
