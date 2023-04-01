 import { NextApiRequest } from "next";

export async function POST(req: Request) {  // export POST METHOD
    console.log("Submitting...", req.body);
    // const search = req.body.search

    // console.log("SEARCH IS >>", search)
// }

// export async function GET(req: Request) {  // // export GET METHOD
//     return new Response('Hello, Sean', {
//         status: 200
//     })
}
