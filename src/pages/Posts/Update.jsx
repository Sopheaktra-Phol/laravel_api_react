import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, user } = useContext(AppContext);
    const [formData, setFormData] = useState({
        title: "",
        body: "",
    });

    const [errors, setErrors] = useState({});

    async function getPosts(){
        const res = await fetch(`/api/posts/${id}`)
        const data = await res.json();

        if (res.ok) {
            //prevent url tempering to update other users' post
            if(data.post.user_id !== user.id) {
                navigate("/")
            }
            setFormData ({
                title: data.post.title,
                body: data.post.body,

            })
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();

        const res = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        console.log(data);
        if (data.errors){
            setErrors(data.errors);
        }else {
            navigate('/');
        }
    }

    useEffect(()=>{
        getPosts();
    },[])
    return (
        <>
            <h1 className="title">Update your post</h1>

            <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input
                        type="text"
                        placeholder="Post Title"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                    {errors.title && <p className="error">{errors.title[0]}</p>}
                </div>

                <div>
                    <textarea
                        rows="6"
                        placeholder="Post Content"
                        value={formData.body}
                        onChange={e => setFormData({ ...formData, body: e.target.value })}
                    />
                    {errors.body && <p className="error">{errors.body[0]}</p>}

                </div>

                <button className="primary-btn">Update</button>
            </form>
        </>
    );
}
