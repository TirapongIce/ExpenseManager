import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from 'dayjs';

const BarChart = () => {
    const month = '8';
    const daysInMonth = 31;

    const [chartData, setChartData] = useState({
        options: {
            plotOptions: {
                bar: {
                    dataLabels: {
                        position: "top"
                    }
                }
            },
            dataLabels: {},
            xaxis: {
                categories: Array.from({ length: 31 }, (_, i) => i + 1),
                position: "bottom",
            },
        },
        series: [
            {
                name: "Expend",
                data: []
            },
            {
                name: "Income",
                data: []
            }

        ]
    });

    const getDataForMonthAndCategory = (month, category) => {
        const data = JSON.parse(localStorage.getItem(category)) || [];
        return data.filter(item => dayjs(item.date).format('M') === month);
    };

    const initializeArrayWithZeroes = (length) => {
        return Array.from({ length }, () => 0);
    };

    const loadData = () => {
        const resultIncome = getDataForMonthAndCategory(month, "Income");
        const resultExpenses = getDataForMonthAndCategory(month, "Expenses");
        const setDataIncome = initializeArrayWithZeroes(daysInMonth);
        const setDataExpenses = initializeArrayWithZeroes(daysInMonth);

        resultIncome.forEach(data => {
            const day = parseInt(dayjs(data.date).format('D')) - 1;
            const sumDay = resultIncome.filter(item => dayjs(item.date).format('D') === dayjs(data.date).format('D'));
            setDataIncome[day] = sumDay.length > 1
                ? sumDay.reduce((accumulator, object) => accumulator + object.money, 0)
                : data.money;
        });

        resultExpenses.forEach(data => {
            const day = parseInt(dayjs(data.date).format('D')) - 1;
            const sumDay = resultExpenses.filter(item => dayjs(item.date).format('D') === dayjs(data.date).format('D'));
            setDataExpenses[day] = sumDay.length > 1
                ? sumDay.reduce((accumulator, object) => accumulator + object.money, 0)
                : data.money;
        });

        setChartData({
            ...chartData,
            series: [
                {
                    ...chartData.series[0],
                    data: setDataExpenses
                },
                {
                    ...chartData.series[1],
                    data: setDataIncome
                }
            ]
        });
    };

    useEffect(() => {
        loadData();
    }, [localStorage.getItem("Income"), localStorage.getItem("Expenses")]);

    return (
        <div id="chart">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height="300"
            />
        </div>
    );
};

export default BarChart;
