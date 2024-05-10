import { exec, ExecException } from "child_process";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export  function GET(request:NextRequest){
    try{
    const ex = exec("kaggle -h",(error)=>{
        if(error){
            throw new Error(error);
        }
    })
    const stdout = ex.stdout?.on("data", (data) => {
        return data
    })
    const execErr = ex.stderr?.on("error",(error)=>error)
    const err = ex.stderr?.on("data",(data)=>data)
    if (err) {
        console.log("err",err)
        return  NextResponse.json({err},{status:200})
    }
    
    if (execErr){
        console.log("execErr",execErr)
        return NextResponse.json({execErr},{status:200})
    }
    return Response.json({stdout},{status: 200})
}
    catch(err){
        return new Response(err,{status:500,})
    }
}