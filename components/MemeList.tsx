"use client";
import { useMemesQuery } from "@/hooks/useMemesQuery";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from "@heroui/react";
import React from "react";

const MemeList = () => {
  const queryMemes = useMemesQuery();

  const { isPending, data, error } = queryMemes;

  if (isPending) {
    return <p className="mt-6 mb-8 text-center">Loading...Get memes...</p>;
  } else {
    return (
      <div className="w-full gap-2 grid grid-cols-2 sm:grid-cols-4 px-2">
        {data && !error?.response ? (
          data.map((meme) => (
            <Card
              key={meme._id}
              className="py-4"
              classNames={{ footer: "overflow-hidden max-w-[19rem] whitespace-nowrap text-ellipsis" }}
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{meme.name}</p>
                <small className="text-default-500">Likes: {meme.likes}</small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-contain rounded-xl"
                  src={meme.img}
                  width={300}
                  height={250}
                />
              </CardBody>
              <CardFooter>
                <Link
                  className="font-bold text-small w-[20rem]"
                  href={meme.img}
                  target="blank"
                >
                  {meme.img}
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="p-4 text-center text-red-500">
            {error.response?.data.message}
          </p>
        )}
      </div>
    );
  }
};

export default MemeList;
