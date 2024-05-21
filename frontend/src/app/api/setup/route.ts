import { createFile, execCommands } from "@/lib/utils";
import { exec, ExecException } from "child_process";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import os from "os";

const file = { "username": process.env.NAME, "key": process.env.KEY };
const jsonFile = JSON.stringify(file)

const systemType = os.type()
const fileName = "kaggle.json"
export async function GET(request: NextRequest) {
    try {
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

        
        const cmdres = await execCommands('kaggle -h')
        console.log(cmdres)
        // const jsonData = JSON.stringify(cmdres)
        return new NextResponse(cmdres,{status:200})
    }
    catch (err) {
        return new Response(err, { status: 500, })
    }
}