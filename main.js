(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-9",headers:{authorization:"52e38bc9-9b95-4e67-8615-786acb426380","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=document.querySelector("#card-template").content;function r(e,t,r,o,c){var u=n.querySelector(".card").cloneNode(!0),i=u.querySelector(".card__image"),a=u.querySelector(".card__title"),s=u.querySelector(".card__delete-button"),l=u.querySelector(".card__like-button"),d=u.querySelector(".card__like-amount");return i.src=e.link,i.alt=e.name,a.textContent=e.name,d.textContent=e.likes.length.toString(),c===e.owner._id?s.addEventListener("click",(function(){return t(e._id,u)})):s.remove(),l.addEventListener("mousedown",(function(){return o(e._id,l,d)})),i.addEventListener("click",(function(){return r(i,a)})),function(e,t,n){e.likes.some((function(e){return e._id===t}))&&n.classList.add("card__like-button_is-active")}(e,c,l),u}function o(n,r){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))})(n).then((function(){r.remove()})).catch((function(e){console.error("Ошибка:",e)}))}function c(n,r,o){r.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))}(n).then((function(e){var t=e.likes.length.toString();o.textContent=t,r.classList.remove("card__like-button_is-active")})).catch((function(e){console.error("Ошибка:",e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(n).then((function(e){var t=e.likes.length.toString();o.textContent=t,r.classList.add("card__like-button_is-active")})).catch((function(e){console.error("Ошибка:",e)}))}var u=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",s)},i=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s)},a=function(e){var t=document.querySelector(".popup_is-opened");e.target.classList.contains("popup")&&i(t)},s=function(e){if("Escape"===e.key&&!e.target.classList.contains("popup_is-opened")){var t=document.querySelector(".popup_is-opened");i(t)}};function l(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function d(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.removeAttribute("disabled",!0),t.classList.remove(n.inactiveButtonClass)):(t.setAttribute("disabled",!0),t.classList.add(n.inactiveButtonClass))}function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,n,t)})),d(n,r,t)}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var m,v=document.querySelector(".places__list"),_=document.querySelector(".popup"),y=document.querySelector(".profile__image"),h=document.querySelector(".popup_type_edit"),b=document.querySelector(".profile__edit-button"),S=h.querySelector(".popup__close"),q=document.querySelector(".profile__title"),L=document.querySelector(".profile__description");b.addEventListener("click",(function(){C.value=q.textContent,k.value=L.textContent,p(h,J),u(h)})),S.addEventListener("click",(function(){i(h)})),h.addEventListener("mousedown",(function(e){a(e)}));var E=document.querySelector(".popup__form"),C=document.querySelector(".popup__input_type_name"),k=document.querySelector(".popup__input_type_description");E.addEventListener("submit",(function(n){n.preventDefault();var r=C.value,o=k.value;n.submitter.textContent="Сохранение...",function(n,r){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return t(e)}))}(r,o).then((function(){q.textContent=C.value,L.textContent=k.value,i(_)})).catch((function(e){console.error("Ошибка:",e)})).finally((function(){n.submitter.textContent="Сохранить"}))}));var g=document.querySelector(".profile__add-button"),x=document.querySelector(".popup_type_new-card"),w=x.querySelector(".popup__close");g.addEventListener("click",(function(){p(x,J),T.reset(),u(x)})),w.addEventListener("click",(function(){i(x)})),x.addEventListener("mousedown",(function(e){a(e)}));var A=document.querySelector(".popup__input_type_card-name"),U=document.querySelector('input[name="cardLink"]'),T=document.forms["new-place"];x.addEventListener("submit",(function(n){n.preventDefault();var u=A.value,a=U.value;n.submitter.textContent="Сохранение...",function(n,r,o){return fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({_id:o,name:n,link:r})}).then((function(e){return t(e)}))}(u,a,m).then((function(e){v.prepend(r(e,o,D,c,m)),T.reset(),i(x)})).catch((function(e){console.error("Ошибка:",e)})).finally((function(){n.submitter.textContent="Сохранить"}))}));var j=document.querySelector(".popup_type_image");j.querySelector(".popup__close").addEventListener("click",(function(){i(j)})),j.addEventListener("mousedown",(function(e){a(e)}));var O=document.querySelector(".popup__image"),B=document.querySelector(".popup__caption");function D(e,t){O.src=e.src,O.alt=t.alt,B.textContent=t.textContent,u(j)}var P=document.querySelector(".popup_type_update-avatar"),I=P.querySelector(".popup__close"),M=document.forms["update-avatar"],N=document.querySelector('input[name="avatarLink"]');y.addEventListener("click",(function(){M.reset(),p(P,J),u(P)})),I.addEventListener("click",(function(){i(P)})),P.addEventListener("mousedown",(function(e){a(e)})),P.addEventListener("submit",(function(n){n.preventDefault();var r,o=N.value;n.submitter.textContent="Сохранение...",(r=o,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e)}))).then((function(){y.style.backgroundImage="url(".concat(o,")"),i(P)})).catch((function(e){console.error("Ошибка:",e)})).finally((function(){n.submitter.textContent="Сохранить"}))}));var J={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"form_submit_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};!function(e){document.querySelectorAll(e.formSelector).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),d(n,r,t)}))}))}(t,e)}))}(J),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers}).then((function(e){return t(e)})).then((function(e){e.filter((function(e){return"66dc1b88dde07005db31727c"===e._id}))}))]).then((function(e){var t,n,u=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,i=[],a=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);a=!0);}catch(e){s=!0,o=e}finally{try{if(!a&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(s)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=u[0],a=u[1];y.style.backgroundImage="url(".concat(i.avatar,")"),q.textContent=i.name,L.textContent=i.about,m=i._id,a.forEach((function(e){v.append(r(e,o,D,c,m))}))})).catch((function(e){console.error("Ошибка:",e)}))})();