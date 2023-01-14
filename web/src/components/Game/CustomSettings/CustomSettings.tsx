import React from "react"
import getFormData from "../../../utils/getFormData"
import { Settings } from "./../Game"

interface CustomSettingsProps {
	settings: Settings
	setSettings: Function
}

const handleSaveCustomSettings = (event: React.FormEvent<HTMLFormElement>, setSettings: Function) => {
	event.preventDefault()
	const formData = getFormData(event)
	const settings = {
		...formData,
		addLow1: parseInt(formData.addLow1),
		addHigh1: parseInt(formData.addHigh1),
		addLow2: parseInt(formData.addLow2),
		addHigh2: parseInt(formData.addHigh2),
		multiplyLow1: parseInt(formData.multiplyLow1),
		multiplyHigh1: parseInt(formData.multiplyHigh1),
		multiplyLow2: parseInt(formData.multiplyLow2),
		multiplyHigh2: parseInt(formData.multiplyHigh2)
	}
	setSettings(settings)
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
		multiplyHigh2
	} = settings

	return (
		<form onSubmit={(event) => handleSaveCustomSettings(event, setSettings)}>
			<strong>Game Settings</strong>
			<br />
			<div>
				<input type="checkbox" id="isAdd" name="isAdd" defaultChecked={isAdd} />
				Addition <br />
				Range: &#40;
				<input required id="addLow1" name="addLow1" defaultValue={addLow1} /> to{" "}
				<input required id="addHigh1" name="addHigh1" defaultValue={addHigh1} />
				&#41; + &#40;
				<input required id="addLow2" name="addLow2" defaultValue={addLow2} /> to{" "}
				<input required id="addHigh2" name="addHigh2" defaultValue={addHigh2} />
				&#41;
			</div>
			<div>
				<input type="checkbox" id="isSubtract" name="isSubtract" defaultChecked={isSubtract} />
				Subtraction <br />
				Addition problems in reverse.
			</div>
			<div>
				<input type="checkbox" id="isMultiply" name="isMultiply" defaultChecked={isMultiply} />
				Multiplication <br />
				Range: &#40;
				<input required id="multiplyLow1" name="multiplyLow1" defaultValue={multiplyLow1} /> to{" "}
				<input required id="multiplyHigh1" name="multiplyHigh1" defaultValue={multiplyHigh1} />
				&#41; + &#40;
				<input required id="multiplyLow2" name="multiplyLow2" defaultValue={multiplyLow2} /> to{" "}
				<input required id="multiplyHigh2" name="multiplyHigh2" defaultValue={multiplyHigh2} />
				&#41;
			</div>
			<div>
				<input type="checkbox" id="isDivide" name="isDivide" defaultChecked={isDivide} />
				Division <br />
				Multiplication problems in reverse.
			</div>
			<button type="submit">Save Settings</button>
		</form>
	)
}

export default CustomSettings
