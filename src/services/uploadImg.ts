export const uploadImg: (file: File) => Promise<{ url: string }> = async (
  file: File
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/upload`,
    {
      body: formData,
      method: "POST",
    }
  );
  const result = await res.json();

  return result;
};
