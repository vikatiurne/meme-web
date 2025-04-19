import { IMeme } from "@/types";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const fetchMemes = async (): Promise<IMeme[]> => {
  const res = await axios.get(`${API_URL}/getAllMemes`);
  return res.data;
};

export const fetchUpdateMemes = async (datameme: IMeme): Promise<IMeme[]> => {
  const res = await axios.put(`${API_URL}/updateMeme/${datameme._id}`, {
    datameme,
  });
  return res.data;
};
