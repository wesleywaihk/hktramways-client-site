"use client";

import { useState } from "react";

/** tracks the value one render behind `value`, updating the moment it changes */
export function usePreviousValue<T>(value: T) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState(value);
  if (value !== current) {
    setPrevious(current);
    setCurrent(value);
  }
  return previous;
}
