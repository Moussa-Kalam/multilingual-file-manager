import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../../helpers/fetcher";
import { FileDto } from "../../api";

const schema = z.object({
    fileName: z.string().min(1, { message: "File name is required" }),
});

type EditFileFormData = z.infer<typeof schema>;

export default function EditFileModal({
    onClose,
    isModalOpen,
    file,
}: {
    onClose: () => void;
    isModalOpen: boolean;
    file: FileDto | null;
}) {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const {
        handleSubmit,
        formState: { errors },
        register,
        reset,
    } = useForm<EditFileFormData>({ resolver: zodResolver(schema) });

    useEffect(() => {
        if (file) {
            reset({ fileName: file.name });
        }
    }, [file, reset]);

    const onSubmit = async (data: EditFileFormData) => {
        try {
            await fetcher({
                url: `/files/update/${file?.id}`,
                method: "PATCH",
                body: JSON.stringify({ filename: data.fileName }),
            });
            alert(t("homePage.fileUpdated"));
            queryClient.invalidateQueries(["files"] as InvalidateQueryFilters);
            onClose();
        } catch (err) {
            console.error("Error updating file:", err);
            alert(t("homePage.fileUpdateError"));
        }
    };

    return (
        <div>
            <input
                type="checkbox"
                readOnly
                checked={isModalOpen}
                id="edit_file_modal"
                className="modal-toggle"
            />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <div className="flex justify-between">
                        <h3 className="text-lg font-bold">{t("editFileModal.title")}</h3>
                        <button
                            onClick={onClose}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </button>
                    </div>
                    <form className="py-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-1">
                            <input
                                type="text"
                                {...register("fileName")}
                                className="input input-bordered w-full"
                            />
                            {errors.fileName && (
                                <span className="text-sm text-red-700">
                                    {errors.fileName.message}
                                </span>
                            )}
                        </div>
                        <div className="modal-action">
                            <button className="btn" type="submit">
                                {t("editFileModal.submit")}
                            </button>
                        </div>
                    </form>
                </div>
                <label
                    onClick={onClose}
                    className="modal-backdrop"
                    htmlFor="edit_file_modal"
                ></label>
            </div>
        </div>
    );
}
