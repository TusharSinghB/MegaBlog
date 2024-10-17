import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectID);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userID }) {
        try {
            return await this.databases.createDocument(
                conf.databaseID,
                conf.collectionID,
                slug,
                {
                    title: title,
                    content: content,
                    featured_image: featuredImage,
                    status: status,
                    userid: userID,
                }
            );
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        return await this.databases.updateDocument(
            conf.databaseID, // databaseId
            conf.collectionID, // collectionId
            slug, // documentId
            { title, content, featuredImage, status } // data (optional)
        );
    }

    async deletePost(slug) {
        await this.databases.deleteDocument(
            conf.databaseID, // databaseId
            conf.collectionID, // collectionId
            slug // documentId
        );
        return true;
    }

    async getPost(slug) {
        return await this.databases.getDocument(
            conf.databaseID, // databaseId
            conf.collectionID, // collectionId
            slug // documentId
        );
    }

    async getPosts(queries = [Query.equal[("status", "active")]]) {
        return await this.databases.listDocuments(
            conf.databaseID,
            conf.collectionID,
            queries
        );
    }

    //File Uplode ki services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.bucketID,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("ErROR", error);
            return false;
        }
    }
    async deleteFile(fileID) {
        return await this.bucket.deleteFile(conf.bucketID, fileID);
    }

    async previewFile(fileID) {
        return await this.bucket.getFilePreview(
            conf.bucketID, // bucketId
            fileID // fileId
        );
    }
}

const service = new Service();
export default service;
