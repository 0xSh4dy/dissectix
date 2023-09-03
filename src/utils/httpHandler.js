async function httpJsonPost(data,url){
    const response = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    });
    return await {"response":await response.json(),"status":response.status};
}

export {httpJsonPost};