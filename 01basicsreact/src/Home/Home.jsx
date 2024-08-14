import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import styles from "./Home.module.css";

import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [todaysBooking, setTodaysBooking] = useState(0);
  const [totalBooking, setTotalBooking] = useState(0);
  const [checkOut, setCheckOut] = useState(0);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    const today = moment().startOf("day");

    const todaysBookingCount = storedEvents.filter((event) =>
      moment(event.start).isSame(today, "day")
    ).length;

    const totalBookingCount = storedEvents.length;

    const checkOutCount = storedEvents.filter((event) =>
      moment(event.end).isSame(today, "day")
    ).length;

    setTodaysBooking(todaysBookingCount);
    setTotalBooking(totalBookingCount);
    setCheckOut(checkOutCount);
  }, []);

  const HandleGardenBooking = () => {
    navigate("/Garden");
  };

  const HandleRoomBooking = () => {
    navigate("/Room");
  };

  const HandleTodaysBooking = () => {
    navigate("/TodaysBooking");
  };

  const HandleCheckOutBooking = () => {
    navigate("/CheckOut");
  };

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <main className={styles.maincontainer}>
      <div className={styles.maintitle}>
        <h3>DASHBOARD</h3>
        <div className={styles.buttons}>
          <button className={styles.roombtn} onClick={HandleRoomBooking}>
            Room Booking
          </button>
          <button className={styles.gardenbtn} onClick={HandleGardenBooking}>
            Garden Booking
          </button>
        </div>
      </div>

      <div className={styles.maincards}>
        <div className={styles.card} onClick={HandleTodaysBooking}>
          <div className={styles.cardinner}>
            <h3>Todays Booking</h3>
            <BsFillArchiveFill className={styles.cardicon} />
          </div>
          <h1>{todaysBooking}</h1>
        </div>
        <div className={styles.card} onClick={HandleCheckOutBooking}>
          <div className={styles.cardinner}>
            <h3>CheckOut</h3>
            <BsFillGrid3X3GapFill className={styles.cardicon} />
          </div>
          <h1>{checkOut}</h1>
        </div>

        <div className={styles.card}>
          <div className={styles.cardinner}>
            <h3>Total-Booking</h3>
            <BsPeopleFill className={styles.cardicon} />
          </div>
          <h1>{totalBooking}</h1>
        </div>
        <div className={styles.card}>
          <div className={styles.cardinner}>
            <h3>Earnings</h3>
            <BsFillBellFill className={styles.cardicon} />
          </div>
          <h1>42</h1>
        </div>
      </div>

      <div className={styles.charts}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
