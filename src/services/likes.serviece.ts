import mongoose from "mongoose"
import { User } from "../models/user.model"
import { user, userPagination, userPaginator } from "../types/user.type"
import { QueryHelper } from "../helper/query.helper"
import { pathToFileURL } from "bun"

export const LikeService = {
    toggleLike: async function (user_id: string, target_id: string): Promise<boolean> {
        const target = await User.findById(target_id).select("_id").exec()
        if (!target)
            throw new Error("Invalid target_id")
        const likeTarget = await User.findOne({
            _id: new mongoose.Types.ObjectId(user_id),
            following: { $elemMatch: { $eq: target._id } }
        }).exec()
        if (likeTarget) {
            await User.findByIdAndUpdate(user_id, { $pull: { following: target_id } })
            await User.findByIdAndUpdate(target_id, { $pull: { following: target_id } })
        } else {
            await User.findByIdAndUpdate(user_id, { $addToSet: { following: target_id } })
            await User.findByIdAndUpdate(target_id, {
                $addToSet
                    : { following: target_id }
            })

        }

        return true
    },
    getFollower: async function (user_id: string, pagination: userPagination): Promise<userPaginator> {
        const _query = User.findById(user_id)
            .populate({
                path: "follower",
                match: { $and: QueryHelper.parseUserQuery(pagination) },
                select: '_id username display_name photos  introduction interest location  gender date_of_birth',
                populate: { path: "photos" }
            })
        const [docs, total] = await Promise.all([
            _query.exec(),
            User.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(user_id) } },
                { $project: { count: { $size: { $ifNull: ["$follower"] } } } }
            ])
        ])
        pagination.length = total[0].count
        let followers: user[] = []
        if (docs) {
            const x = docs.follower as user[]
        }
        return {
            pagination: pagination,
            items: followers
        }
    },
    getFollowing: async function (user_id: string, pagination: userPagination): Promise<userPaginator> {
        const _query = User.findById(user_id)
            .populate({
                path: "following",
                match: { $and: QueryHelper.parseUserQuery(pagination) },
                select: '_id username display_name photos  introduction interest location  gender date_of_birth',
                populate: { path: "photos" }
            })
        const [docs, total] = await Promise.all([
            _query.exec(),
            User.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(user_id) } },
                { $project: { count: { $size: { $ifNull: ["$following"] } } } }
            ])
        ])
        pagination.length = total[0].count
        let following: user[] = []
        if (docs) {
            const x = docs.follower as user[]
        }
        return {
            pagination: pagination,
            items: following
        }
    }
}