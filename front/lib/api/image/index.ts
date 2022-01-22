import axios from ".."


export const uploadFile = async (file: FormData) => {
    return axios.post('/photo/upload', file);
}

export const delFile = async (photo: string) => {
    return axios.post("/photo/delete", { photoName: photo });
}