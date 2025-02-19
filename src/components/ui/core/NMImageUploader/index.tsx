import { useState } from "react";
import { Input } from "../../input";

const NMImageUploader = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImageFiles((prev) => [...prev, file]);
  };

  console.log(imageFiles);

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
    </div>
  );
};

export default NMImageUploader;
