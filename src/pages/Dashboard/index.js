import React, { useState, useMemo, useEffect } from "react";
import {
  format,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO
} from "date-fns";
import pt from "date-fns/locale/pt";
import { utcToZonedTime } from "date-fns-tz";
import api from "~/services/api";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { Container, Time } from "./styles";

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get("schedule", {
        params: { date }
      });

      //pega a time zone do cliente
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map(hour => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(a =>
            isEqual(parseISO(a.date), compareDate)
          )
        };
      });
      // console.tron.log("data");
      // console.tron.log(data);

      setSchedule(data);
    }

    loadSchedule();
  }, [date]);

  function handleChangeDay(value) {
    setDate(addDays(date, value));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={() => handleChangeDay(-1)}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={() => handleChangeDay(1)}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        {schedule.map(time => {
          // console.tron.log(time);
          return (
            <Time
              key={time.time}
              past={time.past}
              available={!time.appointment}
            >
              <strong>{time.time}</strong>
              <span>
                {time.appointment ? time.appointment.user.name : "Em aberto"}
              </span>
            </Time>
          );
        })}
      </ul>
    </Container>
  );
}
