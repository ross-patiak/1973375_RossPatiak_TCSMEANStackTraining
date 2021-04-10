const http = require("http");
const url = require("url");
const fs = require('fs');
const port = 4000;

const jsonReader = (filePath, cb) => (
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if(err) {
            return cb && cb(err)
        }

        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object)
        } catch (err) {
            return cb && cb(err);

        }
    })
);

const jsonWriter = (filePath, content) => (
    fs.writeFile(filePath, content, err => {
        if (err) {
          console.error(err);
          return
        }
      })
);

//full html of the only page
const html = `
    <h1 style="text-center">Task Planner</h1><br>

    <form action="/add" method="get">
        <label>Emp Id</label>
        <input type="text" name="empId"/><br/>
        <label>Task Id</label>
        <input type="text" name="taskId"/><br/>
        <label>Task</label>
        <input type="text" name="taskText"/><br/>
        <label>Deadline</label>
        <input type="text" name="deadline"/><br/>
        <input type="submit" value="Add Task"/>
        <input type="reset" value="reset"/>
    </form>

    <form action="/delete" method="get">
        <label>Task Id</label>
        <input type="text" name="taskId"/>
        <input type="submit" value="Delete Task"/>
    </form>
    <br><br>

    <form action="/list" method="post">
        <input type="submit" value="List All Tasks" />
    </form>


`

const listTasks = (taskList) => {

    const style = "'border: 1px solid black; border-collapse: collapse;'"

    let tableHeader = 
            `<table style=${ style }>
                <tr style=${ style }">
                    <th style=${ style }>Emp Id</th>
                    <th style=${ style }>Task Id</th>
                    <th style=${ style }>Task</th>
                    <th style=${ style }>Deadline</th>
                </tr>`

    taskList.forEach((task, i) => {
        if(i !== taskList.length - 1) {

            const tableEntry = 
                `<tr>
                    <td style=${ style }>${ task.empId }</td>
                    <td style=${ style }>${ task.taskId }</td>
                    <td style=${ style }>${ task.taskText }</td>
                    <td style=${ style }>${ task.deadline }</td>
                </tr>`
            
            tableHeader+=tableEntry;
        } else {

            const tableEntry = 
                `<tr>
                    <td style=${ style }>${ task.empId }</td>
                    <td style=${ style }>${ task.taskId }</td>
                    <td style=${ style }>${ task.taskText }</td>
                    <td style=${ style }>${ task.deadline }</td>
                </tr>
                </table>
                `
            tableHeader+=tableEntry;
                
        }
    });

    return tableHeader;
}


let server = http.createServer((req,res)=> {
    
    const pathInfo = url.parse(req.url,true).pathname;
    let data = ''

    //switches logic based on url endpoint
    switch(pathInfo) {
        case "/":
            res.setHeader("content-type","text/html"); 
            res.end(html);

            break;
        case "/add":
            //if adding task, get data from url params, then write it to json file
            res.setHeader("content-type","text/html");
            res.write(html);
            data = url.parse(req.url,true).query;
            const newTask = { empId: data.empId, taskId: data.taskId, taskText: data.taskText, deadline: data.deadline }

            jsonReader('./data.json', (err, data) => {
                if(err) {
                    console.log(err);
                } else {
                    let jsonData = data;
                    jsonData.push(newTask);

                    //write parsed JSON back into json file
                    jsonWriter('./data.json', JSON.stringify(jsonData, null, 2));
                    
                }
            });

            res.end();

            break;
        case "/delete":
            //if adding task, get data from url params, then modify json file

            res.setHeader("content-type","text/html");
            res.write(html);
            data = url.parse(req.url,true).query;
            const idToDelete = data.taskId

            jsonReader('./data.json', (err, data) => {
                if(err) {
                    console.log(err);
                } else {
                    //returns array without the task that was deleted
                    let jsonData = data.filter(task => task['taskId'] !== idToDelete);

                    //rewrite json file with this modified array
                    jsonWriter('./data.json', JSON.stringify(jsonData, null, 2));
                    
                }
            });

            res.end();
            break;
        case "/list":
            res.setHeader("content-type","text/html");
            let newList;

            //using readFileSync to fix scope issues; needed to lift file data to the outermost scope so it can be used by res.write. Async readFile did not allow this.
            try {
                const data = fs.readFileSync('./data.json', 'utf8')
                newList = JSON.parse(data);
              } catch (err) {
                console.error(err)
              }

            let newContent = listTasks(newList);
            //render html with newList  
            res.write(html+newContent);
            res.end();

            break;
        default:
            res.end("Endpoint does not exist")
    }

});
    
server.listen(port,()=>console.log(`running on port ${port}`));