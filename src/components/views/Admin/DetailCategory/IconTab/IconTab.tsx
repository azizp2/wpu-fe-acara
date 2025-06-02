import InputFile from "@/components/ui/InputFile";
import { Button, Card, CardBody, CardHeader, Image, Skeleton } from "@nextui-org/react"

interface PropTypes {
    currentIcon: string;
}

const IconTab = (props: PropTypes) => {
    const { currentIcon } = props;
    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="text-xl font-bold w-full">Category Icon</h1>
                <p className="text-small text-default-400 w-full">Manage of icon this category.</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={() => { }}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Icon</p>
                        <Skeleton isLoaded={!!currentIcon} className="aspect-square rounded-lg">
                            <Image src={currentIcon} alt="Icon" className="!relative"></Image>
                        </Skeleton>
                    </div>
                    <InputFile name="icon" isDropable label={<p className="text-sm font-medium text-default-700 mb-2">Upload New Icon</p>}></InputFile>
                    <Button type="submit" color="danger" className="mt-2 disabled:bg-default-500">Save Changes</Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default IconTab;