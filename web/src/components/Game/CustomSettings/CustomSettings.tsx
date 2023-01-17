import React, { useEffect, useState } from "react"
import { Settings } from "./../Game"

interface CustomSettingsProps {
	settings: Settings
	setSettings: Function
}

const CustomSettings = (props: CustomSettingsProps) => {
	const { settings, setSettings } = props
	const [defaultSettings] = useState<Settings>({ ...settings })
	const { isAdd, isSubtract, isMultiply, isDivide, add1, add2, multiply1, multiply2, seconds } = defaultSettings

	return (
		<form className="card max-w-4xl p-10 bg-gray-600 shadow-xl">
			<h6 className="mb-7">Game Settings</h6>
			<div className="mb-5 flex items-center justify-left">
				<input
					className="checkbox mr-2"
					type="checkbox"
					defaultChecked={isAdd}
					onChange={(event) => setSettings({ ...settings, isAdd: event.target.checked })}
				/>
				Addition --&gt; Range: &#40;
				<input
					required
					className="input input-sm w-16 mx-2 text-center"
					type="number"
					defaultValue={add1[0]}
					onChange={(event) => setSettings({ ...settings, add1: [parseInt(event.target.value), add1[1]] })}
				/>{" "}
				to{" "}
				<input
					required
					className="input input-sm w-16 mx-2 text-center"
					type="number"
					defaultValue={add1[1]}
					onChange={(event) => setSettings({ ...settings, add1: [add1[0], parseInt(event.target.value)] })}
				/>
				&#41; + &#40;
				<input
					required
					className="input input-sm w-16 mx-2 text-center"
					type="number"
					defaultValue={add2[0]}
					onChange={(event) => setSettings({ ...settings, add2: [parseInt(event.target.value), add2[1]] })}
				/>{" "}
				to{" "}
				<input
					required
					className="input input-sm w-16 mx-2 text-center"
					type="number"
					defaultValue={add2[1]}
					onChange={(event) => setSettings({ ...settings, add2: [add2[0], parseInt(event.target.value)] })}
				/>
				&#41;
			</div>
			<div className="mb-5 flex items-center justify-left">
				<input
					className="checkbox mr-2"
					type="checkbox"
					defaultChecked={isSubtract}
					onChange={(event) => setSettings({ ...settings, isSubtract: event.target.checked })}
				/>
				Subtraction --&gt; Addition problems in reverse.
			</div>
			<div className="mb-5 flex items-center justify-left">
				<input
					className="checkbox mr-2"
					type="checkbox"
					defaultChecked={isMultiply}
					onChange={(event) => setSettings({ ...settings, isMultiply: event.target.checked })}
				/>
				Multiplication --&gt; Range: &#40;
				<input
					required
					className="input input-sm w-16 mx-2 text-center"
					type="number"
					defaultValue={multiply1[0]}
					onChange={(event) => setSettings({ ...settings, multiply1: [parseInt(event.target.value), multiply1[1]] })}
				/>{" "}
				to{" "}
				<input
					required
					className="input input-sm w-16 mx-2 text-center"
					type="number"
					defaultValue={multiply1[1]}
					onChange={(event) => setSettings({ ...settings, multiply1: [multiply1[0], parseInt(event.target.value)] })}
				/>
				&#41; &#215; &#40;
				<input
					required
					className="input input-sm w-16 mx-2 text-center"
					type="number"
					defaultValue={multiply2[0]}
					onChange={(event) => setSettings({ ...settings, multiply2: [parseInt(event.target.value), multiply2[1]] })}
				/>{" "}
				to{" "}
				<input
					required
					className="input input-sm w-16 mx-2 text-center"
					id="multiplyHigh2"
					name="multiplyHigh2"
					defaultValue={multiply2[1]}
					onChange={(event) => setSettings({ ...settings, multiply2: [multiply2[0], parseInt(event.target.value)] })}
				/>
				&#41;
			</div>
			<div className="flex items-center justify-left">
				<input
					className="checkbox mr-2"
					type="checkbox"
					defaultChecked={isDivide}
					onChange={(event) => setSettings({ ...settings, isDivide: event.target.checked })}
				/>
				Division --&gt; Multiplication problems in reverse.
			</div>
			<div className="divider"></div>
			<div className="flex items-center justify-center">
				Game Duration:{" "}
				<input
					required
					className="input input-sm w-16 mx-2 text-center"
					defaultValue={seconds}
					onChange={(event) => setSettings({ ...settings, seconds: parseInt(event.target.value) })}
				/>{" "}
				seconds
			</div>
		</form>
	)
}

export default CustomSettings
