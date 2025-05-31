import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Textarea } from "@nextui-org/react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
    onOpenChange: () => void
    refetchCategory: () => void
}

const AddCategoryModal = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, refetchCategory } = props;
    const {
        control,
        errors,
        handleSubmitForm,
        handleAddCategory,
        isPendingMutateAddCategory,
        isSuccessMutateAddCategory,

        preview,
        handleUploadIcon,
        isPendingMutateUploadFile,
        handleDeleteIcon,
        isPendingMutateDeletedFile,
        handleOnClose
    } = useAddCategoryModal();


    useEffect(() => {
        if (isSuccessMutateAddCategory) {
            onClose()
            refetchCategory()
        }
    }, [isSuccessMutateAddCategory])

    const disabledSubmit = isPendingMutateAddCategory || isPendingMutateUploadFile || isPendingMutateDeletedFile

    return (
        <Modal onOpenChange={onOpenChange} isOpen={isOpen} onClose={() => handleOnClose(onClose)} placement="center" scrollBehavior="inside">
            <form onSubmit={handleSubmitForm(handleAddCategory)}>
                <ModalContent className="m-4">
                    <ModalHeader>Add Category</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm font-bold">Information</p>
                            <Controller
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        autoFocus
                                        label="Name"
                                        variant="bordered"
                                        type="Text"
                                        isInvalid={errors.name !== undefined}
                                        errorMessage={errors.name?.message}
                                    />

                                )}
                            />
                            <Controller
                                control={control}
                                name="description"
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        label="Description"
                                        variant="bordered"
                                        isInvalid={errors.description !== undefined}
                                        errorMessage={errors.description?.message}
                                    />

                                )} />

                            <p className="text-sm font-bold">Icon</p>
                            <Controller
                                name="icon"
                                control={control}
                                render={({ field: { onChange, value, ...field } }) => (
                                    <InputFile
                                        {...field}
                                        onDelete={() => handleDeleteIcon(onChange)}
                                        onUpload={(files) => handleUploadIcon(files, onChange)}
                                        isUploading={isPendingMutateUploadFile}
                                        isInvalid={errors.icon !== undefined}
                                        errorMessage={errors.icon?.message}
                                        isDeleting={isPendingMutateDeletedFile}
                                        isDropable
                                        preview={typeof preview == 'string' ? preview : ""}
                                    />

                                )} />

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={() => handleOnClose(onClose)} disabled={disabledSubmit}>
                            Cancel
                        </Button>
                        <Button color="danger" type="submit" disabled={disabledSubmit}>
                            {isPendingMutateAddCategory ? (
                                <Spinner size="sm" color="white" />
                            ) : (
                                "Create Add Category"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )

}


export default AddCategoryModal;