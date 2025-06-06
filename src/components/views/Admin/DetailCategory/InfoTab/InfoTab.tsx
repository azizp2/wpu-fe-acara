import InputFile from "@/components/ui/InputFile";
import { ICategory } from "@/types/Category";
import { Button, Card, CardBody, CardHeader, Input, Skeleton, Spinner, Textarea } from "@nextui-org/react"
import UseInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
    dataCategory: ICategory
    onUpdate: (data: ICategory) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
    const { dataCategory, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

    const {
        controlUpdateInfo,
        handleSubmitUpdateInfo,
        errorsUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo
    } = UseInfoTab();

    useEffect(() => {
        setValueUpdateInfo("name", `${dataCategory?.name}`)
        setValueUpdateInfo("description", `${dataCategory?.description}`)
    }, [dataCategory])

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateInfo();
        }
    }, [isSuccessUpdate])

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="text-xl font-bold w-full">Category Information</h1>
                <p className="text-small text-default-400 w-full">Manage information of this category.</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInfo(onUpdate)}>
                    <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
                        <Controller
                            control={controlUpdateInfo}
                            name="name"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    autoFocus
                                    label="Name"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    type="Text"
                                    isInvalid={errorsUpdateInfo.name !== undefined}
                                    errorMessage={errorsUpdateInfo.name?.message}
                                    className="mt-2"
                                />

                            )}
                        />

                        {/* <Input type="text" className="mt-2" label="Name" labelPlacement="outside" variant="bordered" defaultValue={dataCategory?.name} /> */}
                    </Skeleton>
                    <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
                        {/* <Textarea className="mt-2" label="Description" labelPlacement="outside" variant="bordered" defaultValue={dataCategory?.description} /> */}
                        <Controller
                            control={controlUpdateInfo}
                            name="description"
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    label="Description"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    isInvalid={errorsUpdateInfo.description !== undefined}
                                    errorMessage={errorsUpdateInfo.description?.message}
                                />

                            )} />
                    </Skeleton>
                    <Button color="danger" className="mt-2 disabled:bg-default-500" type="submit" disabled={isPendingUpdate || !dataCategory?._id}>
                        {
                            isPendingUpdate ? <Spinner size="sm" color="white" /> : "Save Changes"
                        }
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default InfoTab;