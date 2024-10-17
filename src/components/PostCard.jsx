import { useEffect, useState } from "react";
import appwriteService from "../Appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featured_image }) {
    const [source, setSource] = useState(null);
    console.log(featured_image);

    useEffect(() => {
        appwriteService
            .previewFile(featured_image)
            .then((url) => setSource(url))
            .catch((error) => {
                console.error("Error fetching image:", error);
                // Handle the error appropriately
            });
    }, []);
    return (
        <Link to={`./post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={source} alt={title} className="rounded-xl" />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
