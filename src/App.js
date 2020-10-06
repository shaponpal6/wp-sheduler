import React, { useState, useEffect } from "react";
import schedule from "node-schedule";
import PropTypes from "prop-types";
import moment from "moment";
import "./App.css";

function App({ settings }) {
  const [state, SetState] = useState(false);

  useEffect(() => {
    console.log("settings>>", settings);
    const timezone = settings.timezone;
    let show_date = settings.show_date;
    const show_time = settings.show_time;
    let hide_date = settings.hide_date;
    const hide_time = settings.hide_time;
    
    if (settings.type && settings.type === "repeater") {
      show_date = moment().utcOffset(timezone).format("DD.MM.YYYY");
      hide_date = moment().utcOffset(timezone).format("DD.MM.YYYY");
    }

    // const showTime = moment("4.10.20 12:57:00", "DD.MM.YYYY hh:mm:ss");
    // const hideTime = moment("4.10.20 12:57:00", "DD.MM.YYYY hh:mm:ss");
    const showTime = moment(show_date+" "+show_time, "DD.MM.YYYY hh:mm:ss").utcOffset(timezone);
    const hideTime = moment(hide_date+" "+hide_time, "DD.MM.YYYY hh:mm:ss").utcOffset(timezone);
    // moment().tz("America/Los_Angeles").format();

    console.log(showTime.toDate());
    console.log(moment().utcOffset(timezone).format("LL"));
    console.log(moment().utcOffset(timezone).format("DD.MM.YYYY"));
    document.title = `You clicked ${state} times`;

    if (settings.type && settings.type === "repeater") {
      var rule = new schedule.RecurrenceRule();
      rule.dayOfWeek = [new schedule.Range(settings.recurring_days)];
      rule.month = settings.recurring_month;
      rule.dayOfMonth = [ new schedule.Range(settings.recurring_dates)];
      rule.hour = settings.recurring_hour;
      rule.minute = settings.recurring_minute;
      rule.second = settings.recurring_second;

      schedule.scheduleJob(rule, function () {
        console.log("Async Show on >>", showTime.toDate());
        SetState(true);
      });
      // Async hide
      let hideStartTime = new Date(hideTime.toDate());
      let hideEndTime = new Date(hideStartTime.getTime() + 1000);
      schedule.scheduleJob(
        { start: hideStartTime, end: hideEndTime, rule: "*/1 * * * * *" },
        function () {
          console.log("Async hide on >>", showTime.toDate());
          SetState(false);
        }
      );
    } else {
      // Async Show
      let startTime = new Date(showTime.toDate());
      let endTime = new Date(startTime.getTime() + 1000);
      schedule.scheduleJob(
        { start: startTime, end: endTime, rule: "*/1 * * * * *" },
        function () {
          console.log("Async Show on >>", showTime.toDate());
          SetState(true);
        }
      );

      // Async hide
      let hideStartTime = new Date(hideTime.toDate());
      let hideEndTime = new Date(hideStartTime.getTime() + 1000);
      schedule.scheduleJob(
        { start: hideStartTime, end: hideEndTime, rule: "*/1 * * * * *" },
        function () {
          console.log("Async hide on >>", showTime.toDate());
          SetState(false);
        }
      );
    }
  }, [state, settings]);

  return (
    <div className="App">
      <h2>Show Button here</h2>
      <p>State: {state && "This is true"}</p>

      <button onClick={() => SetState(!state)}>Set State</button>
    </div>
  );
}
App.propTypes = {
  settings: PropTypes.object.isRequired,
};

export default App;
