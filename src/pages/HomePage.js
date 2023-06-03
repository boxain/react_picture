import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "../components/Search";
import Picture from "../components/Picture";
require("dotenv").config();

const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const auth = "your api key";
  const initial_url = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const search_url = `https://api.pexels.com/v1/search?query=${input}&per_page=15`;

  const search = async (url) => {
    let results = await axios.get(url, {
      headers: { Authorization: auth },
    });
    setData(results.data.photos);
  };

  const handleMorePictureBtn = async () => {
    let newUrl = "";
    setPage(page + 1);
    if (searchInput === "") {
      newUrl = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`;
    } else {
      newUrl = `https://api.pexels.com/v1/search?query=${searchInput}&page=${
        page + 1
      }&per_page=15`;
    }
    let results = await axios.get(newUrl, {
      headers: { Authorization: auth },
    });
    setData(data.concat(results.data.photos));
  };

  useEffect(() => {
    search(initial_url);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(search_url);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data?.map((d) => {
          return <Picture data={d} />;
        })}
      </div>
      <div className="morePicture">
        <button onClick={handleMorePictureBtn}>更多圖片</button>
      </div>
    </div>
  );
};

export default HomePage;
