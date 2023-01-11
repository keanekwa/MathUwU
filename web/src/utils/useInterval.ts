import { useEffect, useRef } from "react"

const useInterval = (callback: () => void, delay: number) => {
	const savedCallback = useRef<() => void>()

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	// Set up the interval.
	useEffect(() => {
		const tick = () => {
			if (savedCallback.current) return savedCallback.current()
			else return null
		}

		if (delay !== null) {
			let id = setInterval(tick, delay)
			return () => clearInterval(id)
		}
	}, [delay])
}

export default useInterval
