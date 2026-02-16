
			    
    /* BANNER */
                
const navDrawerAction = document.querySelectorAll('.navDrawerAction');
const navDrawerAnimation = document.querySelectorAll('.navDrawerAnimation');

navDrawerAction.forEach(action => {
    action.addEventListener("click", () => {
        navDrawerAnimation.forEach(anim =>{
            anim.classList.toggle("open");
        });
    });
});


const searchViewWindowAction = document.querySelectorAll('.searchViewWindowAction');
const searchViewWindowAnimation = document.querySelectorAll('.searchViewWindowAnimation');
searchViewWindowAction.forEach(btn => {
    btn.addEventListener("click", () => {
        searchViewWindowAnimation.forEach(anim => {
            anim.classList.toggle("open");
        });
    });
});




const locationAriaBtn = document.getElementById('locationAriaBtn');
const locationAriaMenu = document.getElementById('locationAriaMenu');

locationAriaBtn.addEventListener('click', () => {
    locationAriaMenu.open = !locationAriaMenu.open;
});


const switchFilterToggle = document.getElementById('switchFilterToggle');
const filtersFAB = document.getElementById('filtersFAB')
const searchFAB = document.getElementById('searchFAB');

switchFilterToggle.addEventListener('change', (event) => {
    const isSelected = event.target.selected;
    searchFAB.classList.toggle("suspended");
    filtersFAB.classList.toggle("active");
    console.log("isSelected = ", isSelected);
});


const account = document.getElementById('account');
const accountCenter = document.getElementById('accountCenter');
const accountCloseBtn = document.getElementById('accountCloseBtn');

account.addEventListener('click', () => {
    accountCenter.classList.add("open");
});
accountCloseBtn.addEventListener('click', () => {
    accountCenter.classList.remove("open");
})

    /* END BANNER */


    /* PAGE LOGIC */

const productAddCartBtn = document.getElementById('productAddCartBtn');
const productAddCartBtnIcon = document.getElementById('productAddCartBtnIcon');

productAddCartBtn.addEventListener('click', () => {
    productAddCartBtn.classList.toggle("active");
    productAddCartBtnIcon.classList.toggle("active");
});

    /* END PAGE */


    /* filters-FAB ACTIONS */
const filtersFabBlur = document.getElementById('filtersFabBlur');
const filtersFabIconBtnClose = document.getElementById('filtersFabIconBtnClose');

filtersFAB.addEventListener('click', () => {
    filtersFabBlur.classList.toggle("open");
});
filtersFabIconBtnClose.addEventListener('click', () => {
    filtersFabBlur.classList.remove("open");
});

const filtersFabMenuAction = document.querySelectorAll('.filtersFabMenuAction');
const filtersFabMenuAnimation = document.querySelectorAll('.filtersFabMenuAnimation');

filtersFabMenuAction.forEach(FabMenuAction => {
    FabMenuAction.addEventListener("click", () => {
        filtersFabMenuAnimation.forEach(FabMenuAnimation => {
            FabMenuAnimation.classList.toggle("open");
        })
        
    });
});

    /* FAB MENUS */

const filtersConfirmFAB = document.getElementById('filtersConfirmFAB');

filtersConfirmFAB.addEventListener('click', () =>{
    advancedFAB.selected = false;
});

const filterBrandBtn = document.getElementById('filterBrandBtn');
const filterBrandMenu = document.getElementById('filterBrandMenu');
const filterFlavorBtn = document.getElementById('filterFlavorBtn');
const filterFlavorMenu = document.getElementById('filterFlavorMenu');
const filterPriceBtn = document.getElementById('filterPriceBtn');
const filterPriceMenu = document.getElementById('filterPriceMenu');
const filterMenuListsBlur = document.getElementById('filterMenuListsBlur');
const filterMenuListsClose = document.querySelectorAll('.filterMenuListsClose');

filterBrandBtn.addEventListener('click', () => {
    filterBrandMenu.classList.add("open");
    filterMenuListsBlur.classList.add("open");
});
filterFlavorBtn.addEventListener('click', () => {
    filterFlavorMenu.classList.add("open");
    filterMenuListsBlur.classList.add("open");
});
filterPriceBtn.addEventListener('click', () => {
    filterPriceMenu.classList.add("open");
    filterMenuListsBlur.classList.add("open");
});
filterMenuListsClose.forEach(filterMenuListsCloseElement => {
    filterMenuListsCloseElement.addEventListener('click', () => {
        filterFlavorMenu.classList.remove("open");
        filterBrandMenu.classList.remove("open");
        filterPriceMenu.classList.remove("open");
        filterMenuListsBlur.classList.remove("open");
    });
});

