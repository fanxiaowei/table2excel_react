import init, { generate_excel } from "@/wasm/table2excel";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { mergeTable, staticTable } from "./data.js";
// import init, {fibonacci } from '@/wasm/fibonacci';

const Home = () => {
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
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-5">
					静态表格合并 <Button onClick={handleExport4StaticMerge}>导出</Button>
				</div>
				<Table
					columns={mergeTable.columns}
					bordered
					dataSource={mergeTable.source}
					pagination={false}
				/>
			</div>
			{/* <div className="flex flex-col gap-2">
				<div className="flex items-center gap-5">
					动态表格合并 <Button onClick={handleClick4ExportExcel}>导出</Button>
				</div>
				<Table
					columns={mergeTable.columns}
					bordered
					dataSource={mergeTable.source}
					pagination={false}
				/>
			</div> */}
		</section>
	);
};

export default Home;
