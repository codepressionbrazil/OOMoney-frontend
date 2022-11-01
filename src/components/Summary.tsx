interface SummaryProps {
	title: string;
	value: number;
}

export function Summary(props: SummaryProps) {
	return (
		<div className="w-1/6 h-40 rounded bg-gray-500 text-zinc-900">
			<h2>{props.title}</h2>

			<h3>
				{new Intl.NumberFormat("pt-BR", {
					style: "currency",
					currency: "BRL",
				}).format(props.value)}
			</h3>
		</div>
	)
}