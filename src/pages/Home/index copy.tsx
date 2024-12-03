import init, { generate_excel } from "@/wasm/table2excel";
import { Button, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { mergeDynamicTable, mergeTable, staticTable } from "./data.js";

export type ListItem = {
	id?: string;
	a: string;
	b: string;
	c: string;
	d: string;
};

type RowSpanTuple = [number, number];

const Home = () => {
	const [columns, setColumns] = useState(mergeDynamicTable.columns);
	const [source, setSource] = useState([]);
	const [rowMergeMaps, setRowMergeMaps] = useState<
		Map<string, Map<string, RowSpanTuple>>
	>(new Map());
	const [time, setTime] = useState(0);

	const calculateRowMerge = useCallback(
		(data: ListItem[], field: keyof ListItem, parentField?: keyof ListItem) => {
			const keyIndexMap = new Map<string, RowSpanTuple>();

			const getKey = (item: ListItem) =>
				parentField ? `${item[parentField]}-${item[field]}` : `${item[field]}`;

			data.reduce(
				(acc, item, index) => {
					const prevItem = data[index - 1] || data[0];

					const isSameGroup = parentField
						? prevItem[parentField] === item[parentField] &&
							prevItem[field] === item[field]
						: prevItem[field] === item[field];

					if (isSameGroup) {
						acc[1] = index;
					} else {
						if (acc[0] !== null) {
							keyIndexMap.set(getKey(prevItem), acc);
						}
						acc = [index, index];
					}

					if (index === data.length - 1) {
						keyIndexMap.set(getKey(item), acc);
					}

					return acc;
				},
				[0, 0] as RowSpanTuple,
			);

			return keyIndexMap;
		},
		[],
	);

	useEffect(() => {
		//省去部分代码
	}, []);

	useEffect(() => {
		const emulateAsync = async () => {
			return new Promise((resolve) =>
				setTimeout(
					() => resolve(mergeDynamicTable.source),
					Math.random() * 1000 + 1000,
				),
			);
		};

		emulateAsync().then((source) => {
			if (!source || !Array.isArray(source)) {
				console.error("Invalid source data");
				return;
			}

			const data = [...source];
			const map = new Map();

			map.set("a", calculateRowMerge(data, "a"));
			if (data[0]?.b) {
				map.set("b", calculateRowMerge(data, "b", "a"));
			}

			setRowMergeMaps(map);
			setSource(source);
		});
	}, [calculateRowMerge]);

	useEffect(() => {
		if (source?.length) {
			const baseColumns = [...mergeDynamicTable.columns];
			// 处理第一行的行合并
			const userNameMap = rowMergeMaps.get("a");
			baseColumns[0].onCell = (value, index) => {
				const indexSpan = userNameMap.get(value.a);
				if (indexSpan) {
					if (indexSpan[0] === index) {
						return { rowSpan: indexSpan[1] - indexSpan[0] + 1 };
					}
					if (
						(index as number) > indexSpan[0] &&
						(index as number) <= indexSpan[1]
					)
						return { rowSpan: 0 };
				}

				return { rowSpan: 0 };
			};

			const typeMap = rowMergeMaps.get("b");
			baseColumns[1].onCell = (value: ListItem, index: number) => {
				const indexSpan = typeMap.get(`${value.a}-${value.b}`);
				if (indexSpan) {
					if (indexSpan[1] !== indexSpan[0] && indexSpan[0] === index) {
						return { rowSpan: indexSpan[1] - indexSpan[0] + 1 };
					}
					if (index > indexSpan[0] && index <= indexSpan[1])
						return { rowSpan: 0 };
				}

				return {};
			};

			setColumns(baseColumns);
		}
	}, [source, rowMergeMaps]);

	const handleExport4DynamicMerge = async () => {
		const startTime = performance.now();
		const res = await generate_excel({
			columns: mergeTable.columns,
			source: mergeTable.source,
			name: "front789",
			correlation: ["a", "b"],
		});
		console.timeEnd("generate_excel_duration");

		const endTime = performance.now();
		const duration = endTime - startTime;
		setTime(duration);

		handleExcelBlob(res);
	};

	const handleExcelBlob = (res: Blob) => {
		//省去部分代码
	};

	return (
		<section className="h-screen w-screen overflow-auto flex flex-col gap-10 p-20">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-5">
					动态表格合并 <Button onClick={handleExport4DynamicMerge}>导出</Button>{" "}
					<span>耗时：{time}ms</span>
				</div>
				<Table
					columns={columns}
					bordered
					dataSource={source}
					pagination={false}
				/>
			</div>
		</section>
	);
};

export default Home;
