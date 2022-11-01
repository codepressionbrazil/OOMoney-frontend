interface SummaryProps {
	title: string;
	value: number;
	bgColor: string;
}

export function Summary(props: SummaryProps) {

	return (
		<div className={`w-1/4 h-40 rounded text-zinc-900 ${props.bgColor} flex flex-col items-center justify-center`}>
			<h2>{props.title}</h2>

			<h1>
				{new Intl.NumberFormat("pt-BR", {
					style: "currency",
					currency: "BRL",
				}).format(props.value)}
			</h1>
		</div>
	)
}