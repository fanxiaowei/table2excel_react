import init, { generate_excel } from "@/wasm/table2excel";
import { Button, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { mergeDynamicTable, mergeTable, staticTable } from "./data.js";
// import init, {fibonacci } from '@/wasm/fibonacci';

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
	const [rowMergeMaps, setRowMergeMaps] = useState(new Map());

	const calculateRowMerge = useCallback(
		(data: ListItem[], field: keyof ListItem, parentField?: keyof ListItem) => {
			const keyIndexMap = new Map<string, RowSpanTuple>();
			data.reduce(
				(acc, item, index) => {
					const prevItem = data[index - 1] || data[0];
					let currentAcc = acc;

					if (prevItem && prevItem[field] === item[field]) {
						// 如果和前一个字段值相同，更新结束位置
						currentAcc[1] = index;
					} else {
						// 否则，记录新的开始和结束位置
						if (currentAcc[0] !== null) {
							const key = parentField
								? `${prevItem[parentField]}-${prevItem[field]}`
								: `${prevItem[field]}`;
							keyIndexMap.set(key, currentAcc);
						}
						currentAcc = [index, index];
					}

					// 如果是最后一个元素，也需要处理一下
					if (index === data.length - 1) {
						keyIndexMap.set(item[field], currentAcc);
					}

					return currentAcc;
				},
				[0, 0] as RowSpanTuple,
			);
			return keyIndexMap;
		},
		[],
	);

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

	const handleExcelBlob = (res: Blob) => {
		const blob = new Blob([res], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
		});
		const a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = "data.xlsx";
		document.body.append(a);
		a.click();
	};
	const handleExport4Static = async () => {
		await init();
		const res = await generate_excel({
			columns: staticTable.columns,
			source: staticTable.source,
			name: "front789",
			merge: [],
		});
		handleExcelBlob(res);
	};
	const handleExport4StaticMerge = async () => {
		await init();
		const res = await generate_excel({
			columns: mergeTable.columns,
			source: mergeTable.source,
			name: "front789",
			merge: [
				{
					from: {
						column: 0,
						row: 10,
					},
					to: {
						column: 3,
						row: 10,
					},
				},
				{
					from: {
						column: 3,
						row: 1,
					},
					to: {
						column: 3,
						row: 9,
					},
				},
			],
		});
		handleExcelBlob(res);
	};

	const handleExport4DynamicMerge = async () => {
		await init();
		const res = await generate_excel({
			columns: mergeTable.columns,
			source: mergeTable.source,
			name: "front789",
			merge: [
				{
					from: {
						column: 0,
						row: 10,
					},
					to: {
						column: 3,
						row: 10,
					},
				},
				{
					from: {
						column: 3,
						row: 1,
					},
					to: {
						column: 3,
						row: 9,
					},
				},
			],
		});
		handleExcelBlob(res);
	};
	return (
		<section className="h-screen w-screen overflow-auto flex flex-col gap-10 p-20">
			{/* <div className="flex flex-col gap-2">
				<div className="flex items-center gap-5">
					静态表格 <Button onClick={handleExport4Static}>导出</Button>
				</div>
				<Table
					columns={staticTable.columns}
					bordered
					dataSource={staticTable.source}
					pagination={false}
				/>
			</div> */}
			{/* <div className="flex flex-col gap-2">
				<div className="flex items-center gap-5">
					静态表格合并 <Button onClick={handleExport4StaticMerge}>导出</Button>
				</div>
				<Table
					columns={mergeTable.columns}
					bordered
					dataSource={mergeTable.source}
					pagination={false}
				/>
			</div> */}
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-5">
					动态表格合并 <Button onClick={handleExport4DynamicMerge}>导出</Button>
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
