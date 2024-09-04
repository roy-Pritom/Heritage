"use client"
import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { hostImage } from "@/components/UtlitiFunction/hostImgToImgBB";
import { useCreatePropertyMutation } from "@/components/Redux/api/propertyApi";
import { toast } from "sonner";

const CreatePropertypage = () => {
  const [createProperty] = useCreatePropertyMutation();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };
  // console.log({ selectedFiles });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    // console.log(data);
    let teamMembersData: any = [];
    const teamData = {
      name: data.name,
      role: data.role,
      contact: data.contact
    }
    teamMembersData.push(teamData)
    const otherFields: any = {}

    // Extract other fields
    for (const key in data) {
      if (!['name', 'role', 'contact'].includes(key)) {
        otherFields[key] = data[key];
      }
    }

    // Upload images and collect URLs
    const imageUrls = await Promise.all(
      selectedFiles.map(async (file) => {
        // console.log('Uploading file:', file);
        const img = await hostImage(file);
        return img?.data?.url
      })
    );

    const propertyData = {
      ...otherFields,
      bedrooms: Number(otherFields.bedrooms),
      balcony: Number(otherFields.balcony),
      bath: Number(otherFields.bath),
      price: Number(otherFields.price),
      images: imageUrls.filter(url => url)
    };
    const modifyData = {
      propertyData,
      teamMembersData
    }
    // console.log(modifyData);
    const toastId = toast.loading('processing...')
    try {
      const res = await createProperty(modifyData);
      // console.log(res);
      if (res?.data?.success === true) {
        toast.success(res?.data?.message, { id: toastId, duration: 1000 })
      }
      else {
        toast.error("Something went wrong!", { id: toastId, duration: 1000 })

      }
    }
    catch (error: any) {
      console.log(error?.message);
      toast.error(error?.message, { id: toastId, duration: 1000 })

    }
  };

  return (
    <div className="pt-10">
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">Create Property</h2>
            <p className="text-gray-500 mb-6">Form is mobile responsive. Give it a try.</p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Property Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">


                      <div className="md:col-span-2">
                        <label>Category</label>
                        <input
                          type="text"
                          placeholder="Category"
                          {...register("category")}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label>Title</label>
                        <input
                          type="text"
                          placeholder="title"
                          {...register("title")}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label >Description</label>
                        <input
                          type="text"
                          {...register("description")}
                          required
                          placeholder="Description"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>


                      <div className="md:col-span-2">
                        <label>Price</label>
                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            type="number"
                            placeholder="Price"
                            {...register("price")}
                            required
                            className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          />

                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label>Total Area (sqft)</label>
                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            placeholder="Total Area"
                            {...register("totalArea")}
                            required
                            className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          />

                        </div>
                      </div>

                      <div className="md:col-span-1">
                        <label >Floor</label>
                        <input
                          type="number"
                          {...register("floor")}
                          required
                          placeholder="Floor"
                          className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>




                      <div className="md:col-span-2">
                        <label>Status</label>
                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            placeholder="Status"
                            {...register("status")}
                            required
                            className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          />

                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label>Bedrooms</label>
                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            type="number"
                            placeholder="Bedrooms"
                            {...register("bedrooms")}
                            required
                            className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          />

                        </div>
                      </div>

                      <div className="md:col-span-1">
                        <label >Bath</label>
                        <input
                          type="number"
                          placeholder="Bath"
                          {...register("bath")}
                          required
                          className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label >Balcony</label>
                        <input
                          type="number"
                          {...register("balcony")}
                          required
                          placeholder="Balcony"
                          className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>


                      <div className="md:col-span-4">
                        <label >Location</label>
                        <input
                          type="text"
                          {...register("location")}
                          placeholder="Location"
                          className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>


                      {/* <Button onPress={onOpen}>ADD Team</Button> */}


                      <div className="md:col-span-2">
                        <Input required label="Add Team Member Name"
                          {...register("name")}
                          placeholder="Member Name" type="text" />
                      </div>
                      <div className="md:col-span-2">
                        <Input required label="Add Team Member Role"
                          {...register("role")}
                          placeholder="Member Role" type="text" />
                      </div>
                      <div className="md:col-span-2">
                        <Input
                          required
                          label="Add Team Member Email"
                          {...register('contact', {
                            required: 'Contact email is required.',
                            pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: 'Please enter a valid email address.',
                            },
                          })}
                          placeholder="Member Contact"
                          type="email"
                          // Conditional class for error styling
                          className={`${errors.contact ? 'border-red-500' : 'border-gray-300'
                            } focus:border-blue-500`}
                        />
                        {/* Error message display */}
                        {errors.contact && (
                          <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
                        )}
                      </div>
                      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-md mx-auto md:col-span-4 -ml-1">
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                        />
                        {selectedFiles.length > 0 && (
                          <div className="mt-4 w-full">
                            <h2 className="text-sm font-medium mb-1 text-gray-700">Selected Images:</h2>
                            <ul className="space-y-1 border border-gray-200 rounded p-2 bg-white shadow-sm">
                              {selectedFiles.map((file, index) => (
                                <li
                                  key={index}
                                  className="flex items-center justify-between p-1 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                                >
                                  <span className="text-xs text-gray-600 truncate">{file.name}</span>
                                  <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                            Create Property
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CreatePropertypage;