import{a as w,S as v,i as d}from"./assets/vendor-c493984e.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();const i={searchForm:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader"),loadMoreBtn:document.querySelector(".js-load-more-button")};function u(){i.loader.classList.remove("is-hidden")}function h(){i.loader.classList.add("is-hidden")}function f(){i.loadMoreBtn.classList.remove("is-hidden")}function c(){i.loadMoreBtn.classList.add("is-hidden")}function g(t){return t.map(({webformatURL:a,largeImageURL:l,tags:s,likes:e,views:r,comments:n,downloads:L})=>`
    <li class="gallery-card">
        <a class="gallery-link" href="${l}">
          <img
            class="gallery-image"
            src="${a}" 
            alt="${s}" 
            width="360"
            height="152" 
          />
        </a>
        <div class="discribe-box">
          <ul class="discribe-list">
            <li class="discribe-item">
              <h2 class="discribe-title">Likes</h2>
              <p class="discribe-text">${e}</p>
            </li>
            <li class="discribe-item">
              <h2 class="discribe-title">Views</h2>
              <p class="discribe-text">${r}</p>
            </li>
            <li class="discribe-item">
              <h2 class="discribe-title">Comments</h2>
              <p class="discribe-text">${n}</p>
            </li>
            <li class="discribe-item">
              <h2 class="discribe-title">Downloads</h2>
              <p class="discribe-text">${L}</p>
            </li>
          </ul>
        </div>
      </li>
    `).join("")}function x(){const t=document.querySelector(".gallery-card").getBoundingClientRect().height;window.scrollBy({top:Math.ceil(t*2),left:Math.ceil(t*2),behavior:"smooth"})}const o={key:"44994533-ffbdcdb8322be43f4ecb62ad3",q:"",imageType:"photo",orientation:"horizontal",safesearch:!0,page:1,per_page:15,maxPage:0};async function p(){try{return(await w.get("https://pixabay.com/api/",{params:o})).data}catch(t){throw new Error(t.message)}}const m=new v(".gallery a",{captionDelay:250,captionPosition:"bottom",captionsData:"alt"});h();c();i.searchForm.addEventListener("submit",M);async function M(t){t.preventDefault(),i.gallery.innerHTML="",o.page=1,u(),c();const a=t.currentTarget;if(o.q=a.elements.searchtext.value.toLowerCase().trim(),!o.q){d.warning({title:"Caution",message:"Please enter your request in the input field!",position:"topRight"}),c();return}try{const{totalHits:l,hits:s}=await p();h(),o.maxPage=Math.ceil(l/o.per_page),i.gallery.insertAdjacentHTML("beforeend",g(s)),m.refresh(),s.length>0&&s.length!==l?(f(),i.loadMoreBtn.addEventListener("click",y)):s.length===0&&d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}catch{b()}finally{i.searchForm.reset()}}async function y(){o.page+=1,u(),c();try{const{hits:t}=await p();f(),h(),i.gallery.insertAdjacentHTML("beforeend",g(t)),m.refresh(),x()}catch{b()}finally{o.page===o.maxPage&&(c(),d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),i.loadMoreBtn.removeEventListener("click",y))}}function b(){d.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"topRight"})}
//# sourceMappingURL=commonHelpers.js.map
