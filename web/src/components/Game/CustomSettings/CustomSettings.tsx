import React from "react"
import { Settings } from "./../Game"

interface CustomSettingsProps {
	settings: Settings
	setSettings: Function
}

const CustomSettings = (props: CustomSettingsProps) => {
	const { settings, setSettings } = props
	const {
		isAdd,
		isSubtract,
		isMultiply,
		isDivide,
		addLow1,
		addHigh1,
		addLow2,
		addHigh2,
		multiplyLow1,
		multiplyHigh1,
		multiplyLow2,
		multiplyHigh2,
		seconds
	} = settings

	return (
		<form className="card max-w-4xl p-10 bg-gray-600 shadow-xl">
			<h6 className="mb-7">Game Settings</h6>
			<div className="mb-5 flex items-center justify-center">
				<input
					className="mr-1"
					type="checkbox"
					id="isAdd"
					name="isAdd"
					defaultChecked={isAdd}
					onChange={(event) => setSettings({ ...settings, isAdd: event.target.checked })}
				/>
				Addition --&gt; Range: &#40;
				<input
					required
					className="w-20 mx-3 text-center"
					id="addLow1"
					name="addLow1"
					defaultValue={addLow1}
					onChange={(event) => setSettings({ ...settings, addLow1: parseInt(event.target.value) })}
				/>{" "}
				to{" "}
				<input
					required
					className="w-20 mx-3 text-center"
					id="addHigh1"
					name="addHigh1"
					defaultValue={addHigh1}
					onChange={(event) => setSettings({ ...settings, addHigh1: parseInt(event.target.value) })}
				/>
				&#41; + &#40;
				<input
					required
					className="w-20 mx-3 text-center"
					id="addLow2"
					name="addLow2"
					defaultValue={addLow2}
					onChange={(event) => setSettings({ ...settings, addLow2: parseInt(event.target.value) })}
				/>{" "}
				to{" "}
				<input
					required
					className="w-20 mx-3 text-center"
					id="addHigh2"
					name="addHigh2"
					defaultValue={addHigh2}
					onChange={(event) => setSettings({ ...settings, addHigh2: parseInt(event.target.value) })}
				/>
				&#41;
			</div>
			<div className="mb-5 flex items-center justify-center">
				<input
					className="mr-1"
					type="checkbox"
					id="isSubtract"
					name="isSubtract"
					defaultChecked={isSubtract}
					onChange={(event) => setSettings({ ...settings, isSubtract: event.target.checked })}
				/>
				Subtraction --&gt; Addition problems in reverse.
			</div>
			<div className="mb-5 flex items-center justify-center">
				<input
					className="mr-1"
					type="checkbox"
					id="isMultiply"
					name="isMultiply"
					defaultChecked={isMultiply}
					onChange={(event) => setSettings({ ...settings, isMultiply: event.target.checked })}
				/>
				Multiplication --&gt; Range: &#40;
				<input
					required
					className="w-20 mx-3 text-center"
					id="multiplyLow1"
					name="multiplyLow1"
					defaultValue={multiplyLow1}
					onChange={(event) => setSettings({ ...settings, multiplyLow1: parseInt(event.target.value) })}
				/>{" "}
				to{" "}
				<input
					required
					className="w-20 mx-3 text-center"
					id="multiplyHigh1"
					name="multiplyHigh1"
					defaultValue={multiplyHigh1}
					onChange={(event) => setSettings({ ...settings, multiplyHigh1: parseInt(event.target.value) })}
				/>
				&#41; + &#40;
				<input
					required
					className="w-20 mx-3 text-center"
					id="multiplyLow2"
					name="multiplyLow2"
					defaultValue={multiplyLow2}
					onChange={(event) => setSettings({ ...settings, multiplyLow2: parseInt(event.target.value) })}
				/>{" "}
				to{" "}
				<input
					required
					className="w-20 mx-3 text-center"
					id="multiplyHigh2"
					name="multiplyHigh2"
					defaultValue={multiplyHigh2}
					onChange={(event) => setSettings({ ...settings, multiplyHigh2: parseInt(event.target.value) })}
				/>
				&#41;
			</div>
			<div className="flex items-center justify-center">
				<input
					className="mr-1"
					type="checkbox"
					id="isDivide"
					name="isDivide"
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
					className="w-20 mx-3 text-center"
					id="seconds"
					name="seconds"
					defaultValue={seconds}
					onChange={(event) => setSettings({ ...settings, seconds: parseInt(event.target.value) })}
				/>{" "}
				seconds
			</div>
		</form>
	)
}

export default CustomSettings
