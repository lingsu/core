import { useMemo } from "react";

export default (events: any[]) => {
  const event = useMemo(() => {
    let event = {};

    for (let i = 0; i < events.length; i++) {
      const element = events[i];
      event[element.id] = element.code;
    }

    return event;
  }, [events]);

  return event;
};
