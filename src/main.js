import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { refs, renderImage, showLoader, hideLoader, showButton, hideButton, scrollGalerryCard } from "./js/render-functions";
import { apiParams, createApiQuery } from "./js/pixabay-api";

const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionPosition: "bottom",
        captionsData: "alt",
});

hideLoader();
hideButton();

refs.searchForm.addEventListener("submit", handlerSearch);

async function handlerSearch(event) {
    event.preventDefault();

    refs.gallery.innerHTML = "";
    apiParams.page = 1;
    
    showLoader();
    hideButton();

    const form = event.currentTarget;
    apiParams.q = form.elements.searchtext.value.toLowerCase().trim();


    if (!apiParams.q) {
        iziToast.warning({
            title: "Caution",
            message: "Please enter your request in the input field!",
            position: "topRight",
        });
        hideButton();
        return;
    }

    try {
        const { totalHits, hits } = await createApiQuery();

        hideLoader();
        apiParams.maxPage = Math.ceil(totalHits / apiParams.per_page);

        refs.gallery.insertAdjacentHTML("beforeend", renderImage(hits));
        lightbox.refresh();

        if (hits.length > 0 && hits.length !== totalHits) {
            showButton();
            refs.loadMoreBtn.addEventListener("click", handlerLoadMore);
        } else if (hits.length === 0) {
            iziToast.error({
                title: "Error",
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
            });
        }
    } catch (error) {
        displayApiError();
    } finally {
        refs.searchForm.reset();
    }
}

async function handlerLoadMore() {
    apiParams.page += 1;
    showLoader(); 
    hideButton();

    try {
        const { hits } = await createApiQuery();
        showButton();
        hideLoader(); 

        refs.gallery.insertAdjacentHTML("beforeend", renderImage(hits));
        lightbox.refresh();
        scrollGalerryCard();
    } catch (error) {
        displayApiError();
    } finally {
        if (apiParams.page === apiParams.maxPage) {
            hideButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
            refs.loadMoreBtn.removeEventListener("click", handlerLoadMore);
        }
    }
}

function displayApiError() {
    iziToast.error({
        title: "Error",
        message: "An error occurred while fetching images. Please try again later.",
        position: "topRight",
    });
}
