import { Video } from "../models/Video"
import { db } from "./database"

export const addVideo = async (video: Video) => {
    try {
        db.addData('videos', video)
        return {
            isSuccess: true,
            message: "Video added successfully"
        }
    } catch ( error) {
        console.error(error)
    } return {
        isSuccess: true,
        error: "Error adding video"
    }
}

export const updateVideo = async (video: Video) => {
    try {
        db.updateData('videos', video)
        return {
            isSuccess: true,
            message: "Video updated successfully"
        }
    } catch ( error) {
        console.error(error)
    } return {
        isSuccess: true,
        error: "Error updating video"
    }
}

export const getVideo = async (_id: number) => {
    try {
        const video = await db.getData('videos', _id)
        return {
            isSuccess: true,
            result: video,
        }
    } catch ( error) {
        console.error(error)
    } return {
        isSuccess: true,
        error: "Error getting video"
    }
}

export const getAllVideo = async () => {
    try {
        const videos = await db.getAllData('videos')
        return {
            isSuccess: true,
            results: videos,
            message: "Successfully getting video"
        }
    } catch ( error) {
        console.error(error)
    } return {
        isSuccess: true,
        error: "Error getting video"
    }
}

export const deleteVideo = async (_id: number) => {
    try {
        await db.deleteData('videos', _id)
        return {
            isSuccess: true,
        }
    } catch ( error) {
        console.error(error)
    } return {
        isSuccess: true,
        error: "Error deleting video"
    }
}