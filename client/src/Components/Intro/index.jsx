import { React, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function Intro() {
  const { page } = useParams();
  useEffect(() => {
    const getTours = (page) => {
      axios
        .get("http://localhost:8000/api/tour/get-all-tour", {
          params: { page: page },
        })
        .then((res) => {
          console.log(res.data);
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTours(page);
  }, []);
  return (
    <div>
      <h1>Đẹp trai lỗi tại </h1>
    </div>
  );
}
