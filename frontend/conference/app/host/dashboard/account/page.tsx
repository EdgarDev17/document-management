"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  return (
    <div>
      <ImageUploader />
    </div>
  );
}

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<Uint8Array | null>(null);
  const [imageExtension, setImageExtension] = useState<string>(".jpg");

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.result) {
          const base64String = (fileReader.result as string).split(",")[1]; // Extrae solo la parte base64
          resolve(base64String);
        } else {
          reject(new Error("FileReader result is null"));
        }
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

      fileReader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const image = await convertToBase64(file);
      setImage(image);
    }
  };

  useEffect(() => {
    console.log(image);
  }, [image]);

  const handleSubmit = async () => {
    if (image) {
      try {
        const response = await axios.post(
          "http://localhost:5110/api/RegisterUsers/Imagen",
          {
            Image: image,
            ImageExtension: "JPEG",
          },
          {
            headers: {
              "Authorization-Token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiWTdLbVNCeTAxaFBPejQzRkhCVUVYQXpRR1dSS3pScWk1RFE2QSs5Z1pvaz0iLCJjb21wbGV0ZVByb2ZpbGUiOnRydWUsImNvdW50cnlJRCI6MSwiZXhwaXJhdGlvbkRhdGUiOiIyMDI0LTA4LTE0VDE0OjAxOjE3LjMyOTU5NDMtMDY6MDAiLCJzdGF0ZSI6dHJ1ZX0.mji7urX0kNp77s6-wMhFS6J36A0FqspqGcZy_hIDHXk",
            },
          },
        );
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload Image</button>
    </div>
  );
};
