import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export const cn = (...classNames) => twMerge(clsx(classNames));
