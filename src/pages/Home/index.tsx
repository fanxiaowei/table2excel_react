import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { mergeTable, staticTable } from "./data.js";

const Home = () => {
	const handleClick4ExportExcel = () => {};
	return (
		<section className="h-screen w-screen overflow-auto flex flex-col gap-10 p-20">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-5">
					静态表格 <Button onClick={handleClick4ExportExcel}>导出</Button>
				</div>
				<Table
					columns={staticTable.columns}
					bordered
					dataSource={staticTable.source}
					pagination={false}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-5">
					静态表格合并 <Button onClick={handleClick4ExportExcel}>导出</Button>
				</div>
				<Table
					columns={mergeTable.columns}
					bordered
					dataSource={mergeTable.source}
					pagination={false}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-5">
					动态表格合并 <Button onClick={handleClick4ExportExcel}>导出</Button>
				</div>
				<Table
					columns={mergeTable.columns}
					bordered
					dataSource={mergeTable.source}
					pagination={false}
				/>
			</div>
		</section>
	);
};

export default Home;
