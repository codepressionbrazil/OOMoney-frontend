import * as utils from "../utils/utils"

interface SummaryProps {
	title: string;
	value: number;
	type: "deposit" | "withdraw" | "total"
}

export function Summary(props: SummaryProps) {

	function getCardColor(): string {
		if(props.type === "deposit") return "text-green-600"
		if(props.type === "withdraw") return "text-red-600"

		return "text-white-900"
	}

	return (
		<div className={`w-1/4 h-40 rounded flex flex-col items-center justify-center bg-zinc-800 ${getCardColor()}`}>
			<h2>{props.title}</h2>

			<h1>
				{utils.formatMoney(props.value)}
			</h1>
		</div>
	)
}