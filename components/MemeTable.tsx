"use client";

import {
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import EditMeme from "./EditMeme";
import Container from "./containers/Container";
import { IMeme } from "@/types";
import { useMemesQuery } from "@/hooks/useMemesQuery";
import { motion, useReducedMotion } from "framer-motion";
import { EditIcon } from "@/components/icons";

const MemeTable = () => {
  const [selectedMeme, setSelectedMeme] = useState<IMeme | null>(null);

  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  const queryMemes = useMemesQuery();

  const { isPending, data, error } = queryMemes;

  const handleEdit = (meme: IMeme) => {
    setSelectedMeme(meme);
    onOpen();
  };

  const TableBodyContentMotion = motion.table;

  const shakeAnimation = {
    initial: { translateX: 0 },
    animate: {
      translateX: [0, -120, 0],
      transition: {
        duration: 2,
        ease: "easeOut",
        repeat: 0,
      },
    },
  };

  const noAnimation = {
    initial: { translateX: 0 },
    animate: { translateX: 0 },
  };

  const [isMdOrLarger, setIsMdOrLarger] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setIsMdOrLarger(window.innerWidth > 412);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const variants =
    isMdOrLarger || prefersReducedMotion ? noAnimation : shakeAnimation;

  if (isPending) {
    return <p className="mt-6 mb-8 text-center">Loading...Get memes...</p>;
  } else {
    return (
      <Container>
        <div className="overflow-x-auto ">
          <TableBodyContentMotion
            className="p-2 min-w-full bg-white shadow-md rounded-lg overflow-hidden"
            variants={variants}
            initial="initial"
            animate="animate"
          >
            <Table
              aria-label="memes list"
              classNames={{
                table:
                  "p-2 min-w-full bg-white shadow-md rounded-lg overflow-hidden",
                thead: "mb-4 ",
                th: "text-white font-semibold uppercase p-2 md:p-4 text-left bg-gray-800 ",
                td: "text-gray-600 p-2",
                wrapper: "p-0 border",
                tr: "p-2 md:p-4 border-b border-gray-200 text-sm md:text-lg xl:text-xl hover:bg-gray-100 transition-colors duration-200",
              }}
            >
              <TableHeader>
                <TableColumn>Id</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Image</TableColumn>
                <TableColumn>Likes</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>

              <TableBody>
                {data && !error?.response ? (
                  data.map((meme) => (
                    <TableRow key={meme._id}>
                      <TableCell>{meme.id}</TableCell>
                      <TableCell>{meme.name}</TableCell>
                      <TableCell
                        style={{
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Link
                          href={meme.img}
                          target="blank"
                          className="text-blue-500 underline"
                        >
                          {meme.img}
                        </Link>
                      </TableCell>
                      <TableCell>{meme.likes}</TableCell>
                      <TableCell>
                        <Button
                          onPress={() => handleEdit(meme)}
                          className="p-1 flex items-center gap-2 bg-[#947521] text-white hover:bg-[#bb9535] rounded"
                        >
                          Edit
                          <EditIcon width={20} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p className="p-4 text-center text-red-500">
                    {error.response?.data.message}
                  </p>
                )}
              </TableBody>
            </Table>
          </TableBodyContentMotion>
        </div>

        <EditMeme
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          meme={selectedMeme}
        />
      </Container>
    );
  }
};

export default MemeTable;
