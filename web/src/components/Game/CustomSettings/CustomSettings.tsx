import React, { useEffect, useState } from "react"
import { ISettings } from "../../../interfaces/Game"

interface CustomSettingsProps {
	mode: string
	settings: ISettings
	setSettings: Function
}

const CustomSettings = (props: CustomSettingsProps) => {
	const { mode, settings, setSettings } = props
	const [defaultSettings, setDefaultSettings] = useState<ISettings>(settings)

	useEffect(() => {
		setDefaultSettings(settings)
	}, [settings])

	return (
		<form className="card w-full max-w-4xl p-10 bg-base-200 border-2 shadow-xl">
			<h3 className="mb-7">Game Settings</h3>
			{mode === "decimals" && (
				<div className="flex items-center justify-left">
					Decimal Places:{" "}
					<input
						className="input input-sm w-16 mx-2 text-center"
						defaultValue={defaultSettings.decimalPlaces}
						onChange={(event) => setSettings({ ...settings, decimalPlaces: parseInt(event.target.value) })}
					/>
				</div>
			)}
			<div className="divider"></div>
			<div className="flex flex-col gap-y-5">
				<div className="flex items-center justify-left">
					<input
						className="checkbox mr-2"
						type="checkbox"
						defaultChecked={defaultSettings.isAdd}
						onChange={(event) => setSettings({ ...settings, isAdd: event.target.checked })}
					/>
					<p className="text-left pl-2">
						Addition &rarr; Range: <br className="inline md:hidden" />
						&#40;
						<input
							className="input input-sm w-16 mx-2 text-center"
							type="number"
							defaultValue={defaultSettings.add1[0]}
							onChange={(event) => setSettings({ ...settings, add1: [parseInt(event.target.value), settings.add1[1]] })}
						/>{" "}
						to{" "}
						<input
							className="input input-sm w-16 mx-2 text-center"
							type="number"
							defaultValue={defaultSettings.add1[1]}
							onChange={(event) => setSettings({ ...settings, add1: [settings.add1[0], parseInt(event.target.value)] })}
						/>
						&#41; + <br className="inline md:hidden" /> &#40;
						<input
							className="input input-sm w-16 mx-2 text-center"
							type="number"
							defaultValue={defaultSettings.add2[0]}
							onChange={(event) => setSettings({ ...settings, add2: [parseInt(event.target.value), settings.add2[1]] })}
						/>{" "}
						to{" "}
						<input
							className="input input-sm w-16 mx-2 text-center"
							type="number"
							defaultValue={defaultSettings.add2[1]}
							onChange={(event) => setSettings({ ...settings, add2: [settings.add2[0], parseInt(event.target.value)] })}
						/>
						&#41;
					</p>
				</div>
				<div className="flex items-center justify-left">
					<input
						className="checkbox mr-2"
						type="checkbox"
						defaultChecked={defaultSettings.isSubtract}
						onChange={(event) => setSettings({ ...settings, isSubtract: event.target.checked })}
					/>
					<p className="text-left pl-2">Subtraction &rarr; Addition problems in reverse.</p>
				</div>
				<div className="flex items-center justify-left">
					<input
						className="checkbox mr-2"
						type="checkbox"
						defaultChecked={defaultSettings.isMultiply}
						onChange={(event) => setSettings({ ...settings, isMultiply: event.target.checked })}
					/>
					<p className="text-left pl-2">
						Multiplication &rarr; Range: <br className="inline md:hidden" /> &#40;
						<input
							className="input input-sm w-16 mx-2 text-center"
							type="number"
							defaultValue={defaultSettings.multiply1[0]}
							onChange={(event) =>
								setSettings({ ...settings, multiply1: [parseInt(event.target.value), settings.multiply1[1]] })
							}
						/>{" "}
						to{" "}
						<input
							className="input input-sm w-16 mx-2 text-center"
							type="number"
							defaultValue={defaultSettings.multiply1[1]}
							onChange={(event) =>
								setSettings({ ...settings, multiply1: [settings.multiply1[0], parseInt(event.target.value)] })
							}
						/>
						&#41; &#215; <br className="inline md:hidden" /> &#40;
						<input
							className="input input-sm w-16 mx-2 text-center"
							type="number"
							defaultValue={defaultSettings.multiply2[0]}
							onChange={(event) =>
								setSettings({ ...settings, multiply2: [parseInt(event.target.value), settings.multiply2[1]] })
							}
						/>{" "}
						to{" "}
						<input
							className="input input-sm w-16 mx-2 text-center"
							id="multiplyHigh2"
							name="multiplyHigh2"
							defaultValue={defaultSettings.multiply2[1]}
							onChange={(event) =>
								setSettings({ ...settings, multiply2: [settings.multiply2[0], parseInt(event.target.value)] })
							}
						/>
						&#41;
					</p>
				</div>
				<div className="flex items-center justify-left">
					<input
						className="checkbox mr-2"
						type="checkbox"
						defaultChecked={defaultSettings.isDivide}
						onChange={(event) => setSettings({ ...settings, isDivide: event.target.checked })}
					/>
					<p className="text-left pl-2">Division &rarr; Multiplication problems in reverse.</p>
				</div>
			</div>
			<div className="divider"></div>
			<div className="flex items-center justify-center">
				Game Duration:{" "}
				<input
					className="input input-sm w-16 mx-2 text-center"
					defaultValue={defaultSettings.seconds}
					onChange={(event) => setSettings({ ...settings, seconds: parseInt(event.target.value) })}
				/>{" "}
				seconds
			</div>
		</form>
	)
}

export default CustomSettings
