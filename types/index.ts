import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IMeme {
  _id?: string;
  id: number;
  name: string;
  img: string;
  likes: number;
}

export interface ErrorResponse {
  message: string;
}
