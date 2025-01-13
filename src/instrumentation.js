import mongoConnect from "./app/lib/mongodb"

export const register =async ()=>{
    await mongoConnect()
}