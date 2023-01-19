import React from "react"

interface DarkModeSelectProps {
	themeSwitch: Function
}

const DarkModeSelect = ({ themeSwitch }: DarkModeSelectProps) => {
	return (
		<ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52">
			<li>
				<span onClick={() => themeSwitch("default")}>System Default</span>
			</li>
			<li>
				<span onClick={() => themeSwitch("light")}>Light</span>
			</li>
			<li>
				<span onClick={() => themeSwitch("dark")}>Dark</span>
			</li>
		</ul>
	)
}

export default DarkModeSelect
