"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/utils/prisma"

// create a database of youtube videos
export async function create(videoItems: string[]) {
    // Getting the number of videos stored
    const listCount = await prisma.videoList.count()
    // If zero, populate the list with more videos
    if (listCount == 0) {
        for (const item in videoItems) {
            await prisma.videoList.create({
                data: {
                    video: videoItems[item]
                }
            });
        }
    }

    revalidatePath("/")
}

// pop the first video item
export async function popVideo() {

    // Grabbing the first video off the list
    const videoItem = await prisma.videoList.findFirstOrThrow()

    // If successful, pop the video out of the Prisma table and return that item
    if (videoItem && videoItem.video) {
        await prisma.videoList.delete({
            where: { id: videoItem.id }
        });
    }

    revalidatePath("/")
    return videoItem
}

// delete all videos
export async function deleteAllVideos() {

    await prisma.videoList.deleteMany()

    revalidatePath("/")
}

// check the length of the database
export async function checkDatabaseLength() {

    const listCount = await prisma.videoList.count()

    revalidatePath("/")
    return listCount
}