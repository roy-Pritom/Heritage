"use client"
import { usePlaceBidMutation } from "@/components/Redux/api/propertyApi";
import { addTeam } from "@/components/Redux/features/team/teamSlice";
import { useAppDispatch } from "@/components/Redux/hook";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type TProps = {
    isOpen: any;
    onOpen: any;
    onOpenChange: any;
}

const CreateTeamModal = ({ isOpen, onOpen, onOpenChange}: TProps) => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
        // console.log(data);
        dispatch(addTeam(data))
        // const toastId = toast.loading('processing...')
        // try {
        //     const res = await placeBid(bidData);
        //     // console.log(res);
        //     if (res?.data?.success === true) {
        //         toast.success(res?.data?.message, { id: toastId, duration: 1000 })
        //         onOpenChange(false)
        //     }
        //     else {
        //         toast.error("Bid amount must be higher than the current highest bid!", { id: toastId, duration: 1000 })

        //     }
        // }
        // catch (error: any) {
        //     console.log(error?.message);
        //     toast.error(error?.message, { id: toastId, duration: 1000 })

        // }
    };
    return (
        <div>
            <>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Create Team Member</ModalHeader>
                                <ModalBody>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                    
                                        <Input required
                                            {...register("name")}
                                            placeholder="Name" type="text" />
                                    
                                        <Input required className="my-2"
                                            {...register("role")}
                                            placeholder="Role" type="text" />
                                    
                                        <Input required
                                            {...register("contact")}
                                            placeholder="Contact" type="text" />
                                        <Button className="mt-5" color="primary" type="submit">
                                            Create Team Member
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

export default CreateTeamModal;