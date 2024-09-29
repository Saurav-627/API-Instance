import { useEffect, useState } from "react";
import { deletePost, getPost } from "../Services/PostApi";
import Form from "./Form";

const Post = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

  const getPostData = async () => {
    const res = await getPost();
    setData(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  // function to delete post
  const handleDeletePost = async (id) => {
    const res = await deletePost(id);
    try {
      if (res.status === 200) {
        const newUpdatedPost = data.filter((curPost) => {
          return curPost.id !== id;
        });
        setData(newUpdatedPost);
      } else {
        console.log("Failed to delete the post:", res.status);
      }
    } catch({error}){
      console.log(error);
    }
  };

  const handleUpdatePost = (curElem) => setUpdateDataApi(curElem);

  return (
    <div className="bg-gray-950">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-center">
          <Form
            data={data}
            setData={setData}
            updateDataApi={updateDataApi}
            setUpdateDataApi={setUpdateDataApi}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg">
          {data.map((curElem, index) => {
            const { title, body, id } = curElem;
            return (
              <div
                key={index}
                className=" bg-gray-800 shadow-md rounded-sm text-white p-4 border-l-2 border-white"
              >
                <h1>{index + 1}.</h1>
                <h2 className="text-lg mt-3 mb-2">
                  <span className="font-bold">Title:</span> {title}
                </h2>
                <p className="">
                  <span className="font-bold">Description:</span> {body}
                </p>
                <div className="flex gap-4 mt-2 justify-end">
                  <button
                    className="bg-green-600 px-6 py-1 rounded-2xl font-bold"
                    onClick={() => handleUpdatePost(curElem)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 px-6 py-1 rounded-2xl font-bold"
                    onClick={() => handleDeletePost(id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Post;
