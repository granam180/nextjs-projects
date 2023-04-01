// IMPORTANT: everytime ngrok is restarted, 
// you MUST update the ngrok url in Bright Data scraper settings to demo locally
// inside  `Delivery Preferences`

import * as functions from "firebase-functions";
import { adminDb } from "./firebaseAdmin";
// import * as admin from "firebase-admin";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

const fetchResults: any = async (id: string) => {  // using `any` as a return type
    const api_key = process.env.BRIGHTDATA_API_KEY;

    const res = await fetch(`https://api.brightdata.com/dca/dataset?id=${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${api_key}`,
        },
    })

    const data = await res.json();

    // console.log("DEBUG 1");
    if (data.status === "building" || data.status === "collecting") {
        console.log("NOT COMPLETE YET, TRYING AGAIN...");
        return fetchResults(id);
    }
    // console.log("DEBUG 2");
    return data;
}

export const onScraperComplete = functions.https.onRequest(
    async (request, response) => {
        console.log("SCRAPE COMPLETE >>>> : ", request.body);

        const { success, id, finished } = request.body;

        if (!success) {
            await adminDb.collection('searches').doc(id).set({
                status: "error",
                // updatedAt: admin.firestore.Timestamp.now(),  // Timestamps can be a fickle trickster making it seem like the pipeline is broken
                updatedAt: finished,
            }, 
            {
               merge: true 
            }
            );
        }

        const data = await fetchResults(id);

        await adminDb.collection('searches').doc(id).set({
            status: "complete",
            // updatedAt: admin.firestore.Timestamp.now(),
            updatedAt: finished,
            results: data,
        }, {
            merge: true
        });

        console.log("WOOHOO FULL CIRCLE")

  response.send("Scraping Function Finished!");
});