"use client"
import { getUserInfo } from "@/components/Server/auth.service";
import { TUser } from "@/types";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "sonner";


type TProps = {
    isOpen: any;
    onOpen: any;
    onOpenChange: any;

}

const DemoModal = ({ isOpen, onOpen, onOpenChange}: TProps) => {
    const user=getUserInfo() as TUser;
    const [email] = useState("john.doe@example.com");
    const [password] = useState("SecurePassword123!");

    const handleCopyEmail = () => {
      navigator.clipboard.writeText(email);
      toast.success("Email copied to clipboard!");
    };
    const handleCopyPassword = () => {
      navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard!"); 
    };
    return (
        <div>
            <>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Login Credential</ModalHeader>
                                <ModalBody>
                                <div className="p-6 bg-white rounded-lg">
      <div className="flex items-center space-x-3">
        <p className="text-gray-700 font-medium">
          <span className="font-semibold">Email:</span> {email}
        </p>
        <button
          onClick={handleCopyEmail}
          className="ml-2 text-blue-500 hover:text-blue-700"
          title="Copy Email"
        >
          <FaRegCopy className="w-5 h-5 ml-3" />
        </button>
      </div>
      <div className="flex items-center space-x-3 mt-3">
        <p className="text-gray-700 font-medium">
          <span className="font-semibold">Password:</span> {password}
        </p>
        <button
          onClick={handleCopyPassword}
          className="ml-2 text-blue-500 hover:text-blue-700"
          title="Copy Email"
        >
          <FaRegCopy className="w-5 h-5" />
        </button>
      </div>
    </div>
                                
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

export default DemoModal;