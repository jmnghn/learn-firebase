import React, { useEffect, useState } from "react";
import useFirestore from "../../hooks/useFirestore";

const DiaryForm = ({ uid }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { addDocument, response } = useFirestore("diary");

  useEffect(() => {
    if (response.success) {
      setTitle("");
      setText("");
    }
  }, [response.success]);

  const handleData = (e) => {
    const { id, value } = e.target;

    if (id === "tit") {
      setTitle(value);
    } else if (id === "txt") {
      setText(value);
    }
    // console.log({ id, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, text });
    addDocument({ uid, title, text });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>일기 쓰기</legend>

          <label htmlFor="tit">일기 제목: </label>
          <input
            id="tit"
            type="text"
            value={title}
            required
            onChange={handleData}
          />

          <label htmlFor="txt">일기 내용: </label>
          <textarea
            id="txt"
            type="text"
            value={text}
            required
            onChange={handleData}
          />

          <button type="submit">저장하기</button>
        </fieldset>
      </form>
    </>
  );
};

export default DiaryForm;
