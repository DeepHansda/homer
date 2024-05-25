import { callApi } from "@/lib/callApi";
import { createFile, execCommands } from "@/lib/utils";
import { exec, ExecException } from "child_process";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import os from "os";
import path from "path";
import fs from "fs";
import shortId from "shortid";




const systemType = os.type()
const fileName = "kaggle.json"
const { platform } = process;
const locale = path[platform === `win32` ? `win32` : `posix`];
const file = { "username": process.env.NAME, "key": process.env.KEY };
const jsonFile = JSON.stringify(file)
const kagglePath = String.raw`\src\app\api\setup\kaggleNotebook`
let kaggleFileDir = path.join(process.cwd(), kagglePath)
kaggleFileDir = kaggleFileDir.split(path.sep).join(locale.sep);



const modifyKaggleFile = () => {
  const kaggleJsonPath = path.join(kaggleFileDir, "kernel-metadata.json")
  fs.readFile(kaggleJsonPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    // Parse the JSON data
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return;
    }


    // Modify the object
    const title = `deephansda/${shortId.generate()}`
    jsonData.title = title

    // Stringify the modified object back to JSON
    const updatedJson = JSON.stringify(jsonData, null, 2);
    createFile(kaggleJsonPath, updatedJson)


  });
}



const fetchBackend = async () => {
  const fetchOpt = {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",

    },
    cache: "no-cache"
  };

  const response = await callApi("", fetchOpt)
  const resStatus = (response.status)
  const jsonResData = await response.json()
  return { resStatus, jsonResData }
}



export async function GET(request: NextRequest) {
  try {
    const response = await fetchBackend()
    if (response.resStatus == 200) {
      return NextResponse.json(response.jsonResData, { status: 200 })
    }


    const res = await execCommands("pip install kaggle")
    console.log(res)
    if (systemType == "Windows_NT") {
      const userName = os.userInfo().username;
      const path = `C:\\Users\\${userName}\\.kaggle\\${fileName}`
      const result = createFile(path, jsonFile)
      console.log(result)

    }


    if (systemType == "Linux") {
      const path = `/root/.kaggle/${fileName}`
      createFile(path, jsonFile)
      const result = await execCommands('chmod 600 /root/.kaggle/kaggle.json')
      console.log(result)
    }


    modifyKaggleFile()
    console.log(kaggleFileDir)
    const cmdres = await execCommands(`kaggle kernels push -p ${kaggleFileDir}`)
    console.log(cmdres)


    if (cmdres.returnCode == 2) {

      for (; ;) {
        const response = await fetchBackend()
        if (response.resStatus == 200) {
          return NextResponse.json(response.jsonResData, { status: 200 })
        }
      }
    }


    return NextResponse.json(cmdres, { status: 404 })
  }
  catch (err) {
    return new Response(err, { status: 500, })
  }
}