function getSelectedBrands() {
    const checkboxes = document.querySelectorAll(
        '#filterBrandMenu md-checkbox'
    );

    const brands = [];

    checkboxes.forEach(cb => {
        if (cb.checked) {
            brands.push(cb.value);
        }
    });

    return brands;
}
function getSelectedFlavors() {
    const checkboxes = document.querySelectorAll(
        '#filterFlavorMenu md-checkbox'
    );

    const flavors = [];

    checkboxes.forEach(cb => {
        if (cb.checked) {
            flavors.push(cb.value);
        }
    });

    return flavors;
}

const applyFiltersBtn = document.getElementById('filtersConfirmFAB');

applyFiltersBtn.addEventListener('click', () => {
    const brands = getSelectedBrands();
    const flavors = getSelectedFlavors();
    
    const minPrice = filterPriceSlider.valueStart;
    const maxPrice = filterPriceSlider.valueEnd;
    const priceOrder = filterOrderPriceState;

    // Build query params for URL
    const params = new URLSearchParams();
    brands.forEach(b => params.append("brand", b));
    flavors.forEach(f => params.append("flavor", f));

    params.append("min_price", minPrice);
    params.append("max_price", maxPrice);
    params.append("price_order", priceOrder);

    // Redirect to current page with query params
    window.location.href = `${window.location.pathname}?${params}`;
});



let filterOrderPriceState = 0;      //state of ordering var

const filterDefaultOrderPrice = document.getElementById('filterDefaultOrderPrice');
const filterOrderPrice = document.getElementById('filterOrderPrice');

    console.log("price:", filterOrderPriceState);
filterDefaultOrderPrice.addEventListener('click', () => {       //css moves it out the way
    filterOrderPrice.selected = false;          //making sure it gets the right state;
    filterOrderPriceState = 1;
    console.log("price:", filterOrderPriceState);
});
filterOrderPrice.addEventListener('click', () => {          //the md-icon-button sets itself [selected]
    if(filterOrderPrice.selected == false){                 //internaly
        filterOrderPriceState = 1;     //arrow up
    }
    else{
        filterOrderPriceState = -1;      //arrow down
    }
    console.log("price:", filterOrderPriceState);
});


const filterPriceSlider = document.getElementById('filterPriceSlider');
const filterPriceMin = document.getElementById('filterPriceMin');
const filterPriceMax = document.getElementById('filterPriceMax');

filterPriceSlider.addEventListener('input', () => {
    filterPriceMin.value = filterPriceSlider.valueStart.toFixed(2);;
    filterPriceMax.value = filterPriceSlider.valueEnd.toFixed(2);;
}); 

filterPriceMin.addEventListener('input', () => {
    const num = Number(filterPriceMin.value).toFixed(2);;
    filterPriceSlider.valueStart = Math.min(num, filterPriceSlider.valueEnd);
});

filterPriceMax.addEventListener('input', () => {
    const num = Number(filterPriceMax.value).toFixed(2);;
    filterPriceSlider.valueEnd = Math.max(num, filterPriceSlider.valueStart);
});





const dialog = document.getElementById('discardFiltersDialog');















/* shopPage carousel test */


let currentIndex = 0;
const shopGalery = document.querySelector('.shopGalery');
const shopGaleryPhoto = document.querySelectorAll('.shopGaleryPhoto');
const shopGaleryDot = document.querySelectorAll('.shopGaleryDot');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

function updateCarousel() {
    const shopGaleryImages = document.querySelector('.shopGaleryImages');
    shopGaleryImages.style.transform = `translateX(-${currentIndex * 100}vw)`;
  
  // Update active dot
    shopGaleryDot.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Arrow navigation
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % shopGaleryPhoto.length;
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + shopGaleryPhoto.length) % shopGaleryPhoto.length;
    updateCarousel();
});

// Dot navigation
shopGaleryDot.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Optional: Touch dragging (basic version)
let startX, endX;

shopGalery.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

shopGalery.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX > endX) {
        nextButton.click();
    } else if (startX < endX) {
        prevButton.click();
    }
});
