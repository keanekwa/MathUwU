import React from "react"
import {
	Chart as ChartJS,
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Tooltip,
	LineController,
	BarController
} from "chart.js"
import { Chart } from "react-chartjs-2"
import { IQuestionAnswered } from "@/lib/interfaces/game.interfaces"
import { THEMES } from "@/lib/constants/theme.constants"

interface ChartProps {
	questionsAnswered: IQuestionAnswered[]
}

ChartJS.register(
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Tooltip,
	LineController,
	BarController
)

const StatsChart = ({ questionsAnswered }: ChartProps) => {
	const durations = questionsAnswered.map((q) => q.duration)
	const avgDurations: number[] = []

	const isDark = document.body.getAttribute("data-theme") === THEMES.DARK
	const barColor = isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)"
	const lineColor = isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
	const tickColor = isDark ? "rgba(225, 255, 255, 0.75)" : "rgba(0, 0, 0, 0.75)"
	const gridColor = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)"

	const options: any = {
		color: "red",
		responsive: true,
		scales: {
			y: {
				ticks: {
					callback: (value: any) => `${value}s`,
					color: tickColor
				},
				grid: {
					color: gridColor
				}
			},
			x: {
				ticks: {
					color: tickColor
				},
				grid: {
					color: gridColor
				}
			}
		},
		plugins: {
			tooltip: {
				callbacks: {
					label: (value: any) => `${value.dataset.label}: ${value.formattedValue}s`
				}
			}
		},
		interaction: {
			mode: "index",
			intersect: false
		}
	}

	if (durations.length > 0) avgDurations[0] = durations[0]
	for (let i = 1; i < durations.length; i++) {
		const cumulativeTotal = avgDurations[i - 1] * i
		const newAvg = (cumulativeTotal + durations[i]) / (i + 1)
		avgDurations.push(newAvg)
	}

	const data = {
		labels: questionsAnswered.map((q, id) => `Q${id + 1}`),
		datasets: [
			{
				type: "bar" as const,
				label: "Calculation Time",
				data: durations.map((d) => (d / 1000).toFixed(2)),
				backgroundColor: barColor
			},
			{
				type: "line" as const,
				label: "Average",
				data: avgDurations.map((d) => (d / 1000).toFixed(2)),
				borderColor: lineColor,
				borderWidth: 2,
				lineTension: 0.3
			}
		]
	}

	return <Chart type="bar" data={data} options={options} />
}

export default StatsChart
