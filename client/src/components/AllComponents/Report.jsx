
import { useDispatch } from "react-redux";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import { IoHomeOutline } from "react-icons/io5";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { FaEllipsis } from "react-icons/fa6";
import { Link } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import Sidebar from "./Sidebar";
import Axios from "axios";
const Report = () => {


  const [genreData, setGenreData] = useState([]);

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/movie-genres');
        setGenreData(response.data);
      } catch (error) {
        console.error('Error fetching genre data:', error);
      }
    };

    fetchGenreData();
  }, []);
  const [data, setData] = useState([]);




  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const [totaldrama, setTotalDrama] = useState(0);

  const [totalmovies, setMoviestotal] = useState(0);
  const [totalActionmovies, settotalAMovies] = useState(0);
  const [totalRomancemovies, settotalromanceMovies] = useState(0);
  // const [selectedRecord, setSelectedRecord] = useState(null);

  // grap user list
  useEffect(() => {
    fetchMovieTotal();
    fetchTotalAction();
    fetchTotalRomance();
    fetchTotalDrama();


  }, []);

  // fetching employee list 
  const fetchMovieTotal = () => {
    Axios.get('http://localhost:3001/totalmovies')
      .then((response) => {
        setMoviestotal(response.data.total_movies);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  // request to get total action movies 
  const fetchTotalAction = () => {
    Axios.get('http://localhost:3001/totaactionmovies')
      .then((response) => {
        settotalAMovies(response.data.total_action_movies);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  // request to get the total of romance movies
  const fetchTotalRomance = () => {
    Axios.get('http://localhost:3001/totalromancemovies')
      .then((response) => {
        settotalromanceMovies(response.data.total_romance_movies);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const fetchTotalDrama = () => {
    Axios.get('http://localhost:3001/totaldramaamovies')
      .then((response) => {
        setTotalDrama(response.data.total_drama_movies);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const data1 = [
    { name: 'Total Movies', value: totalmovies },
    { name: 'Total Drama Movies', value: totaldrama },
    { name: 'Total Romance Movies', value: totalRomancemovies },
  ];

  const getLineColor = (index) => {
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#9966FF', '#00BFFF'];
    return colors[index % colors.length];
  };

  return (
    <>
      <MyNavbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto ">

          <div className="pt-[25px] px-[25px] bg-[#F8F9FC]">
            <div className="flex items-center justify-between">
              <h1 className="text-[#293A77]  text-[28px]  font-normal cursor-pointer">Dashboard</h1>
            </div>

            <div className=" flex-cols-1 flex overflow-x-auto flex-nowrap sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-[25px] pb-[15px]">
              <div className="h-[100px]  rounded-[8px] bg-[#293A77] border-l-[4px] border-[#4E73DF] flex flex-col  items-center justify-center px-10 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-150 ease-out">
                <div>
                  <h3 className="text-white text-[18px] font-bold">TotalGenres</h3>
                </div>
                <div>
                  <h5 className="text-white font-bold">{genreData.reduce((total, item) => total + item.count, 0)}</h5>
                </div>
              </div>
              {/* <Link to={"/pages/detailreport"}> */}

              {genreData.map(({ genre, count }, index) => (
                <div
                  key={genre || `empty-card-${index}`}
                  className={`h-[100px]  rounded-[8px] bg-[#293A77] border-l-[4px] border-[#4E73DF] flex  items-center justify-between px-10 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-150 ease-out ${genre ? '' : 'opacity-50 cursor-not-allowed'
                    }`}
                >
                  <div>
                    <h3 className="text-white text-[18px] font-bold text-center">{genre || 'No Genre'}</h3>
                    <h5 className="text-white font-bold  mt-[5px] text-center">{count}</h5>
                  </div>
                </div>
              ))}

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-[30px] mt-[25px] pb-[15px] h-[90%]">

              <div className="h-[300px] rounded-[8px]  border-l-[4px] border-[#293A77]  p-4">
                <h1 className="text-[#293A77]  text-[20px] leading-[24px] font-bold mb-[10px]">Movies Overview</h1>
                <ResponsiveContainer width="90%" height="90%">
                  <LineChart
                    width="100%"
                    height={300}
                    data={data1}
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
                    {data1.map((item, index) => (
                      <Line
                        key={index}
                        type="monotone"
                        dataKey="value"
                        name={item.name}
                        stroke={getLineColor(index)}
                        activeDot={{ r: 8 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="h-[300px] rounded-[8px] bg-white border-l-[4px] border-[#293A77]  p-4">
                <h1 className="text-[#293A77] text-[20px] leading-[24px] font-bold mb-[10px]">Movies Overview</h1>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data1}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data1.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;