import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useContext(AppContext);

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getPosts() {
        try {
            const res = await fetch(`/api/posts/${id}`);
            const data = await res.json();

            if (res.ok) {
                setPost(data.post);
            }
        } catch (error) {
            console.error("Error fetching post:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(e) {
        e.preventDefault();
        if (user && user.id === post.user_id) {
            const res = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                navigate('/');
            }
            console.log(data);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    if (loading) {
        return <p className="title">Loading...</p>;
    }

    return (
        <>
            {post ? (
                <div key={post.id} className="mt-4 p-4 border rounded-md border-dashed border-slate-400">
                    <div className="mb-2 flex items-start justify-between">
                        <div>
                            <h2 className="font-bold text-2xl">{post.title}</h2>
                            <small className="text-xs text-slate-600">
                                Created by {post.user.name} on {""}
                                {new Date(post.created_at).toLocaleTimeString()}
                            </small>
                        </div>
                    </div>
                    <p>{post.body}</p>

                    {user && user.id === post.user_id && (
                       <div className="flex items-center justify-end gap-4">
                       <Link to={`/posts/update/${post.id}`} className="action-btn update-btn">
                           Update
                       </Link>
                       <form onSubmit={handleDelete}>
                           <button className="action-btn danger-btn">Delete</button>
                       </form>
                   </div> 
                    )}
                </div>
            ) : (
                <p className="title">Post Not Found!</p>
            )}
        </>
    );
}
