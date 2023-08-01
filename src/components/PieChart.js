import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from 'dayjs';
const PieChart = () => {
    const colorCodes = [
        "#42a4eb",
        "#f59608",
        "#8bd646",
        "#c95ba3",
        "#e76c23",
        "#48c9b0",
        "#f0bc0a",
        "#6a89cc",
        "#ef5777",
        "#20bf6b",
    ];
    const [chartData, setChartData] = useState({
        options: {
            colors: colorCodes,
            plotOptions: {
                pie: {
                    expandOnClick: false
                }
            },
            labels: [
                "Food And Drink", "Shopping", "Trip", "Credit Cards", "House", "Car Payment",
                "Family", "Travel", "Bill And Utilties", "Other"
            ],
            dataLabels: {
                position: 'bottom'
            },
            fill: {
                colors: colorCodes
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: "100%"
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ],
            legend: {
                position: 'bottom'
            }
        },
        series: []
    });

    const getDataForMonthAndCategory = (month, category) => {
        const data = JSON.parse(localStorage.getItem(category)) || [];
        return data.filter(item => dayjs(item.date).format('M') === month);
    };

    const loadData = () => {
        var setData = [];
        const resultExpenses = getDataForMonthAndCategory("8", "Expenses");
        for (let i = 0; i < 10; i++) {
            const sumCategory = resultExpenses.filter(item => item.category === (i + 1));
            setData.push(sumCategory.length > 0 ? sumCategory.length > 1 ?
                sumCategory.reduce((accumulator, object) => accumulator + object.money, 0)
                : sumCategory[0]["money"] : 0);
        }

        setChartData({
            ...chartData,
            series: setData
        });
    }
    useEffect(() => {
        loadData();
    }, [localStorage.getItem("Income"), localStorage.getItem("Expenses")]);

    return (
        <div id="chart" style={{ height: "313px" }} >
            <ReactApexChart options={chartData.options} series={chartData.series} type="donut" height="300" />
        </div>
    );
};

export default PieChart;