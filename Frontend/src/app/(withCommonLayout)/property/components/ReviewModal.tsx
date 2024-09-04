"use client"
import { useCreateReviewMutation } from "@/components/Redux/api/reviewApi";
import { getUserInfo } from "@/components/Server/auth.service";
import { TUser } from "@/types";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
    isOpen: any;
    onOpen: any;
    onOpenChange: any;
    propertyId: string;
    highestBid: number;
}

const ReviewModal = ({ isOpen, onOpen, onOpenChange, propertyId, highestBid }: TProps) => {
    const user = getUserInfo() as TUser;
    const router = useRouter();
    const [createReview, { isLoading }] = useCreateReviewMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    if (!user?.id) {
        router.push('/login')
    }

    const onSubmit = async (data: any) => {
        // console.log(data);
        const payload = {
            ...data,
            rating: Number(data?.rating)
        }
        const reviewData = {
            id: propertyId,
            data: payload
        }
        const toastId = toast.loading('processing...')
        try {
            const res = await createReview(reviewData);
            // console.log(res);
            if (res?.data?.success === true) {
                toast.success(res?.data?.message, { id: toastId, duration: 1000 })
                onOpenChange(false)
            }
            else {
                toast.error("something went wrong!", { id: toastId, duration: 1000 })

            }
        }
        catch (error: any) {
            console.log(error?.message);
            toast.error(error?.message, { id: toastId, duration: 1000 })

        }
    };
    return (
        <div>
            <>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Give Review</ModalHeader>
                                <ModalBody>
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <Input required
                                            {...register("rating")}
                                            placeholder="rating" type="number" />
                                        <Input required className="mt-5"
                                            {...register("comment")}
                                            placeholder="comment" type="text" />
                                        <Button className="mt-5" color="primary" type="submit">
                                            Submit
                                        </Button>
                                    </form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>

                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        </div>
    );
};

export default ReviewModal;