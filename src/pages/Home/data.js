

export const staticTable  = {
    "columns":[
      {
        "title": "A前端",
        "width": 100,
        "dataIndex": "a"
      },
      {
        "title": "B柒八九",
        "width": 100,
        "dataIndex": "b"
      },
      {
        "title": "C北宸",
        "width": 100,
        "dataIndex": "c"
      },
       {
        "title": "D南蓁",
        "width": 100,
        "dataIndex": "d"
      }
    ],
    "source":[
      {
      "a": "a1",
      "b": "b1",
      "c": "c1",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      },
      {
      "a": "a2",
      "b": "b2",
      "c": "c2",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      },
      {
      "a": "a3",
      "b": "b3",
      "c": "c3",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      },
       {
      "a": "a4",
      "b": "b4",
      "c": "c4",
      "d": "专注于前端开发技术,Rust及AI应用知识分享"
      }
    ]
}
  
export const mergeTable = {
    "columns":[
      {
        "title": "A前端",
        "width": 100,
        "dataIndex": "a",
        "onCell": (record, index) => {
          if(index === 0) {
            return {
              rowSpan: 7
            }
          }
          if(index>0 && index<7) {
            return {
              rowSpan: 0
            }
          }
          if(index==7) {
            return {
              rowSpan: 2
            }
          }
          if(index>7&&index<9) {
            return {
              rowSpan: 0
            }
          }
        }
      },
      {
        "title": "B柒八九",
        "width": 100,
        "dataIndex": "b",
         "onCell": (record, index) => {
          if(index === 0) {
            return {
              rowSpan: 3
            }
          }
          if(index>0 && index<3) {
            return {
              rowSpan: 0
            }
          }
          if(index==3) {
            return {
              rowSpan: 2
            }
          }
          if(index>3&&index<5) {
            return {
              rowSpan: 0
            }
          }
        }
      },
      {
        "title": "C北宸",
        "width": 100,
        "dataIndex": "c"
      },
       {
        "title": "D南蓁",
        "width": 100,
        "dataIndex": "d"
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