import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { utc } from "moment";
import "moment/locale/de";
import Link from "next/link";
import { MouseEventHandler, ReactNode, useRef } from "react";
import { InterfaceEvent as EventType } from "../utils";
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
          "font-medium pt-8 text-base text-slate-600 " + props.className
        }
      >
        {props.children}
      </h2>
    );

  return (
    <button
      className={
        "font-medium pt-8 text-base transition-colors " +
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
      <div className="flex items-streach">
        <button
          className="flex-shrink-0 hidden sm:block text-slate-300 hover:text-black w-4 sm:w-10 transition-colors"
          onClick={() => scroll(-1)}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div
          id="myscroll"
          className={
            "flex flex-grow flex-shrink gap-4 px-4 sm:px-0 pt-2 overflow-x-scroll sm:overflow-hidden flex-nowrap" +
            props.className
          }
          ref={scrollRef}
        >
          {props.children}
        </div>
        <button
          className="flex-shrink-0 hidden sm:block text-slate-300 hover:text-black w-4 sm:w-10 transition-colors"
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
        className="bg-slate-200 block flex-shrink-0 h-56 rounded-xl text-sm w-48"
        onClick={props.onClick}
      >
        <Image
          className="h-32 object-cover rounded-t-xl w-48 mb-1"
          src={props.event.image}
          width={48}
        />
        <div className="overflow-hidden px-3 pt-1 text-ellipsis whitespace-nowrap font-medium">
          {props.event.title}
        </div>
        <div className="block overflow-hidden px-3 pt-1 text-ellipsis whitespace-nowrap text-neutral-500 text-xs">
          {props.event.organiser.name}
        </div>
        <div className="overflow-hidden px-3 pt-1 text-ellipsis whitespace-nowrap text-xs">
          {utc(props.event.date).local().locale("de").format("llll")}
        </div>
        <div className="block overflow-hidden px-3 pt-1 text-ellipsis whitespace-nowrap text-xs">
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
          "bg-slate-200 flex flex-col lg:flex-row flex-shrink-0 overflow-clip rounded-xl text-xs lg:text-sm " +
          props.className
        }
        onClick={props.onClick}
      >
        <Image
          className="aspect-[3/2] flex-shrink-0 lg:h-36 object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none"
          src={props.event.image}
          width={54}
        />
        <div className="flex-grow min-w-0 px-2 sm:px-4">
          <div className="overflow-hidden pt-2 lg:pt-3 text-ellipsis whitespace-nowrap text-sm lg:text-xl font-medium">
            {props.event.title}
          </div>
          <div className="block overflow-hidden pt-1 text-ellipsis whitespace-nowrap text-neutral-500 lg:text-lg">
            {props.event.organiser.name}
          </div>
          <div className="overflow-hidden pt-1 text-ellipsis whitespace-nowrap">
            {utc(props.event.date).local().locale("de").format("llll")}
          </div>
          <div className="block overflow-hidden pt-1 pb-2 lg:text-base text-ellipsis whitespace-nowrap hover:underline">
            {props.event.venue}
          </div>
        </div>
      </a>
    </Link>
  );
};
