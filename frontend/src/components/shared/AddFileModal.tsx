import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useEffect } from "react";
import { z } from "zod";
import useUploadFile from "../hooks/useUploadFile";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  files: z
    .custom<FileList>()
    .refine((file) => file.length > 0, { message: "Please select a file" }),
});

type AddFileFormData = z.infer<typeof schema>;

export default function AddFileModal({
  onClose,
  isModalOpen,
}: {
  onClose: () => void;
  isModalOpen: boolean;
}) {
  const queryClient = useQueryClient()
  const { t } = useTranslation();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<AddFileFormData>({ resolver: zodResolver(schema) });
  const { data, error, isPending, mutate } = useUploadFile();

  useEffect(() => {
    if (data) {
      window.location.reload();
      onClose();
    }
  }, [data, onClose, queryClient]);

  const onSubmit = (data: AddFileFormData) => {
    const formData = new FormData();

    [...data.files].forEach((file) => formData.append("files", file));

    mutate(formData);
  };

  return (
    <div>
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        readOnly
        checked={isModalOpen}
        id="my_modal_6"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold">{t("addFileModal.title")}</h3>
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </div>
          <form className="py-5" action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-1">
              <input
                type="file"
                {...register("files")}
                multiple
                className="file:py-2 file:rounded-md"
              />
              {(errors["files"] || error) && (
                <span className="text-sm text-red-700">
                  {(errors["files"] || error)?.message}
                </span>
              )}
            </div>
            <div className="modal-action">
              {isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <button className="btn" disabled={isPending}>
                  {t("addFileModal.submit")}
                </button>
              )}
            </div>
          </form>
        </div>
        <label
          onClick={onClose}
          className="modal-backdrop"
          htmlFor="my_modal_6"
        ></label>
      </div>
    </div>
  );
}
