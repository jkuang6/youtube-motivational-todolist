"use server"

import { create } from "@/app/Actions/videoActions";

const apiKey = process.env.YOUTUBE_API_KEY;

// shuffle video list by switching positions
function shuffleList<T>(videoList: T[]): T[] {
    for (let i = videoList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [videoList[i], videoList[j]] = [videoList[j], videoList[i]];
    }
    return videoList;
}

export async function fetchVideos(): Promise<void> {

    // the youtube api links of the users I want
    const apiUrls = [
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1500&playlistId=UUAPByrKU5-R1emswVlyH_-g&key=${apiKey}`,
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1500&playlistId=UUFF4t2TnXYUGvtH4iV4B4wQ&key=${apiKey}`,
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1500&playlistId=UUx8-dWqjxdWz5ybGWnrEQtg&key=${apiKey}`,
    ];

    let allVideoURLs: string[] = []; // store all the videos

    try {
        // Fetch data from all API URLs concurrently
        const responses = await Promise.all(apiUrls.map(url => fetch(url)));

        // Check if all responses are successful
        const successfulResponses = responses.filter(response => response.ok);

        // Process data from successful responses
        const responseData = await Promise.all(successfulResponses.map(response => response.json()));

        // Accumulate video URLs from all responses
        responseData.forEach(data => {
            const videoURLs = data.items.map((element: any) => element.snippet.resourceId.videoId );
            allVideoURLs = allVideoURLs.concat(videoURLs);
        });

        // Shuffle the combined array of video URLs
        const shuffledURLs = shuffleList<string>(allVideoURLs);
        
        // Call create once with the combined array of video URLs
        create(shuffledURLs);

    } catch (error) {
        console.error('Error fetching videos:', error);
        throw error; // Throw error when videos cannot be fetched
    }
}
