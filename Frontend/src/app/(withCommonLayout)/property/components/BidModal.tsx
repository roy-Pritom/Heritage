"use client"
import { usePlaceBidMutation } from "@/components/Redux/api/propertyApi";
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
    highestBid:number;
}

const BidModal = ({ isOpen, onOpen, onOpenChange, propertyId,highestBid}: TProps) => {
    const user=getUserInfo() as TUser;
    const router=useRouter();
    const [placeBid, { isLoading }] = usePlaceBidMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    if(!user?.id){
      router.push('/login')
    }

    const onSubmit = async (data: any) => {
        // console.log(data);
        const bidData = {
            id: propertyId,
            data
        }
        const toastId = toast.loading('processing...')
        try {
            const res = await placeBid(bidData);
            // console.log(res);
            if (res?.data?.success === true) {
                toast.success(res?.data?.message, { id: toastId, duration: 1000 })
                onOpenChange(false)
            }
            else {
                toast.error("Bid amount must be higher than the current highest bid!", { id: toastId, duration: 1000 })

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
                                <ModalHeader className="flex flex-col gap-1">Bid Property</ModalHeader>
                                <ModalBody>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex justify-end mb-3">
                                        <p className="font-semibold">Current Highest Bid : <span className="text-green-500">{highestBid}</span></p>
                                    </div>
                                        <Input required
                                            {...register("amount")}
                                            placeholder="Bid" type="number" />
                                        <Button className="mt-5" color="primary" type="submit">
                                            Place Bid
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

export default BidModal;