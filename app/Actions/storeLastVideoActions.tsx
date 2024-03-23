"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/utils/prisma"

// create a endpoint if there is none
export async function createVideoStorage(video: string) {
   
    // create endpoint with video url
    await prisma.lastVideo.create({
        data: {
            video: video
        }
    })

    revalidatePath("/")
}

// grab video link from endpoint
export async function getVideoFromStorage() {

    // if the video endpoint exists
    if (await prisma.lastVideo.count() > 0){

        const video = await prisma.lastVideo.findFirstOrThrow(); // grab the first video item
        
        // get the video url and return it
        const videoLink = await prisma.lastVideo.findUnique({
            where:{
                id: video.id
            }
        })
    
        revalidatePath("/")
    
        return videoLink?.video
    }

}

// update video url on endpoint
export async function updateStorageVideo(videoLink: string) {

    const item = await prisma.lastVideo.findFirstOrThrow(); // grab first video item
    
    // update the endpoint url
    await prisma.lastVideo.update({
        where: {
            id: item.id
        },
        data: {
            video: videoLink
        }
    });

    revalidatePath("/")
}

// grab the database storage length
export async function videoStorageLength() {

    const listCount = await prisma.lastVideo.count(); // get length and return it

    revalidatePath("/")

    return listCount
}