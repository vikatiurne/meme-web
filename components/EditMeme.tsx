import { IMeme } from "@/types";
import { fetchUpdateMemes } from "@/utils/api";
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

interface EditMemeProps {
  meme: IMeme | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditMeme: React.FC<EditMemeProps> = ({ meme, isOpen, onOpenChange }) => {
  const [name, setName] = useState(meme?.name ?? "");
  const [img, setImg] = useState(meme?.img ?? "");
  const [likes, setLikes] = useState(meme?.likes.toString() ?? "0");

  useEffect(() => {
    if (meme) {
      setName(meme.name);
      setImg(meme.img);
      setLikes(meme.likes.toString());
    }
  }, [meme]);

  const closeandclear = () => {
    onOpenChange(false);
    if (meme) {
      setName(meme.name);
      setImg(meme.img);
      setLikes(meme.likes.toString());
    }
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setImg(newValue);
  };

  const closeModalHandler = () => {
    closeandclear();
  };

  const queryyClien = useQueryClient();

  const memeMutation = useMutation({
    mutationFn: (datameme: IMeme) => fetchUpdateMemes(datameme),
    onSuccess: async () => {
      await queryyClien.invalidateQueries({ queryKey: ["memes"] });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!meme?.id) {
      return;
    }
    const updatedMeme: IMeme = {
      _id: meme?._id,
      id: meme?.id,
      name,
      img,
      likes: parseInt(likes, 10),
    };

    memeMutation.mutate(updatedMeme);
    closeandclear();
  };

  const inputStyle = {
    inputWrapper: "rounded ",
    input:
      "rounded-md bd-gray-200 text-gray-700 font-bold pt-2 border w-72 outline-none border-0",
    label: "mb-4",
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        header: "text-black font-bold underline justify-center mb-2",
        footer: "flex justify-between w-full",
      }}
    >
      <div
        role="button"
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 z-50 flex items-center justify-center flex-col gap-2 bg-gradient-to-t from-zinc-900 to-zinc-900/80 "
      >
        <div
          role="button"
          className="p-4 bg-amber-50  rounded mx-2"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <ModalHeader>Edit Meme Info</ModalHeader>
          <Form onSubmit={onSubmit} className="rounded-2xl ">
            <ModalBody>
              <Input
                inputMode="text"
                label="Meme name"
                isRequired
                placeholder="Meme name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                classNames={inputStyle}
              />
              <Input
                isRequired
                inputMode="url"
                type="url"
                label="Image URL"
                placeholder="Image URL"
                errorMessage="Type correct URL"
                value={img}
                onChange={handleImgChange}
                classNames={inputStyle}
              />
              <Input
                isRequired
                placeholder="Likes"
                label="Quantaty likes"
                type="number"
                min={0}
                max={99}
                inputMode="numeric"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
                classNames={inputStyle}
                errorMessage="Number mast be between 0 and 99"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                onPress={closeModalHandler}
                color="danger"
                variant="light"
                className="bg-gray-500 text-white hover:text-red-400 hover:bg-gray-300 rounded"
              >
                Close
              </Button>
              <Button
                type="submit"
                className="bg-blue-400 text-white hover:bg-blue-700 rounded"
              >
                Save
              </Button>
            </ModalFooter>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default EditMeme;
