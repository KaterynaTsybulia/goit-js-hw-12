
import axios from "axios";

export const apiParams = {
    key: "44994533-ffbdcdb8322be43f4ecb62ad3",
    q: "",
    imageType: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: 1,
    per_page: 15,
    maxPage: 0,
};

export async function createApiQuery() {
    try {
        const response = await axios.get("https://pixabay.com/api/", { params: apiParams });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}


