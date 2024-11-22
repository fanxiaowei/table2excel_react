

export const staticTable = {  
    "columns":[
      {
        "title": "A前端",
        "width": 100,
        "dataIndex": "a"
      },
      {
        "title": "B柒八九",
        "width": "50",
        "dataIndex": "b"
      },
      {
        "title": "C北宸",
        "width": 100,
        "dataIndex": "c"
      },
       {
        "title": "D南蓁",
        "width": "500px",
        "dataIndex": "d"
      }
    ],
    "source":[
      {
      "a": 1,
      "b": "b1",
      "c": "c1",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      },
      {
      "a": 2,
      "b": "b2",
      "c": "c2",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      },
      {
      "a": 3,
      "b": "b3",
      "c": "c3",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      },
       {
      "a": 4,
      "b": "b4",
      "c": "c4",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      }
    ]
}

const sharedOnCell = (_, index) => {
  if (index === 9) {
    return { colSpan: 0 };
  }
  return {};
};
  
export const mergeTable = {
    "columns":[
      {
        "title": "A前端",
        "width": 100,
        "dataIndex": "a",
        onCell: (_, index) => { 
          if (index == 9) { 
            return {
              colSpan:4
            }
          }
        }
      },
      {
        "title": "B柒八九",
        "width": 100,
        "dataIndex": "b",
        onCell:sharedOnCell
      },
      {
        "title": "C北宸",
        "width": 100,
        "dataIndex": "c",
        onCell:sharedOnCell
      },
       {
        "title": "D南蓁",
        "width": 100,
         "dataIndex": "d",
         onCell: (_, index)=>{ 
           if (index == 9) { 
             return {
              colSpan:0
            }
           }

           if (index == 0) { 
             return {
               rowSpan:9
             }
           }
           if (index > 0) { 
             return {rowSpan:0}
           }
          return {};
         }
      }
    ],
    "source":[
      {
      "a": "A1",
      "b": "b1",
      "c": "c1",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      },
      {
      "a": "A1",
      "b": "b1",
      "c": "c2",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      },
      {
      "a": "A1",
      "b": "b1",
      "c": "c3",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      },
       {
      "a": "A1",
      "b": "b2",
      "c": "c3",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      },
       {
      "a": "A1",
      "b": "b2",
      "c": "c4",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      },
      {
      "a": "A1",
      "b": "b3",
      "c": "c4",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      },
       {
      "a": "A1",
      "b": "b4",
      "c": "c4",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      },
      {
      "a": "A2",
      "b": "b1",
      "c": "c1",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      },
      {
      "a": "A2",
      "b": "b1",
      "c": "c2",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      },
       {
      "a": "A3",
      "b": "b1",
      "c": "c1",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      }
    ]
}