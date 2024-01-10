import { NextPage, GetServerSideProps } from "next";
import React from "react";
import { useState } from "react";

type Props = {
  initialImage: Image;
};

const IndexPage: NextPage<Props> = (props) => {
  const [image, setImage] = useState(props.initialImage);
  const [loading, setLoading] = useState(false);

  const clickHandler = async () => {
    setLoading(true);
    const res = await fetchImage();
    setImage(res);
    setLoading(false);
  };

  return (
    <div className="flex-col ">
      <button
        className="bg-indigo-700 font-semibold text-white rounded py-2 px-4"
        onClick={clickHandler}
      >
        load 猫
      </button>
      {loading ? (
        <div>loading</div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold underline">猫画像</h1>
          <img src={image.url}></img>
        </div>
      )}
    </div>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImage: image,
    },
  };
};

type Image = {
  url: string;
};

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
