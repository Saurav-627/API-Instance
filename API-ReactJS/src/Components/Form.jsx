/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { postData, putPost } from "../Services/PostApi";

const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    if (updateDataApi) {
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
    } else {
      setAddData({ title: "", body: "" }); // Reset form when no updateDataApi
    }
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPostData = async () => {
    const res = await postData(addData);
    if (res.status === 201) {
      setData((prev) => [...prev, res.data]); // Use prev state to ensure correct rendering
      setAddData({ title: "", body: "" });
    }
  };

  const updatePostData = async () => {
    try {
      const res = await putPost(updateDataApi.id, addData);
      if (res.status === 200) {
        setData((prev) =>
          prev.map((curElem) =>
            curElem.id === updateDataApi.id ? res.data : curElem
          )
        );
        setAddData({ title: "", body: "" }); // Clear updateDataApi after successful update
        setUpdateDataApi({});
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    //copy paste wala code for add and edit showing
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <div>
      <form
        className="flex justify-between border-8 border-gray-900 bg-gray-900 shadow-gray-600 my-4 gap-2"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          name="title"
          id="title"
          autoComplete="off"
          className="border border-gray-300 rounded p-2 w-1/2"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="body"
          id="body"
          autoComplete="off"
          className="border border-gray-300 rounded p-2 w-1/2"
          placeholder="Add Body"
          value={addData.body}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-green-500 text-black font-semibold rounded px-4 py-1 ml-2"
          value={isEmpty ? "Add" : "Edit"}
        >
          {isEmpty ? "Add" : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
