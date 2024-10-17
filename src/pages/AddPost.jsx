import { Container, PostForm } from "../components";
function AddPost() {
    return (
        <div className="py-8">
            <Container>
                Add Post
                <PostForm />
            </Container>
        </div>
    );
}

export default AddPost;
