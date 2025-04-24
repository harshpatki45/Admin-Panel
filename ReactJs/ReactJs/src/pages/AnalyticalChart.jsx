import React, { useEffect, useState } from 'react';
import useReactApexChart from '../hook/useReactApexChart';
import Chart from 'react-apexcharts';
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';

const CHART_API = "http://localhost:3001/2025/butler_hospitality/server/webservice/user_analytic_report"


const AnalyticalChart = () => {

    const [chartData, setChartData] = useState({
        series: [{ name: "Users", data: []}],
        options: {
            chart: {type: "bar", height: 350},
            xaxis: { categoties: []}
    }
    })

    const [chartYear, setChartYear] = useState({
        series: [{name: "Year", data: []}],
        options: {
            chart: {type: "bar", height: 350},
            xaxis: {categories: []}
        }
    })

    useEffect(()=> {
        FetchMonthData();
    }, []);

    useEffect(()=> {
        FetchYearData();
    },[]);

    const FetchMonthData = async () => {
        const token = localStorage.getItem("token")

        try {
            const response = await axios.get(CHART_API, {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            })
            console.log("API Response:", response.data.data.month_report_arr)

            const apiData = response.data?.data?.month_report_arr || [];

            if(!Array.isArray(apiData)){
                throw new Error("Error Occured");
            }

            const months = apiData.map((item) => item.month);

            const userCounts = apiData.map((item) => item.month_user_arr || 0)


            setChartData({
                series: [{ name: "Users", data: userCounts
                 }],
                options: {
                  chart: { type: "bar", height: 350 },
                  xaxis: { categories: months},
                },
              });

        } catch (error) {
            console.log(error)
        }
    }

    const FetchYearData = async() => {
        const token = localStorage.getItem("token")
        try {
            const response = await axios.get(CHART_API, {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            })
            console.log("API Response:", response.data.data.year_report_arr
            );

            const apiData = response.data?.data?.year_report_arr || []

            if(!Array.isArray(apiData)){
                throw new Error("Error Occured");
            }

            const years = apiData.map((item) => item.year);

            const userCountsYear = apiData.map((item) => item.year_user_arr || 0)


            setChartYear({
                series: [{ name: "Users", data: userCountsYear
                 }],
                options: {
                  chart: { type: "bar", height: 350 },
                  xaxis: { categories: years},
                },
              });


        } catch (error) {
            console.log(error)
        }
    }

    return (
<>
        <h2 className="text-xl font-semibold text-center mb-6 text-black">Monthly User Analytical Chart</h2>
        <div className="col-xxl-12">
            <div className="card h-100 radius-8 border-0">
                <div className="card-body p-24">

                    <div >
                        <Chart  key={JSON.stringify(chartData)} options={chartData.options} series={chartData.series} type="bar" height={350} />
                        {console.log(chartData.options)}
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-semibold text-center mb-6 mt-10 text-black">Yearly User Analytical Chart</h2>
            <div className="card h-100 radius-8 border-0">
                <div className="card-body p-24">

                    <div >
                        <Chart  key={JSON.stringify(chartYear)} options={chartYear.options} series={chartYear.series} type="bar" height={350} />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default AnalyticalChart;


// let { barChartSeriesTwo, barChartOptionsTwo } = useReactApexChart();