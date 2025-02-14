/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { FieldValues } from "react-hook-form";

export const resisterUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
