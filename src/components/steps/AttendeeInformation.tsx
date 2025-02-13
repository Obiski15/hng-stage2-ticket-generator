import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { uploadImg } from "../../services/uploadImg";
import { StepProperties, IForm } from "../../types";
import {
  ATTENDEE_STORAGE_KEY,
  DEFAULT_ATTENDEE_INFO,
} from "../../lib/constants";

import FooterButtons from "../FooterButtons";

function AttendeeInformation({ setTicketState }: StepProperties) {
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const { value: storedInfo, setValue: setStoredInfo } = useLocalStorage<IForm>(
    ATTENDEE_STORAGE_KEY,
    DEFAULT_ATTENDEE_INFO
  );
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: { ...storedInfo },
  });

  const onDrop = useCallback(
    async (files: File[]) => {
      setPreviewImage(URL.createObjectURL(files[0]));
      localStorage.setItem("previewImage", URL.createObjectURL(files[0]));
      try {
        setUploadError(false);
        setIsUploadingImage(true);

        const result = await uploadImg(files[0]);
        setStoredInfo((prevInfo) => {
          return { ...prevInfo, image: result.url };
        });
        setValue("image", result.url, { shouldValidate: true });
      } catch (error) {
        setUploadError(true);
        console.log((error as Error).message);
      } finally {
        setIsUploadingImage(false);
      }
    },
    [setValue, setStoredInfo]
  );

  const { isDragActive, getInputProps, getRootProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop,
  });

  const onSubmit: SubmitHandler<IForm> = () => {
    setTicketState((prev) => {
      return { ...prev, step: 3 };
    });
  };

  return (
    <form
      className="w-full flex flex-col justify-start items-start gap-8 rounded-2xl bg-[#08252B] py-8 px-6 animate-in-view border-border-primary border-[1px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col justify-start items-start gap-8 rounded-2xl bg-[#052228] pb-12 px-6 pt-6 border-border-primary border-[1px]">
        <h3>Upload Profile Photo</h3>
        <div className="w-full bg-[#00000033] flex justify-center items-center gap-[10px] cursor-pointer">
          <div
            style={{
              backgroundImage: `url(${storedInfo.image || previewImage})`,
            }}
            className={`relative bg-[#0E464F] rounded-[32px] p-6 flex flex-col justify-center items-center text-center gap-4 w-[240px] h-[240px] bg-center bg-cover bg-clip-padding bg-no-repeat border-[#24A0B5] border-4 ${
              isDragActive
                ? "border-border-primary border-dashed border-2 bg-[#0E464F]/70"
                : ""
            }`}
            {...getRootProps()}
          >
            {isUploadingImage && (
              <div className="absolute top-0 bottom-0 left-0 right-0 backdrop-blur-[2px] rounded-[32px] flex flex-col justify-center items-center">
                <img src="/icons/processing.svg" alt="processing" />
              </div>
            )}

            <img src="/icons/upload.svg" alt="upload" width={32} height={32} />
            {isDragActive ? (
              <p>Drop image here..</p>
            ) : uploadError ? (
              <p>Unable to upload image. Pls try again</p>
            ) : (
              <p
                className={`${errors.image?.message ? "text-destructive" : ""}`}
              >
                {errors.image?.message
                  ? errors.image?.message
                  : "Drag & drop or click to upload"}
              </p>
            )}
            <input
              disabled={isUploadingImage}
              type="file"
              {...register("image", {
                required: "Attendee image is required",
              })}
              {...getInputProps()}
            />
          </div>
        </div>
      </div>

      <div className="w-full h-1 bg-[#07373F]"></div>

      <div className="w-full flex flex-col gap-2 justify-between items-start">
        <label
          htmlFor="name"
          className={`after:content-['*'] after:p-2 ${
            errors.name?.message ? "after:text-destructive" : ""
          }`}
        >
          Enter your name
        </label>

        <input
          id="name"
          type="text"
          className="w-full border-border border-[1px] rounded-xl p-3"
          placeholder="e.g Obi Emmnauel"
          {...register("name", {
            required: "Attendee name is required",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setStoredInfo((prevInfo) => {
                return { ...prevInfo, name: e.target.value };
              });
            },
          })}
        />
      </div>
      <div className="w-full flex flex-col gap-2 justify-between items-start">
        <label
          htmlFor="email"
          className={`after:content-['*'] after:p-2 ${
            errors.email?.message ? "after:text-destructive" : ""
          }`}
        >
          Enter your email
        </label>

        <div className="w-full flex justify-start items-center gap-2 border-border border-[1px] rounded-xl px-3">
          <img src="/icons/inbox.svg" alt="inbox" width={24} height={24} />
          <input
            id="email"
            type="email"
            className="flex-1 p-3"
            placeholder="e.g. obiski15@gmail.com"
            {...register("email", {
              required: "Attendee email is required",
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setStoredInfo((prevInfo) => {
                  return { ...prevInfo, email: e.target.value };
                });
              },
            })}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 justify-between items-start">
        <label htmlFor="name">About the Project</label>

        <textarea
          id="name"
          className="w-full border-border border-[1px] rounded-xl p-3 resize-none"
          placeholder="Special request..."
          rows={3}
          {...register("about", {
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setStoredInfo((prevInfo) => {
                return { ...prevInfo, about: e.target.value };
              });
            },
          })}
        ></textarea>
      </div>

      <FooterButtons
        primary={{
          type: "submit",
          text: "Get My Free Ticket",
        }}
        secondary={{
          text: "Back",
          action: () => {
            setTicketState((prevInfo) => {
              return { ...prevInfo, step: 1 };
            });
          },
        }}
      />
    </form>
  );
}

export default AttendeeInformation;
