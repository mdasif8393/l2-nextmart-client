import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Input } from "../../input";

type TImageUploaderProps = {
  imageFiles: File[] | [];
  setImageFiles: Dispatch<SetStateAction<[] | File[]>>;
  imagePreview: string[] | [];
  setImagePreview: Dispatch<SetStateAction<[] | string[]>>;
};

const NMImageUploader = ({
  setImageFiles,
  imageFiles,
  imagePreview,
  setImagePreview,
}: TImageUploaderProps) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImageFiles((prev) => [...prev, file]);

    if (file) {
      // convert file to url after upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };
  console.log({ imagePreview });

  return (
    <div>
      <Input
        onChange={handleImageChange}
        type="file"
        multiple
        accept="image/*"
        id="image-uploader"
        className="hidden"
      />
      <label
        htmlFor="image-uploader"
        className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
      >
        Upload Logo
      </label>
      <div>
        {imagePreview.map((preview, idx) => (
          <Image src={preview} key={idx} alt="" width={500} height={500} />
        ))}
      </div>
    </div>
  );
};

export default NMImageUploader;
