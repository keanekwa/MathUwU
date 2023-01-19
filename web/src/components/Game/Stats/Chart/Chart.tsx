import React from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js"
import { Bar } from "react-chartjs-2"
import { QuestionAnsweredType } from "../../Game"

interface ChartProps {
	questionsAnswered: QuestionAnsweredType[]
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

const Chart = ({ questionsAnswered }: ChartProps) => {
	const options = {
		responsive: true,
		scales: {
			y: {
				ticks: {
					callback: (value: any) => `${value}s`
				}
			}
		},
		plugins: {
			tooltip: {
				callbacks: {
					label: (value: any) => `${value.dataset.label}: ${value.formattedValue}s`
				}
			}
		}
	}

	const labels = questionsAnswered.map((q, id) => `Q${id + 1}`)

	const data = {
		labels,
		datasets: [
			{
				label: "Calculation Time",
				data: questionsAnswered.map((q) => (q.duration / 1000).toFixed(2)),
				backgroundColor: "rgba(255, 255, 255, 0.5)"
			}
		]
	}

	return <Bar className="mt-5" options={options} data={data} />
}

export default Chart
