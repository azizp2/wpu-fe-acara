import { cn } from "@/utils/cn";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";

interface PropsTypes {
    className?: string;
    isDropable?: boolean
    name: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    isInvalid?: boolean
    errorMessage?: string
}

const InputFile = (props: PropsTypes) => {

    const [uploadedImage, setUploadedImage] = useState<File | null>(null)
    const {
        className,
        isDropable = false,
        name,
        onChange,
        isInvalid,
        errorMessage
    } = props
    const drop = useRef<HTMLLabelElement>(null)
    const dropzoneId = useId()

    const handleDragOver = (e: DragEvent) => {
        if (isDropable) {
            e.preventDefault()
            e.stopPropagation()
        }
    }

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setUploadedImage(e.dataTransfer?.files?.[0] || null)
    }


    useEffect(() => {
        const dropCurrent = drop.current;
        if (dropCurrent) {
            dropCurrent.addEventListener('dragover', handleDragOver)
            dropCurrent.addEventListener('drop', handleDrop)
        }
        return () => {
            dropCurrent?.removeEventListener('dragover', handleDragOver);
            dropCurrent?.removeEventListener('drop', handleDrop);
        }
    }, [])


    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files
        if (files && files.length > 0) {
            setUploadedImage(files[0]);
            if (onChange) {
                onChange(e)
            }
        }
    }

    return (
        <div>
            <label
                ref={drop}
                htmlFor={`dropzone-file-${dropzoneId}`}
                className={
                    cn("flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-30 hover:bg-gray-100",
                        className,
                        { "border-danger-500": isInvalid })}

            >

                {uploadedImage ? (
                    <div className="flex flex-col items-center justify-center p-5">
                        <div className="mb-2 w1/2">
                            <Image
                                fill
                                src={URL.createObjectURL(uploadedImage)} alt="image"
                                className="!relative"
                            />
                        </div>
                        <p className="text-center text-sm font-semibold text-gray-500">
                            {uploadedImage.name}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-5">
                        <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-500" />
                        <p className="text-center text-sm font-semibold text-gray-500">
                            {isDropable ? "Drag and drop or click to upload file here" : "Click to upload file here"}
                        </p>
                    </div>
                )}
                <input
                    name={name}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    id={`dropzone-file-${dropzoneId}`}
                    onChange={handleOnChange}
                />
            </label>
            {isInvalid && (
                <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
            )}
        </div>
    )
}


export default InputFile;