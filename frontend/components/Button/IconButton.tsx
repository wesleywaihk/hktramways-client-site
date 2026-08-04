"use client";

import Link from "next/link";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import { getActionButtonStartIcon } from "@/components/icons/actionButtonIcon";
import type { ActionButtonStartIcon } from "@/types/api";

type IconButtonProps = {
  href?: string;
  onClick?: () => void;
  className?: string;
  startIcon?: ActionButtonStartIcon | null;
  tooltip?: TooltipProps["title"] | undefined;
  placement?: TooltipProps["placement"] | undefined;
};

const iconButtonClasses =
  "grid place-items-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-green shadow-md " +
  "hover:opacity-80 transition-opacity";

export default function IconButton({
  href,
  onClick,
  className,
  startIcon = "upRightArrow",
  tooltip,
  placement = "top",
}: IconButtonProps) {
  const classes = [iconButtonClasses, className].filter(Boolean).join(" ");
  const startIconEl = getActionButtonStartIcon(startIcon);

  const content = href ? (
    <Link href={href} className={classes}>
      {startIconEl}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={classes}>
      {startIconEl}
    </button>
  );

  return (
    <Tooltip title={tooltip} arrow placement={placement}>
      {content}
    </Tooltip>
  );
}
