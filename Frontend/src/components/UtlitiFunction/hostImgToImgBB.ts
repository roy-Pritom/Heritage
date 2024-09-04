import { FieldValues } from "react-hook-form";

export const hostImage = async (values: FieldValues) => {
    const formData = new FormData();
    // console.log(values);
    formData.append('image', values as File)
    let imgData;
    if (values) {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=f0db8dea95374f580981495bee6a20bb`, {
            method: 'POST',
            body: formData
        })
        imgData = await res.json();
        // console.log(imgData);
    }
    return imgData;
}