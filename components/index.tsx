import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { utc } from "moment";
import "moment-timezone";
import "moment/locale/de";
import Link from "next/link";
import { MouseEventHandler, ReactNode, useRef } from "react";
import { InterfaceEvent as EventType, timezone } from "../utils";
import Image from "./Image";

export const Header = (props: {
  children: ReactNode;
  className?: string;
  default?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
}) => {
  if (props.selected === undefined)
    return (
      <h2
        className={
          "pt-8 text-base font-medium text-slate-600 " + props.className
        }
      >
        {props.children}
      </h2>
    );

  return (
    <button
      className={
        "pt-8 text-base font-medium transition-colors " +
        (props.selected ? "text-slate-600 " : "text-slate-400 ") +
        props.className
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export const EventGroup = (props: {
  className?: string;
  children: ReactNode;
  title?: ReactNode;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (f: number) => {
    if (!scrollRef.current) return;
    const tileWidth =
      (12 + 1) *
      parseFloat(getComputedStyle(document.documentElement).fontSize);
    const by =
      Math.floor(scrollRef.current.offsetWidth / tileWidth) * tileWidth * f;
    scrollRef.current.scrollBy({ behavior: "smooth", left: by });
    console.log({ width: scrollRef.current.offsetWidth, tileWidth, by });
  };

  return (
    <>
      {props.title && <Header className="mx-4 sm:mx-10">{props.title}</Header>}
      <div className="items-streach flex">
        <button
          className="hidden w-4 flex-shrink-0 text-slate-300 transition-colors hover:text-black sm:block sm:w-10"
          onClick={() => scroll(-1)}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div
          id="myscroll"
          className={
            "flex flex-shrink flex-grow flex-nowrap gap-4 overflow-x-scroll px-4 pt-2 sm:overflow-hidden sm:px-0" +
            props.className
          }
          ref={scrollRef}
        >
          {props.children}
        </div>
        <button
          className="hidden w-4 flex-shrink-0 text-slate-300 transition-colors hover:text-black sm:block sm:w-10"
          onClick={() => scroll(1)}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </>
  );
};

export const Event = (props: {
  event: EventType;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) => {
  return (
    <Link href={`/event/${props.event.id}`}>
      <a
        className="block h-56 w-48 flex-shrink-0 rounded-xl bg-slate-200 text-sm"
        onClick={props.onClick}
      >
        <Image
          className="mb-1 h-32 w-48 rounded-t-xl object-cover"
          src={props.event.image}
          width={48}
        />
        <div className="overflow-hidden text-ellipsis whitespace-nowrap px-3 pt-1 font-medium">
          {props.event.title}
        </div>
        <div className="block overflow-hidden text-ellipsis whitespace-nowrap px-3 pt-1 text-xs text-neutral-500">
          {props.event.organiser.name}
        </div>
        <div className="overflow-hidden text-ellipsis whitespace-nowrap px-3 pt-1 text-xs">
          {utc(props.event.date).tz(timezone).locale("de").format("llll")}
        </div>
        <div className="block overflow-hidden text-ellipsis whitespace-nowrap px-3 pt-1 text-xs">
          {props.event.venue}
        </div>
      </a>
    </Link>
  );
};

export const Highlight = (props: {
  className?: string;
  event: EventType;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) => {
  return (
    <Link href={`/event/${props.event.id}`}>
      <a
        className={
          "flex flex-shrink-0 flex-col overflow-clip rounded-xl bg-slate-200 text-xs lg:flex-row lg:text-sm " +
          props.className
        }
        onClick={props.onClick}
      >
        <Image
          className="aspect-[3/2] flex-shrink-0 rounded-t-xl object-cover lg:h-36 lg:rounded-l-xl lg:rounded-tr-none"
          src={props.event.image}
          width={54}
        />
        <div className="min-w-0 flex-grow px-2 sm:px-4">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap pt-2 text-sm font-medium lg:pt-3 lg:text-xl">
            {props.event.title}
          </div>
          <div className="block overflow-hidden text-ellipsis whitespace-nowrap pt-1 text-neutral-500 lg:text-lg">
            {props.event.organiser.name}
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap pt-1">
            {utc(props.event.date).tz(timezone).locale("de").format("llll")}
          </div>
          <div className="block overflow-hidden text-ellipsis whitespace-nowrap pt-1 pb-2 hover:underline lg:text-base">
            {props.event.venue}
          </div>
        </div>
      </a>
    </Link>
  );
};
